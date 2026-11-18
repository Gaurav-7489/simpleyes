import { expect, test } from "@playwright/test";
import { faqCategories } from "../../src/content/faqs";
import { services } from "../../src/content/services";
import { videoGuides } from "../../src/content/videos";
import { routes, WHATSAPP_NUMBER } from "./routes";

test.describe("pages", () => {
  for (const route of routes) {
    test(`${route} renders with one h1, no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      page.on("pageerror", (err) => errors.push(err.message));
      // Thumbnails come from YouTube's image server; stub it so the check doesn't depend on that network.
      await page.route("https://i.ytimg.com/**", (r) => r.fulfill({ contentType: "image/svg+xml", body: "<svg xmlns='http://www.w3.org/2000/svg'/>" }));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toContainText("not affiliated with");
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }

  test("unknown route returns 404 page", async ({ page }) => {
    const response = await page.goto("/does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn");
  });
});

test.describe("links", () => {
  test("every internal link resolves", async ({ page, request }) => {
    const seen = new Set<string>();
    for (const route of routes) {
      await page.goto(route);
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") ?? ""));
      for (const href of hrefs) {
        if (!href.startsWith("/") || href.startsWith("//")) continue;
        const path = href.split("#")[0] || "/";
        if (seen.has(path)) continue;
        seen.add(path);
        const res = await request.get(path);
        expect(res.status(), `${href} (found on ${route})`).toBe(200);
      }
    }
    expect(seen.size).toBeGreaterThan(10);
  });

  test("WhatsApp links are well-formed, encoded and open safely", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('a[href^="https://wa.me/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = (await link.getAttribute("href")) ?? "";
      const url = new URL(href);
      expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
      expect(url.searchParams.get("text") ?? "").toMatch(/^(Hello SimplYes|URGENT — Hello SimplYes)/);
      expect(href).not.toContain(" ");
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("external links use rel=noopener", async ({ page }) => {
    for (const route of ["/", "/contact/", "/privacy/"]) {
      await page.goto(route);
      const externals = page.locator('a[target="_blank"]');
      const n = await externals.count();
      for (let i = 0; i < n; i++) await expect(externals.nth(i)).toHaveAttribute("rel", /noopener/);
    }
  });
});

test.describe("navigation", () => {
  test("desktop nav links navigate", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const servicesButton = nav.getByRole("button", { name: "Services" });
    await expect(servicesButton).toHaveAttribute("aria-expanded", "false");
    await servicesButton.click();
    await expect(servicesButton).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: /Passport Services/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(servicesButton).toHaveAttribute("aria-expanded", "false");
    await expect(servicesButton).toBeFocused();
    await servicesButton.click();
    await nav.getByRole("link", { name: /OCI Services/ }).click();
    await expect(page).toHaveURL(/\/services\/oci-services\/$/);
    await nav.getByRole("link", { name: "FAQs" }).click();
    await expect(page).toHaveURL(/\/faqs\/$/);
    await expect(nav.getByRole("link", { name: "FAQs" })).toHaveAttribute("aria-current", "page");
    await page.getByRole("banner").getByRole("link", { name: "Get Assistance" }).click();
    await expect(page).toHaveURL(/\/contact\/$/);
  });

  test("mobile menu opens, traps focus, closes with Escape and navigates", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    const close = page.getByRole("button", { name: "Close menu" });
    await expect(close).toHaveAttribute("aria-expanded", "true");
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    // Background scroll is locked.
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await expect(mobileNav).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");

    await page.getByRole("button", { name: "Open menu" }).click();
    const group = mobileNav.getByRole("button", { name: "Services" });
    await expect(group).toHaveAttribute("aria-expanded", "false");
    await group.click();
    await expect(mobileNav.getByRole("link", { name: "Attestation & Affidavits" })).toBeVisible();
    await mobileNav.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });

  test("skip link moves focus to main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("FAQ accordion", () => {
  test("button accordion toggles with mouse and keyboard, filters and deep-links", async ({ page }) => {
    await page.goto("/faqs/");
    const main = page.locator("main");
    for (const c of faqCategories) await expect(main.getByRole("heading", { level: 2, name: c.label, exact: true })).toBeVisible();
    const first = page.getByRole("button", { name: "Is SimplYes an official government service?" });
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await first.getAttribute("aria-controls")}`);
    await expect(panel).toBeVisible();
    await first.focus();
    await page.keyboard.press("Enter");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();

    // Category chip filter.
    await page.getByRole("button", { name: "Pricing & payments" }).click();
    await expect(main.getByRole("heading", { level: 2, name: "General", exact: true })).toHaveCount(0);
    await expect(main.getByRole("heading", { level: 2, name: "Pricing & payments" })).toBeVisible();

    // Deep link opens the question.
    await page.goto("/faqs/#oci");
    await expect(page.getByRole("button", { name: "Do you assist with e-OCI applications?" })).toHaveAttribute("aria-expanded", "true");

    // Answers are in the server HTML even when collapsed (crawlable).
    const html = await (await page.request.get("/faqs/")).text();
    expect(html).toContain("No. SimplYes is an independent documentation assistance service.");
  });
});

test.describe("content works without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("home content is visible with JS disabled", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose your service" })).toBeVisible();
    // FAQ answers stay readable without JavaScript.
    await expect(page.getByText("Decisions on every application remain with the authorities.").first()).toBeVisible();
    const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity === "0").length);
    expect(hidden).toBe(0);
  });
});

test.describe("redesign: bottom tab bar and service strip", () => {
  test("tab bar shows on phones only, marks the current page and opens the menu", async ({ page, isMobile }) => {
    await page.goto("/services/");
    const bar = page.getByRole("navigation", { name: "Quick" });
    if (!isMobile) {
      await expect(bar).toBeHidden();
      return;
    }
    await expect(bar).toBeVisible();
    await expect(bar.getByRole("link")).toHaveCount(3);
    await expect(bar.getByRole("link", { name: "Services" })).toHaveAttribute("aria-current", "page");
    await expect(bar.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current", "page");
    await bar.getByRole("button", { name: "Show menu" }).click();
    const toggle = page.getByRole("button", { name: "Close menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
    await expect(bar).toBeHidden(); // hidden behind the open menu
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });

  test("tab bar never covers footer content or the WhatsApp button", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phones only");
    await page.goto("/about/");
    const bar = await page.getByRole("navigation", { name: "Quick" }).boundingBox();
    // Floating WhatsApp button sits above the bar.
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.8));
    const fab = page.locator("[data-floating-wa]");
    await expect(fab).toBeVisible();
    const f = (await fab.boundingBox())!;
    expect(f.y + f.height).toBeLessThanOrEqual(bar!.y);
    // At the very bottom, nothing in the footer (links, back-to-top, copyright) is under the bar.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const lowest = await page.evaluate(() =>
      Math.max(...[...document.querySelectorAll("footer a, footer button, footer p")].map((el) => el.getBoundingClientRect().bottom)),
    );
    expect(lowest).toBeLessThanOrEqual(bar!.y);
  });

  test("homepage service list links all six services by their full names", async ({ page }) => {
    await page.goto("/");
    const tiles = page.locator("#services");
    for (const service of services) {
      await expect(tiles.getByRole("link", { name: new RegExp(`^${service.title.replace(/[&]/g, "\\$&")}`) })).toHaveAttribute(
        "href",
        `/services/${service.slug}/`,
      );
    }
  });
});

test.describe("official YouTube channel", () => {
  const CHANNEL = "https://www.youtube.com/@simplyesde";

  test("guides link to the channel in a new tab; no YouTube player loads before a click", async ({ page }) => {
    await page.goto("/guides/");
    const yt = page.locator("main").getByRole("link", { name: /More on our YouTube channel/ });
    await expect(yt).toHaveAttribute("href", CHANNEL);
    await expect(yt).toHaveAttribute("target", "_blank");
    await expect(yt).toHaveAttribute("rel", /noopener/);
    await expect(page.locator('iframe[src*="youtube"], script[src*="youtube"]')).toHaveCount(0);
  });

  test("footer and Organization data name the same channel", async ({ page }) => {
    await page.goto("/contact/");
    const footerLink = page.locator("footer").getByRole("link", { name: /YouTube @simplyesde/ });
    await expect(footerLink).toHaveAttribute("href", CHANNEL);
    await expect(footerLink).toHaveAttribute("target", "_blank");
    const org = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap((s) => [JSON.parse(s.textContent ?? "{}")].flat())
        .find((d) => d["@type"] === "Organization"),
    );
    expect(org.sameAs).toEqual([CHANNEL]);
  });
});

test.describe("video guides", () => {
  test("the guides page shows all seven videos, in order, and plays them in place only after a click", async ({ page }) => {
    // Stay offline: stub YouTube's image server and the privacy-enhanced player.
    await page.route("https://i.ytimg.com/**", (route) => route.fulfill({ status: 404 }));
    await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<title>player</title>" }));
    await page.goto("/guides/");
    const main = page.locator("main");
    await expect(main.locator(".guide-card-title")).toHaveText(videoGuides.map((v) => v.title));
    const thumbs = main.locator("img.vg-thumb");
    await expect(thumbs).toHaveCount(7);
    for (let i = 0; i < 7; i++) {
      await expect(thumbs.nth(i)).toHaveAttribute("loading", "lazy");
      await expect(thumbs.nth(i)).toHaveAttribute("src", new RegExp(`/vi/${videoGuides[i]!.id}/`));
    }
    await expect(page.locator("iframe")).toHaveCount(0);

    const [first, second] = videoGuides;
    await main.getByRole("button", { name: `Play video: ${first!.title}` }).click();
    const player = main.locator("iframe");
    await expect(player).toHaveCount(1);
    await expect(player).toHaveAttribute("src", `https://www.youtube-nocookie.com/embed/${first!.id}?autoplay=1&rel=0&playsinline=1`);
    await expect(player).toHaveAttribute("title", first!.title);
    await expect(page).toHaveURL(/\/guides\/$/);

    // Starting another video closes the first.
    await main.getByRole("button", { name: `Play video: ${second!.title}` }).click();
    await expect(player).toHaveCount(1);
    await expect(player).toHaveAttribute("src", new RegExp(`/embed/${second!.id}\\?`));
    await expect(main.getByRole("button", { name: `Play video: ${first!.title}` })).toBeVisible();
  });

  test("the homepage plays the intro video and four guides in place", async ({ page }) => {
    await page.route("https://i.ytimg.com/**", (route) => route.fulfill({ status: 404 }));
    await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<title>player</title>" }));
    await page.goto("/");
    await expect(page.locator("#guides .guide-card")).toHaveCount(4);
    await page.getByRole("button", { name: /Play video: Meet SimplYes/ }).click();
    await expect(page.locator("main iframe")).toHaveAttribute("src", /\/embed\/5AqDkuUgoEE\?/);
  });
});

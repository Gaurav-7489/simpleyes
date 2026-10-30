import { expect, test } from "@playwright/test";
import { allServices, services } from "../../src/content/services";
import { indexableRoutes, routes, WHATSAPP_NUMBER } from "./routes";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const retiredSlugs = [
  "document-guidance",
  "application-form-assistance",
  "photo-signature-preparation",
  "appointment-guidance",
  "process-clarification",
  "personalized-assistance",
];

async function bodyText(page: import("@playwright/test").Page) {
  return page.evaluate(() => document.body.innerText);
}

test.describe("content rules", () => {
  test.skip(({ isMobile }) => isMobile, "content checks run once");

  test("sitemap lists published services only, no retired or unpublished slugs", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const s of services) expect(sitemap).toContain(`/services/${s.slug}/`);
    for (const slug of retiredSlugs) expect(sitemap).not.toContain(slug);
    for (const s of allServices.filter((x) => !x.published)) expect(sitemap).not.toContain(s.slug);
    expect(sitemap).not.toMatch(/\bPCC\b|police clearance/i);
  });

  test("llms.txt lists exactly the published services", async ({ request }) => {
    const txt = await (await request.get("/llms.txt")).text();
    for (const s of services) expect(txt).toContain(`/services/${s.slug}/`);
    for (const s of allServices.filter((x) => !x.published)) expect(txt).not.toContain(s.slug);
  });

  test("header navigation has the five primary items", async ({ page }) => {
    await page.goto("/about/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const labels = await nav.getByRole("link").allInnerTexts();
    expect(labels.map((l) => l.trim())).toEqual(["Services", "How It Works", "About", "FAQs", "Contact"]);
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
  });

  for (const service of services) {
    test(`${service.slug} has every section and a service-specific WhatsApp link`, async ({ page }) => {
      await page.goto(`/services/${service.slug}/`);
      for (const heading of [
        "Who it's for",
        "How SimplYes helps",
        "What you can prepare before contacting us",
        "Questions we often help clarify",
        "How it works for this service",
        "Where our role ends",
        "FAQs",
      ]) {
        await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
      }
      await expect(page.getByRole("heading", { name: /^Official sources — checked / })).toBeVisible();
      const hrefs = await page.$$eval('main a[href^="https://wa.me/"]', (as) => as.map((a) => a.getAttribute("href") ?? ""));
      const texts = hrefs.map((h) => new URL(h).searchParams.get("text") ?? "");
      expect(texts.some((t) => t.includes(service.title))).toBe(true);
      const floating = await page.locator("[data-floating-wa]").getAttribute("href");
      expect(new URL(floating ?? "").searchParams.get("text")).toContain(service.title);
    });
  }

  test("all WhatsApp links are encoded, non-sensitive and open safely", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      const links = await page.$$eval('a[href^="https://wa.me/"]', (as) =>
        as.map((a) => ({ href: a.getAttribute("href") ?? "", target: a.getAttribute("target"), rel: a.getAttribute("rel") ?? "" })),
      );
      expect(links.length, route).toBeGreaterThan(0);
      for (const { href, target, rel } of links) {
        const url = new URL(href);
        expect(url.origin + url.pathname).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
        const text = url.searchParams.get("text") ?? "";
        expect(text).toMatch(/^Hello SimplYes/);
        expect(text).not.toMatch(/\d/);
        expect(href).not.toMatch(/\s/);
        expect(target).toBe("_blank");
        expect(rel).toContain("noopener");
      }
    }
  });

  test("no forms, roadmap UI, PCC, fabricated claims or prices on any route", async ({ page }) => {
    const hasPricing = services.some((s) => s.pricing);
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("form"), route).toHaveCount(0);
      await expect(page.locator('input[type="file"], input[type="password"]'), route).toHaveCount(0);
      const text = await bodyText(page);
      expect(text, route).not.toMatch(/\bPCC\b|police clearance/i);
      // Affirmative promises only: the FAQ legitimately asks "Can you guarantee approval?" and answers "No".
      expect(text, route).not.toMatch(/\bwe guarantee|guaranteed (approval|appointment|visa)/i);
      expect(text, route).not.toMatch(/official partner|authori[sz]ed by the embassy/i);
      expect(text, route).not.toMatch(/\d+\+? (clients|customers|applications)/i);
      expect(text, route).not.toMatch(/\btestimonials?\b|★|\bratings?\b/i);
      expect(text, route).not.toMatch(/\blog in\b|\bsign in\b|\bupload your\b|track your case|pay now|coming soon/i);
      expect(text, route).not.toMatch(/OCI renewal/i);
      if (!hasPricing) expect(text, route).not.toMatch(/€\s?\d|\d\s?€/);
    }
  });

  test("indexable routes contain no placeholders in production builds", async ({ page }) => {
    test.skip(!isProduction, "only meaningful for production builds");
    for (const route of indexableRoutes) {
      await page.goto(route);
      const text = await bodyText(page);
      expect(text, route).not.toMatch(/to be provided|\[confirm|\[owner|TODO/);
    }
  });

  test("zero console errors and warnings on every route", async ({ page }) => {
    const messages: string[] = [];
    page.on("console", (msg) => ["error", "warning"].includes(msg.type()) && messages.push(`${page.url()}: ${msg.text()}`));
    page.on("pageerror", (err) => messages.push(err.message));
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
    }
    expect(messages).toEqual([]);
  });
});

test.describe("floating WhatsApp button", () => {
  test("appears after the hero and hides near the final CTA and footer", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const fab = page.locator("[data-floating-wa]");
    await expect(fab).toHaveAttribute("data-visible", "false");
    await expect(fab).toBeHidden();
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await expect(fab).toHaveAttribute("data-visible", "true");
    await expect(fab).toBeVisible();
    await expect(fab).toHaveAccessibleName("Chat with SimplYes on WhatsApp (opens in a new tab)");
    const box = await fab.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(fab).toHaveAttribute("data-visible", "false");
    await expect(fab).toBeHidden();
  });

  test("never overlaps the footer WhatsApp link or back-to-top", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const fab = page.locator("[data-floating-wa]");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(60);
      if (!(await fab.isVisible())) continue;
      const a = (await fab.boundingBox())!;
      for (const sel of ['footer a[href^="https://wa.me/"]', "footer .to-top"]) {
        const b = await page.locator(sel).boundingBox();
        if (!b) continue;
        const overlap = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
        expect(overlap, `${sel} at scroll ${y}`).toBe(false);
      }
    }
  });

  test("is hidden while the mobile menu is open", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/services/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    const fab = page.locator("[data-floating-wa]");
    await expect(fab).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await expect(fab).toBeHidden();
  });

  test("is reachable by keyboard after the main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow on desktop");
    await page.goto("/about/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    const fab = page.locator("[data-floating-wa]");
    await expect(fab).toBeVisible();
    const order = await page.evaluate(() => {
      const fabEl = document.querySelector("[data-floating-wa]")!;
      const main = document.querySelector("main")!;
      const footer = document.querySelector("footer")!;
      return {
        afterMain: Boolean(main.compareDocumentPosition(fabEl) & Node.DOCUMENT_POSITION_FOLLOWING),
        beforeFooter: Boolean(footer.compareDocumentPosition(fabEl) & Node.DOCUMENT_POSITION_PRECEDING),
      };
    });
    expect(order).toEqual({ afterMain: true, beforeFooter: true });
    await fab.focus();
    await expect(fab).toBeFocused();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("no long-running animations or transitions, and Lenis is not initialised", async ({ page }) => {
    for (const route of ["/", "/services/", `/services/${services[0]!.slug}/`, "/how-it-works/"]) {
      await page.goto(route);
      await page.waitForTimeout(400);
      // Trigger reveals and scroll so any motion that would run, runs now.
      await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-revealed")));
      await page.mouse.wheel(0, 1200);
      await page.waitForTimeout(100);
      const result = await page.evaluate(() => {
        const slow = document
          .getAnimations()
          .filter((a) => a.playState === "running" && Number(a.effect?.getTiming().duration ?? 0) > 10)
          .map((a) => {
            const target = (a.effect as KeyframeEffect | null)?.target;
            return `${a.constructor.name} on ${target?.tagName ?? "?"}.${target?.getAttribute("class")?.slice(0, 40) ?? ""}`;
          });
        return { slow: slow.slice(0, 5), lenis: document.documentElement.classList.contains("lenis") };
      });
      expect(result.slow, route).toEqual([]);
      expect(result.lenis, route).toBe(false);
    }
  });
});

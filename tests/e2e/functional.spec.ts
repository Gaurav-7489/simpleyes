import { expect, test } from "@playwright/test";
import { faqCategories } from "../../src/content/faqs";
import { routes, WHATSAPP_NUMBER } from "./routes";

test.describe("pages", () => {
  for (const route of routes) {
    test(`${route} renders with one h1, no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      page.on("pageerror", (err) => errors.push(err.message));

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
      expect(url.searchParams.get("text") ?? "").toMatch(/^Hello SimplYes/);
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
    await expect(mobileNav.getByRole("link", { name: "Corporate Services" })).toBeVisible();
    await mobileNav.getByRole("link", { name: "Contact Us" }).click();
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
    await expect(page.getByRole("button", { name: "Do you assist with OCI documentation?" })).toHaveAttribute("aria-expanded", "true");

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
    await expect(page.getByRole("heading", { name: "Eight ways we can help" })).toBeVisible();
    // FAQ answers stay readable without JavaScript.
    await expect(page.getByText("Decisions rest with the relevant authorities.").first()).toBeVisible();
    const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity === "0").length);
    expect(hidden).toBe(0);
  });
});

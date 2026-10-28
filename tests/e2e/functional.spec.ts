import { expect, test } from "@playwright/test";
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
    expect(count).toBeGreaterThan(4);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = (await link.getAttribute("href")) ?? "";
      const url = new URL(href);
      expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
      expect(url.searchParams.get("text") ?? "").toMatch(/^Hello Simplyes/);
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
    await nav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services\/$/);
    await expect(nav.getByRole("link", { name: "Services" })).toHaveAttribute("aria-current", "page");
    await nav.getByRole("link", { name: "FAQs" }).click();
    await expect(page).toHaveURL(/\/faqs\/$/);
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
    await mobileNav.getByRole("link", { name: "Contact" }).click();
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
  test("toggles with mouse and keyboard", async ({ page }) => {
    await page.goto("/faqs/");
    const items = page.locator("details.faq-item");
    await expect(items).toHaveCount(9);
    await expect(items.first()).toHaveAttribute("open", "");
    const second = items.nth(1);
    await expect(second).not.toHaveAttribute("open", "");
    await second.locator("summary").click();
    await expect(second).toHaveAttribute("open", "");
    await second.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(second).not.toHaveAttribute("open", "");
    // Answers are in the server HTML even when collapsed (crawlable).
    const html = await (await page.request.get("/faqs/")).text();
    expect(html).toContain("Is Simplyes part of the Embassy of India?");
  });
});

test.describe("content works without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("home content is visible with JS disabled", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How we can help" })).toBeVisible();
    const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity === "0").length);
    expect(hidden).toBe(0);
  });
});

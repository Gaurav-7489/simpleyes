import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { homeFaqs } from "../../src/content/faqs";
import { services } from "../../src/content/services";
import { site } from "../../src/content/site";
import { indexableRoutes, routes } from "./routes";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplyes.de").replace(/\/$/, "");

test.describe("accessibility (axe, WCAG 2.2 AA tags)", () => {
  for (const route of routes) {
    test(`${route} has no serious axe violations`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-revealed")));
      await page.waitForTimeout(900); // let reveal/hero transitions finish before contrast checks
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`),
      ).toEqual([]);
    });
  }
});

test.describe("SEO", () => {
  test.skip(({ isMobile }) => isMobile, "SEO checks run once");

  for (const route of indexableRoutes) {
    test(`${route} has unique title, description, canonical, OG`, async ({ page }) => {
      await page.goto(route);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(15);
      expect(title.length).toBeLessThanOrEqual(70);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(70);
      expect(description?.length ?? 0).toBeLessThanOrEqual(170);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${route}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.png$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      // headings: exactly one h1, no skipped levels from h1 to h3 without h2
      const levels = await page.$$eval("h1,h2,h3,h4", (hs) => hs.map((h) => Number(h.tagName[1])));
      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i++) expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
    });
  }

  test("titles and descriptions are unique", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const route of indexableRoutes) {
      await page.goto(route);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(indexableRoutes.length);
    expect(descriptions.size).toBe(indexableRoutes.length);
  });

  test("structured data is valid JSON and truthful", async ({ page }) => {
    const expectTypes: Record<string, string[]> = {
      "/": ["Organization", "WebSite"],
      "/faqs/": ["FAQPage", "BreadcrumbList"],
      "/contact/": ["ContactPage", "BreadcrumbList"],
      "/services/oci-services/": ["Service", "BreadcrumbList", "FAQPage"],
      "/services/passport-services/": ["Service", "BreadcrumbList", "FAQPage"],
    };
    for (const [route, types] of Object.entries(expectTypes)) {
      await page.goto(route);
      const blocks = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => x.textContent ?? ""));
      const parsed = blocks.flatMap((b) => {
        const v = JSON.parse(b);
        return Array.isArray(v) ? v : [v];
      });
      const found = parsed.map((p) => p["@type"]);
      for (const t of types) expect(found, route).toContain(t);
      const text = JSON.stringify(parsed);
      expect(text).not.toMatch(/aggregateRating|review"|GovernmentOrganization|openingHours/);
    }
  });

  test("sitemap and robots", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const route of indexableRoutes) expect(sitemap).toContain(`<loc>${SITE}${route}</loc>`);
    expect(sitemap).not.toContain("/thank-you/");
    const robots = await (await request.get("/robots.txt")).text();
    if (process.env.NEXT_PUBLIC_SITE_ENV === "production") {
      expect(robots).toContain("Allow: /");
      expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
    } else {
      expect(robots).toContain("Disallow: /");
    }
  });

  test("important content is server-rendered", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const phrase of [
      "Your Documentation Journey,",
      site.coverageStatement,
      "not affiliated with",
      ...services.map((s) => s.title.replace("&", "&amp;")),
      homeFaqs[0]!.question,
    ]) {
      expect(html).toContain(phrase);
    }
  });
});

test.describe("indexing rules", () => {
  test.skip(({ isMobile }) => isMobile, "runs once");

  test("thank-you page is noindex", async ({ page }) => {
    await page.goto("/thank-you/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

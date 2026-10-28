import { expect, test } from "@playwright/test";
import { routes } from "./routes";

/** Mandatory widths from the brief. */
const widths = [320, 360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1600, 1920, 2560];

test.describe("responsive layout", () => {
  test.skip(({ isMobile }) => isMobile, "viewport is set explicitly per width");

  for (const width of widths) {
    test(`no horizontal overflow or clipped text at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 800 ? 820 : 1000 });
      for (const route of routes) {
        await page.goto(route);
        await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-revealed")));
        const result = await page.evaluate(() => {
          const doc = document.documentElement;
          const overflowX = doc.scrollWidth - doc.clientWidth;
          const offenders: string[] = [];
          const vw = doc.clientWidth;
          document.querySelectorAll<HTMLElement>("h1, h2, h3, p, a, button, li, summary").forEach((el) => {
            if (el.closest('[aria-hidden="true"], .marquee, .sr-only')) return;
            const style = getComputedStyle(el);
            if (style.visibility === "hidden" || style.display === "none") return;
            const r = el.getBoundingClientRect();
            if (r.width === 0) return;
            if (r.right > vw + 1 || r.left < -1) offenders.push(`${el.tagName}: "${el.textContent?.trim().slice(0, 40)}" (${Math.round(r.left)}–${Math.round(r.right)})`);
            if (el.scrollWidth > el.clientWidth + 2 && style.overflowX !== "visible" && style.overflowX !== "") {
              offenders.push(`${el.tagName} clipped: "${el.textContent?.trim().slice(0, 40)}"`);
            }
          });
          return { overflowX, offenders: offenders.slice(0, 8) };
        });
        expect(result.overflowX, `${route} horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
        expect(result.offenders, `${route} at ${width}px`).toEqual([]);
      }
    });
  }

  test("tap targets are at least 24px on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const route of ["/", "/contact/", "/faqs/"]) {
      await page.goto(route);
      const small = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLElement>("a[href], button, summary"))
          .filter((el) => !el.closest(".sr-only, [aria-hidden='true']") && el.offsetParent !== null)
          .filter((el) => {
            const r = el.getBoundingClientRect();
            const inline = getComputedStyle(el).display === "inline";
            return !inline && (r.height < 24 || r.width < 24);
          })
          .map((el) => el.textContent?.trim().slice(0, 30)),
      );
      expect(small, route).toEqual([]);
    }
  });

  test("fixed header never covers the focused/anchored heading", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#why-simplyes");
    const top = await page.locator("#why-title").evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThan(80);
  });
});

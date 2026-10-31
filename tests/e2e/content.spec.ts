import { expect, test } from "@playwright/test";
import { services } from "../../src/content/services";
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

  test("exactly the eight approved services with the confirmed slugs (§05 scope lock)", () => {
    expect(services.map((s) => s.slug)).toEqual([
      "passport-services",
      "oci-services",
      "attestation-legalisation",
      "affidavits-declarations",
      "visa-documentation-support",
      "family-documentation",
      "student-services",
      "corporate-services",
    ]);
  });

  test("sitemap lists all eight services and no retired slugs", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const s of services) expect(sitemap).toContain(`/services/${s.slug}/`);
    for (const slug of retiredSlugs) expect(sitemap).not.toContain(slug);
    expect(sitemap).toContain("/pricing/");
    expect(sitemap).not.toMatch(/\bPCC\b|police clearance/i);
  });

  test("llms.txt lists exactly the eight services", async ({ request }) => {
    const txt = await (await request.get("/llms.txt")).text();
    for (const s of services) expect(txt).toContain(`/services/${s.slug}/`);
    expect(txt.match(/\/services\/[a-z-]+\//g)?.length).toBe(services.length);
  });

  test("header: Home · Services ▾ · How It Works · About Us · FAQs · Contact Us + Get Assistance", async ({ page }) => {
    await page.goto("/about/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const items = await nav.locator(":scope > ul > li").evaluateAll((lis) =>
      lis.map((li) => (li.querySelector(":scope > a, :scope > div > button")?.textContent ?? "").trim()),
    );
    expect(items).toEqual(["Home", "Services", "How It Works", "About Us", "FAQs", "Contact Us"]);
    await expect(nav.getByRole("link", { name: "About Us" })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("banner").getByRole("link", { name: "Get Assistance" })).toHaveAttribute("href", "/contact/");
    // Dropdown lists all eight services.
    await nav.getByRole("button", { name: "Services" }).click();
    for (const s of services) await expect(nav.getByRole("link", { name: new RegExp(s.title.replace(/[&]/g, "\\$&")) })).toBeVisible();
  });

  test("footer has Company, Services (all eight), Information and Contact columns", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    for (const title of ["Company", "Services", "Information", "Contact"]) {
      await expect(footer.getByRole("heading", { name: title, exact: true })).toBeVisible();
    }
    for (const s of services) await expect(footer.getByRole("link", { name: s.title, exact: true })).toBeVisible();
    for (const label of ["FAQs", "Pricing", "Privacy Policy", "Terms & Conditions", "Disclaimer"]) {
      await expect(footer.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
  });

  test("homepage is short and routes visitors: hero, services, steps, why, FAQs, CTA", async ({ page }) => {
    await page.goto("/");
    const ids = await page.$$eval("main > section", (els) => els.map((el) => el.getAttribute("aria-labelledby") ?? ""));
    expect(ids).toEqual(["hero-title", "services-title", "process-title", "why-title", "faq-title", "final-cta-title"]);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your Documentation Journey, Made Simpler.");
    await expect(page.locator("#services .service-mosaic > li")).toHaveCount(8);
    for (const s of services) await expect(page.locator(`#services a[href="/services/${s.slug}/"]`)).toBeVisible();
    await expect(page.getByRole("button", { name: "Is SimplYes an official government service?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Can SimplYes guarantee approval?" })).toBeVisible();
  });

  for (const service of services) {
    test(`${service.slug} has every section and a service-specific WhatsApp link`, async ({ page }) => {
      await page.goto(`/services/${service.slug}/`);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(service.title);
      for (const heading of [
        "Sounds like you?",
        "At a glance",
        "We help with",
        "Documents often involved",
        "Have ready",
        "How it works",
        "What stays with the authorities",
        "Questions",
        "Related services",
      ]) {
        await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
      }
      await expect(page.getByText("subject to verification")).toBeVisible();
      const ctas = page.getByRole("link", { name: "Get Assistance With This Service" });
      expect(await ctas.count()).toBeGreaterThanOrEqual(2);
      await expect(ctas.first()).toHaveAttribute("href", new RegExp(`/contact/\\?service=${service.slug}`));
      for (const slug of service.related) await expect(page.locator(`main a[href="/services/${slug}/"]`).first()).toBeVisible();
      await expect(page.getByText(/^Official sources \(checked /)).toBeVisible();
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

  test("one enquiry form (contact only), no uploads, roadmap UI, PCC, fabricated claims or prices", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("form"), route).toHaveCount(route === "/contact/" ? 1 : 0);
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
      expect(text, route).not.toMatch(/€\s?\d|\d\s?€/);
      expect(text, route).not.toMatch(/\bAI\b|chatbot|artificial intelligence/i);
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
    await page.goto("/services/oci-services/");
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
    await page.goto("/services/oci-services/");
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

  test("no long-running animations or transitions", async ({ page }) => {
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
        return { slow: slow.slice(0, 5) };
      });
      expect(result.slow, route).toEqual([]);
    }
  });
});

test.describe("enquiry form (§13)", () => {
  test("validates required fields inline and moves focus to the first error", async ({ page }) => {
    await page.goto("/contact/");
    const form = page.locator("form#enquiry");
    await form.getByRole("button", { name: "Send Enquiry" }).click();
    const name = form.getByLabel(/Full name/);
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(form.getByText("Please enter your full name.")).toBeVisible();
    await expect(form.getByText("Please choose a service category.")).toBeVisible();
    await expect(form.getByText("Please confirm you have read the Privacy Policy.")).toBeVisible();
    await form.getByLabel(/Email address/).fill("not-an-email");
    await form.getByRole("button", { name: "Send Enquiry" }).click();
    await expect(form.getByText("Please enter a valid email address.")).toBeVisible();
    // Consent is unticked by default; the dropdown holds exactly the eight services.
    await expect(form.getByRole("checkbox", { name: /I have read the Privacy Policy/ })).not.toBeChecked();
    const options = await form.getByLabel(/Service category/).locator("option").allInnerTexts();
    expect(options.slice(1)).toEqual(services.map((s) => s.title));
    await expect(page.locator('input[type="file"]')).toHaveCount(0);
  });

  test("service pages pre-select their service; corporate reveals company fields", async ({ page }) => {
    await page.goto("/services/oci-services/");
    await page.getByRole("link", { name: "Get Assistance With This Service" }).first().click();
    await expect(page).toHaveURL(/\/contact\/\?service=oci-services/);
    await expect(page.getByLabel(/Service category/)).toHaveValue("oci-services");
    await page.goto("/contact/?context=corporate");
    await expect(page.getByLabel(/Service category/)).toHaveValue("corporate-services");
    await expect(page.getByLabel(/Company name/)).toBeVisible();
    await expect(page.getByLabel(/Approximate number of employees/)).toBeVisible();
  });

  test("never shows success unless an endpoint accepted the enquiry", async ({ page }) => {
    test.skip(Boolean(process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT), "only without a configured endpoint");
    await page.goto("/contact/");
    const form = page.locator("form#enquiry");
    await form.getByLabel(/Full name/).fill("Test Person");
    await form.getByLabel(/Email address/).fill("test@example.com");
    await form.getByLabel(/Service category/).selectOption("passport-services");
    await form.getByLabel(/Message/).fill("I would like help preparing my passport renewal.");
    await form.getByRole("checkbox", { name: /I have read the Privacy Policy/ }).check();
    await form.getByRole("button", { name: "Send Enquiry" }).click();
    await expect(form.getByRole("alert")).toContainText("could not be sent");
    await expect(page).toHaveURL(/\/contact\//);
    // Entered data is kept.
    await expect(form.getByLabel(/Full name/)).toHaveValue("Test Person");
  });
});

test.describe("analytics (§18)", () => {
  test("no analytics code or consent banner without a measurement ID", async ({ page }) => {
    test.skip(Boolean(process.env.NEXT_PUBLIC_GA_ID), "only without GA configured");
    const requests: string[] = [];
    page.on("request", (r) => requests.push(r.url()));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(requests.filter((u) => /googletagmanager|google-analytics/.test(u))).toEqual([]);
    await expect(page.getByRole("dialog", { name: "Analytics cookies" })).toHaveCount(0);
  });
});

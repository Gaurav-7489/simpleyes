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

  test("header: Home · Services ▾ · How It Works · About · FAQs + Get Assistance", async ({ page }) => {
    await page.goto("/about/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const items = await nav.locator(":scope > ul > li").evaluateAll((lis) =>
      lis.map((li) => (li.querySelector(":scope > a, :scope > div > button")?.textContent ?? "").trim()),
    );
    expect(items).toEqual(["Home", "Services", "How It Works", "About", "FAQs"]);
    await expect(nav.getByRole("link", { name: "About", exact: true })).toHaveAttribute("aria-current", "page");
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

  test("homepage has the V2 sections in order (Concept 2)", async ({ page }) => {
    await page.goto("/");
    const ids = await page.$$eval("main > section", (els) => els.map((el) => el.getAttribute("aria-labelledby") ?? ""));
    expect(ids).toEqual(["hero-title", "services-title", "process-title", "why-title", "faq-title", "final-cta-title"]);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Documentation Support for Indians in Germany.");
    await expect(page.locator("#services li")).toHaveCount(8);
    for (const s of services) await expect(page.locator(`#services a[href="/services/${s.slug}/"]`)).toHaveAccessibleName(s.title);
    await expect(page.getByRole("button", { name: "Is SimplYes an official government service?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Can SimplYes guarantee approval?" })).toBeVisible();
  });

  for (const service of services) {
    test(`${service.slug} has every section and a service-specific WhatsApp link`, async ({ page }) => {
      await page.goto(`/services/${service.slug}/`);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(service.title);
      for (const heading of [
        "About this service",
        "Who this service is for",
        "Common situations",
        "What SimplYes can help with",
        "Possible document categories",
        "How the process works",
        "What to have ready",
        "What is included",
        "What is outside the scope",
        `${service.title} FAQs`,
        "Related services",
        "Other ways to reach us",
      ]) {
        await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
      }
      await expect(page.getByText("subject to verification")).toBeVisible();
      const ctas = page.getByRole("link", { name: "Get Assistance With This Service" });
      expect(await ctas.count()).toBeGreaterThanOrEqual(3);
      await expect(ctas.first()).toHaveAttribute("href", new RegExp(`/contact/\\?service=${service.slug}`));
      for (const slug of service.related) await expect(page.locator(`main a[href="/services/${slug}/"]`).first()).toBeVisible();
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
    await page.goto("/services/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    const fab = page.locator("[data-floating-wa]");
    await expect(fab).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await expect(fab).toBeHidden();
  });

  // Real keyboard behaviour (Tab presses, not programmatic focus). The floating button is a pointer/touch
  // shortcut: by design it hides while the final CTA or footer is on screen, which is exactly where a keyboard
  // user arrives after the main content, so sequential navigation never lands on it. What must hold instead:
  // no focus stop is ever invisible, and keyboard users reach a visible WhatsApp link in the page and footer.
  test.describe("keyboard", () => {
    // Instant scrolling, so each focus stop is measured where the user sees it (no smooth-scroll lag).
    test.use({ reducedMotion: "reduce" });

    for (const route of ["/about/", "/services/passport-services/"]) {
      test(`never focused while hidden; WhatsApp still reachable (${route})`, async ({ page, isMobile }) => {
        test.skip(isMobile, "keyboard flow on desktop");
        await page.goto(route);
        type Stop = { fab: boolean; fabVisible: boolean; wa: boolean; inMain: boolean; inFooter: boolean; onScreen: boolean };
        const stops: Stop[] = [];
        for (let i = 0; i < 250; i++) {
          await page.keyboard.press("Tab");
          const stop = await page.evaluate((): Stop | null => {
            const a = document.activeElement as HTMLElement | null;
            const fab = document.querySelector<HTMLElement>("[data-floating-wa]")!;
            if (!a || a === document.body) return null;
            const r = a.getBoundingClientRect();
            const style = getComputedStyle(a);
            return {
              fab: a === fab,
              fabVisible:
                fab.dataset.visible === "true" && getComputedStyle(fab).visibility === "visible" && getComputedStyle(fab).opacity !== "0",
              wa: (a.getAttribute("href") ?? "").startsWith("https://wa.me/"),
              inMain: Boolean(a.closest("main")),
              inFooter: Boolean(a.closest("footer")),
              onScreen: style.visibility === "visible" && r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight,
            };
          });
          if (!stop) break; // focus left the document
          if (stops.at(-1)?.inFooter && !stop.inFooter) break; // wrapped past the end of the page
          stops.push(stop);
        }
        expect(stops.some((s) => s.inFooter), "tabbed all the way into the footer").toBe(true);
        expect(stops.filter((s) => s.fab && !s.fabVisible), "focus never lands on the hidden floating button").toEqual([]);
        expect(stops.filter((s) => !s.onScreen).length, "every focus stop is visible on screen").toBe(0);
        expect(stops.some((s) => s.wa && s.inMain), "a WhatsApp link in the page is keyboard-reachable").toBe(true);
        expect(stops.some((s) => s.wa && s.inFooter), "the footer WhatsApp link is keyboard-reachable").toBe(true);
      });
    }
  });

  test("when visible, it is focusable with a visible focus ring", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow on desktop");
    await page.goto("/about/");
    await page.keyboard.press("Tab"); // keyboard modality, so :focus-visible applies
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.8));
    const fab = page.locator("[data-floating-wa]");
    await expect(fab).toBeVisible();
    await fab.focus();
    await expect(fab).toBeFocused();
    expect(await fab.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
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
  test("keeps controls disabled until handlers are ready, then preserves the first input", async ({ page }) => {
    let release!: () => void;
    const scriptsReady = new Promise<void>((resolve) => { release = resolve; });
    await page.route("**/_next/static/chunks/*.js", async (route) => {
      await scriptsReady;
      await route.continue();
    });
    try {
      await page.goto("/contact/", { waitUntil: "domcontentloaded" });
      const name = page.getByLabel(/Full name/);
      await expect(name).toBeDisabled();
      await expect(page.getByRole("button", { name: "Send Enquiry" })).toBeDisabled();
      release();
      await expect(name).toBeEnabled();
      await name.fill("First Typed Name");
      await page.getByLabel(/Email address/).fill("test@example.com");
      await expect(name).toHaveValue("First Typed Name");
    } finally {
      release();
    }
  });

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

  test("choosing Corporate Services in the form reveals the company fields", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByLabel(/Service category/).selectOption("corporate-services");
    await expect(page.getByLabel(/Company name/)).toBeVisible();
    await expect(page.getByRole("checkbox", { name: /This is a corporate enquiry/ })).toBeChecked();
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

test.describe("enquiry delivery with a configured endpoint (§13)", () => {
  // Runs only against a build with NEXT_PUBLIC_ENQUIRY_ENDPOINT set. The request is intercepted, so nothing
  // reaches the real form service; the real end-to-end check (email arrives in the inbox) is manual.
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
  const honeypot = process.env.NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD || "_gotcha";
  test.skip(!endpoint, "needs a build with NEXT_PUBLIC_ENQUIRY_ENDPOINT");

  async function fillAndSend(page: import("@playwright/test").Page) {
    await page.goto("/contact/?service=oci-services");
    const form = page.locator("form#enquiry");
    await form.getByLabel(/Full name/).fill("Test Person");
    await form.getByLabel(/Email address/).fill("test@example.com");
    await form.getByLabel(/City in Germany/).fill("Frankfurt");
    await form.getByLabel(/Message/).fill("I would like help preparing an OCI application for my family.");
    await form.getByRole("checkbox", { name: /I have read the Privacy Policy/ }).check();
    await form.getByRole("button", { name: "Send Enquiry" }).click();
    return form;
  }

  test("sends JSON with the honeypot and subject, then shows /thank-you/ only when accepted", async ({ page }) => {
    let body: Record<string, string> = {};
    let headers: Record<string, string> = {};
    await page.route(endpoint!, async (route) => {
      body = route.request().postDataJSON();
      headers = route.request().headers();
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true,"message":"Submission received."}' });
    });
    await fillAndSend(page);
    await expect(page).toHaveURL(/\/thank-you\/$/);
    expect(headers["accept"]).toContain("application/json");
    expect(headers["content-type"]).toContain("application/json");
    expect(body[honeypot]).toBe("");
    expect(body.subject).toBe("New enquiry — OCI Services — Frankfurt");
    expect(body.service).toBe("OCI Services");
    expect(body.email).toBe("test@example.com");
    expect(Object.keys(body)).not.toContain("passport_number");
  });

  for (const [status, reply] of [
    [422, '{"success":false,"error":"undeliverable_email"}'],
    [429, '{"message":"Too Many Attempts."}'],
    [200, '{"success":false,"error":"rejected"}'],
    [200, '{"ok":false}'],
    [200, '{}'],
    [200, 'null'],
    [200, '[]'],
    [200, '<html>Sign in required</html>'],
    [200, '{"success":true,"error":"delivery_failed"}'],
  ] as const) {
    test(`keeps the visitor on the form with their data when the service answers ${status} ${reply}`, async ({ page }) => {
      await page.route(endpoint!, (route) => route.fulfill({ status, contentType: "application/json", body: reply }));
      const form = await fillAndSend(page);
      await expect(form.getByRole("alert")).toContainText("could not be sent");
      await expect(page).toHaveURL(/\/contact\//);
      await expect(form.getByLabel(/Full name/)).toHaveValue("Test Person");
    });
  }

  test("keeps entered details after a network failure and allows a successful retry", async ({ page }) => {
    let requests = 0;
    await page.route(endpoint!, async (route) => {
      requests++;
      if (requests === 1) await route.abort("failed");
      else await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
    });
    const form = await fillAndSend(page);
    await expect(form.getByRole("alert")).toContainText("could not be sent");
    await expect(form.getByLabel(/Message/)).toHaveValue("I would like help preparing an OCI application for my family.");
    await form.getByRole("button", { name: "Send Enquiry" }).click();
    await expect(page).toHaveURL(/\/thank-you\/$/);
    expect(requests).toBe(2);
  });

  test("blocks duplicate submissions while the provider is processing", async ({ page }) => {
    let requests = 0;
    let release!: () => void;
    const pending = new Promise<void>((resolve) => { release = resolve; });
    await page.route(endpoint!, async (route) => {
      requests++;
      await pending;
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
    });
    try {
      const form = await fillAndSend(page);
      await expect(form.getByRole("button", { name: "Sending" })).toBeDisabled();
      await expect.poll(() => requests).toBe(1);
      await form.evaluate((el) => {
        (el as HTMLFormElement).requestSubmit();
        (el as HTMLFormElement).requestSubmit();
      });
      expect(requests).toBe(1);
      release();
      await expect(page).toHaveURL(/\/thank-you\/$/);
      expect(requests).toBe(1);
    } finally {
      release();
    }
  });

  test("a stalled request stops sending and preserves the visitor's details", async ({ page }) => {
    await page.clock.install();
    await page.route(endpoint!, () => {});
    const form = await fillAndSend(page);
    await expect(form.getByRole("button", { name: "Sending" })).toBeDisabled();
    await page.clock.fastForward(20_100);
    await expect(form.getByRole("alert")).toContainText("could not be sent");
    await expect(form.getByRole("button", { name: "Send Enquiry" })).toBeEnabled();
    await expect(form.getByLabel(/Full name/)).toHaveValue("Test Person");
  });

  test("a filled spam field never produces a false thank-you confirmation", async ({ page }) => {
    let requests = 0;
    await page.route(endpoint!, async (route) => { requests++; await route.abort(); });
    await page.addInitScript((field) => {
      document.addEventListener("submit", () => {
        const input = document.getElementsByName(field)[0] as HTMLInputElement | undefined;
        if (input) input.value = "bot-filled";
      }, true);
    }, honeypot);
    const form = await fillAndSend(page);
    await expect(form.getByRole("alert")).toContainText("could not be sent");
    await expect(page).toHaveURL(/\/contact\//);
    expect(requests).toBe(0);
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

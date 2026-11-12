# QA report

The current 6 November 2026 release evidence is recorded in [`LAUNCH-STATUS.md`](LAUNCH-STATUS.md),
including the application SHA, production deployment, live smoke checks, new cross-browser coverage and
remaining owner inputs. The earlier observations below are retained as historical context.

Built against the **SimplYes Website Development Specification v1.0** (31 Oct 2026).
Last updated 6 Nov 2026 on branch `claude/complete-spec-handover`.

Three levels of evidence are kept apart below:

- **Verified locally:** automated tests on the production build of this branch (Node 22, Chromium via
  Playwright, `NEXT_PUBLIC_SITE_ENV=production`, no enquiry endpoint or GA ID set).
- **Verified on production:** checked against the live `https://simplyes.de`, which currently serves
  `main` (commit `b300934`), *not* this branch.
- **Unverified:** not yet tested anywhere. Listed in full at the end.

## Verified locally (this branch)

| Check | Result |
|---|---|
| `npm run lint` / `npm run typecheck` | pass |
| `npm run build` incl. placeholder guard | pass — 28 static routes |
| Playwright, desktop 1440 px + Pixel 7 | **167 passed, 0 failed**, 61 skipped (device-specific duplicates) |

The suite covers: axe WCAG 2.2 AA on every route (incl. contrast with the new teal); one h1 and no skipped
heading levels; unique titles, descriptions, canonicals and OG tags; structured data (Organization, WebSite,
BreadcrumbList, Service, FAQPage, ContactPage); sitemap/robots/llms.txt; `/thank-you/` noindex; exactly eight
services with the confirmed slugs in dropdown, footer, cards, form and sitemap; homepage section order; every
service page's 14 parts and its pre-selected "Get Assistance With This Service" CTA; header/dropdown/mobile
menu keyboard behaviour; FAQ accordion, filter chips and deep links; enquiry form validation, focus,
pre-selection, corporate fields and "never success without acceptance"; no analytics without an ID; no
uploads, prices, guarantees, fabricated claims or AI features; WhatsApp link encoding; no horizontal overflow
or clipped text at 320–2560 px; tap targets; reduced motion; no console errors.

## Verified on production (`https://simplyes.de`, serving `main`)

| Check | Result |
|---|---|
| Hosting | Vercel, Git-connected; latest `main` deployment status "success" |
| Domain + SSL | `simplyes.de` 200 over HTTPS; `www` → apex 308 |
| Security headers | CSP, HSTS, X-Frame-Options present |
| Indexing | Home `index, follow`, canonical `https://simplyes.de/`; robots allows all; sitemap 15 URLs (8 services); `/thank-you/` and legal pages `noindex` |
| Redirects | `/services/document-guidance/` → `/services/`, `/privacy-policy/` → `/privacy/` (308); unknown URL → 404 |
| Internal links | All 26 internal paths linked from sitemap pages and legal pages return 200 |
| Playwright suite against live | 155 browser tests passed. 8 request-based tests could not reach the host from the test sandbox (proxy limitation, not a site fault) and were re-checked with curl above. 1 real failure: the Services dropdown bug, **fixed on this branch** |
| Lighthouse (lab, live URL) | Mobile: Performance 97–99, Accessibility/Best Practices/SEO 100, LCP 0.9–1.1 s, CLS 0. Desktop: 100 across the board |
| Contact routes shown | `mailto:Info@simplyes.de`, `wa.me/4915216627596` |
| Enquiry form | **Not connected**: the live form shows "The online form is being connected" and points to WhatsApp/email |
| Analytics | No GA ID set; no analytics or banner loads (as intended until an ID exists) |
| Impressum | **Live with "to be provided" placeholders** for legal name, address, representative |

## Specification §23 checklist — status

| Area | Status |
|---|---|
| Navigation, page content, service scope | Done; tested locally and on production |
| Forms | Built and tested client-side. **Unverified:** production endpoint, inbox delivery, spam/duplicate handling at the service |
| Privacy | Consent banner (code), no uploads, no personal data in analytics. **Open:** legal review, processor names |
| Mobile | Automated at 320/360/375/390/414/430/768/1024/1280+ px. **Unverified:** real iOS Safari / Android Chrome |
| Browsers & a11y | Chromium automated + axe. **Unverified:** Safari, Firefox, Edge; screen-reader spot check |
| SEO, speed & data | Metadata, sitemap, canonicals, structured data; Lighthouse on production done. **Open:** Search Console, GA4 events live |
| Production readiness | Domain, SSL, staging/preview noindex logic in place. **Open:** production form test, notifications, analytics test, rollback test, owner sign-off |
| Handover (§22 F) | [`HANDOVER.md`](HANDOVER.md), [`DEPLOYMENT.md`](DEPLOYMENT.md), [`OWNER-REGISTER.md`](OWNER-REGISTER.md) |

## Changes on this branch

- **Services dropdown:** a pending hover-open timer could reopen the menu right after Escape, and a click
  straight after hovering closed it. Fixed; reproduced on production before the fix.
- **Brand teal `#0B7F8C` applied** (§16). Supporting tints and states are derived from it. Filled buttons
  use the teal itself (white text 4.74:1). Text links and outlines use darker steps of the same hue,
  because the teal on `#F6F9F5` is 4.47:1, just under AA for body text.
- **Fee table (§11 build note):** `FeeTable` renders per-service "From €X" / "On quotation" rows from
  `pricing.serviceFees`. The list is empty, so nothing is shown until prices are approved.
- **CI was failing on `main`** (GitHub Actions `quality` job), with two tests passing locally but failing in CI:
  - At 320 px, the passport page's "Get Assistance With This Service" button could not wrap, pushing the hero
    column to 311 px (11 px past the screen edge with CI font metrics; 2 px gutter locally). Buttons now wrap
    their label on screens ≤ 400 px.
  - The floating-WhatsApp keyboard test scrolled to a point ~20 px from the final CTA, which hides the button
    by design, so it flaked. Superseded by the rewrite below.
- **Floating WhatsApp keyboard test rewritten.** The old test (and the first adjustment) only called `focus()`
  from code, so it never proved keyboard behaviour. Probing real Tab navigation showed the button is never a Tab
  stop: it hides by design when the final CTA or footer is on screen, which is where keyboard users arrive after
  the main content. The tests now press Tab through `/about/` and a service page and check that focus never
  lands on the hidden button, every focus stop is on screen, and keyboard users reach a WhatsApp link in the
  page and in the footer. A separate test checks the visible button shows a focus ring. Verified by
  mutation: removing the hidden state's `visibility: hidden` makes the keyboard tests fail.
- **Axe flake removed.** CI flagged one flaky run: axe sampled the homepage's decorative (aria-hidden)
  jargon → plain-language cross-fade mid-animation. Axe checks now run with reduced motion, so contrast is judged
  on settled states (120/120 passes over 3 repeats).
- **Fee table guards:** an unknown or duplicate service slug, or a non-positive "from" amount, fails the build
  instead of silently hiding a price.
- **FAQ "How can I contact SimplYes?"** now lists the configured email (`site.contact.email`) alongside the
  form and WhatsApp (§12).
- **Enquiry delivery prepared for Formdall** (EU, servers in Germany; nothing set up or purchased): the form
  sends a provider-neutral `subject` and the service's honeypot field (name configurable via
  `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD`), treats a JSON `success: false` as a failure, and the CSP allows
  `api.formdall.de` instead of `formspree.io`. Verified on a separate build with a dummy Formdall endpoint
  and intercepted requests (no real submissions): payload, headers and subject correct; 200 → `/thank-you/`;
  422, 429 and `success:false` keep the visitor on the form with their data. The Privacy Policy names Formdall
  automatically when its endpoint is configured; mailbox provider and retention stay marked outstanding.
- **Docs:** handover document; this report; deployment guide updated to the real hosting state;
  [`ENQUIRY-SETUP.md`](ENQUIRY-SETUP.md) (Formdall costs, account setup, test, mailbox identification).

## UI redesign (owners' mockup, Nov 2026)

Branch `claude/ui-redesign-mockup`. Visual layer only; confirmed copy, page structure and behaviour are unchanged.

- **Palette:** deep green actions (`#005C45`, white text 8:1), `#00905A` highlight for large text/icons only
  (3.9:1), mint surfaces (`#E2F4E6`). Background `#F6F9F5` and text `#13211D` unchanged.
- **Header:** floating white bar, current page in a mint pill, "Get Assistance ↗" button. Logo stand-in:
  green check + "SimplYes." (replace with the official SVG).
- **Home hero:** eyebrow, confirmed H1 with green highlight, original SVG Berlin scene (Brandenburg Gate, TV
  tower) with floating icon tiles, and a strip of the eight services (4 × 2 tiles on phones, one panel on
  desktop; accessible names are the full service titles).
- **Phones/tablets:** bottom tab bar (Home, Services, Enquiry, Menu); "Menu" opens the existing accessible menu.
  The WhatsApp button sits above the bar; the footer is padded so nothing is hidden behind it; the bar hides
  while a form field is focused or the menu is open.
- **Sub-pages:** left-aligned mint heroes with a green corner wave; white rounded cards and icon tiles; round
  step markers; softly filled form fields (border raised to 3:1 contrast, WCAG 1.4.11).
- **Not copied from the mockup, on purpose:**
  - the Indian passport cover with the national emblem (the spec forbids official-looking imagery and
    government seals, §07/§08/§16, and use of the State Emblem of India is legally restricted);
  - the mockup's headline, "Contact" button and How It Works step names ("Share Documents", "We Process &
    Coordinate", "Get It Done"). These conflict with the confirmed copy and with the spec's rules (no
    documents through the website, SimplYes does not process applications or promise outcomes). The
    confirmed wording stays until the owners approve changes.
- **Tests:** new checks for the tab bar (phones only, current page, opens the menu, never covers the
  WhatsApp button or footer content; mutation-checked) and for the service strip. Full suite: 176 passed,
  0 failed.

## Deviations and decisions

- **Platform:** custom build (§19 Option B: Next.js · React · TypeScript · Tailwind, static export on
  Vercel). Owners to confirm.
- **Fonts:** Outfit + DM Sans (§16 recommendation), self-hosted via `next/font`.
- **Motion:** no scroll-jacking (§16); subtle transform-only hover and hero motion, off for reduced motion.
- **Privacy slug:** kept `/privacy/` (`/privacy-policy/` redirects).
- **Logo gradient:** lime → teal stops are still approximations until the official asset is supplied.

## Unverified — must be tested before sign-off

1. A real enquiry (through Formdall, once set up) submitted on production reaches `Info@simplyes.de` with the subject
   "New enquiry — <service> — <city>", and the page then shows `/thank-you/`.
2. Spam filtering and duplicate handling at the chosen form service; acknowledgement email (if enabled).
3. GA4: consent banner shown, events (`view_service`, `cta_click`, `whatsapp_click`, `email_click`,
   `form_start`, `form_error`, `generate_lead`) visible in DebugView only after "Accept".
4. iOS Safari and Android Chrome on real phones; desktop Safari, Firefox, Edge; screen-reader spot check.
5. Search Console: domain verified, sitemap submitted.
6. Rollback on Vercel restores the previous version.
7. This branch's changes on a Vercel preview before merging (dropdown fix, teal).

Open owner inputs: see [`OWNER-REGISTER.md`](OWNER-REGISTER.md).

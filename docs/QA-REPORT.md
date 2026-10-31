# QA report

Branch `main`, built against the **SimplYes Website Development Specification v1.0** (31 Oct 2026).
Run locally in a cloud container (Node 22, Chromium via Playwright) with the CI environment
`NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://simplyes.de` and no enquiry endpoint, contact
email or GA ID configured. Lab results only; real-device and field-data checks are listed below as open.

## Automated results

| Check | Result |
|---|---|
| `npm run typecheck` (incl. tests) | pass |
| `npm run lint` | pass |
| `npm run build` incl. placeholder guard (production) | pass — 28 static routes |
| Playwright, desktop + Pixel 7 | **165 passed, 0 failed**, 59 skipped (device-specific duplicates) |

The suite covers: axe WCAG 2.2 AA on every route; one h1 and no skipped heading levels; unique titles,
descriptions, canonicals and OG tags; structured data (Organization, WebSite, BreadcrumbList, Service,
FAQPage, ContactPage); sitemap/robots/llms.txt; `/thank-you/` noindex; exactly eight services with the
confirmed slugs in dropdown, footer, cards, form and sitemap; homepage section order; every service page's
14 parts and its pre-selected "Get Assistance With This Service" CTA; header/dropdown/mobile menu keyboard
behaviour; FAQ button accordion, filter chips and deep links; enquiry form validation, focus, pre-selection,
corporate fields and "never success without acceptance"; no analytics without an ID; no uploads, prices,
guarantees, fabricated claims or AI features; WhatsApp link encoding; no horizontal overflow or clipped text
at 320–2560 px; tap targets; reduced motion; no console errors.

## Specification §23 checklist — status

| Area | Status |
|---|---|
| Navigation, page content, service scope | Done and tested |
| Forms | Built and tested client-side. **Open:** production endpoint, inbox delivery, duplicate handling at the service |
| Privacy | Consent banner, no uploads, no personal data in analytics — done. **Open:** legal review |
| Mobile | Automated at 320/360/375/390/414/430/768/1024/1280+ px. **Open:** real iOS Safari / Android Chrome |
| Browsers & a11y | Chromium automated + axe. **Open:** Safari, Firefox, Edge; screen-reader spot check |
| SEO, speed & data | Metadata, sitemap, canonicals, structured data done. **Open:** Lighthouse on production, Search Console, GA4 events live |
| Production readiness | **Open:** domain, SSL, production form test, notifications, analytics test, staging noindex confirmed on host, owner sign-off |

## Deviations and decisions

- **Platform:** custom build (Option B) — the repository was already Next.js; owners to confirm (§19).
- **Fonts:** Outfit + DM Sans (§16 recommendation), self-hosted via `next/font`; the previous Satoshi download
  step was removed.
- **Motion:** Lenis smooth scrolling was removed because §16 rules out scroll-jacking; subtle spring hover,
  scroll progress and gentle hero-chip physics remain (transform-only, off for reduced motion and touch).
- **Privacy slug:** kept `/privacy/` (recommendation was `/privacy-policy/`, which now redirects).
- **Colours:** confirmed background `#F6F9F5` and text `#13211D`; accent greens are placeholders until the full
  teal is supplied.

Open owner inputs: see [`OWNER-REGISTER.md`](OWNER-REGISTER.md).

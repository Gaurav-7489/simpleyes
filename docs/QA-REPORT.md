# QA report

Build verified: commit `cd77737` (CI run 40733971872, GitHub Actions, ubuntu-latest, Node 22, Chromium).
All numbers below are **lab** measurements from CI; real-user Core Web Vitals (75th percentile) can only be
confirmed from field data after launch (Search Console / CrUX).

## Automated checks

| Check | Result |
|---|---|
| ESLint (`eslint-config-next` core-web-vitals + TypeScript) | pass |
| TypeScript strict (`noUncheckedIndexedAccess`), incl. tests | pass |
| Production build (static export, 18 routes + sitemap/robots/manifest) | pass |
| Playwright — 103 tests (desktop + Pixel 7 projects) | **103 passed, 0 failed** (35 intentionally skipped: device-specific duplicates) |

Playwright coverage: every route renders (HTTP 200, single `h1`, no console errors), 404 page, all internal
links resolve, WhatsApp links (number, encoded prefilled text, `target=_blank`, `rel=noopener`), desktop
navigation + `aria-current`, mobile menu (open, scroll lock, Escape → focus restored, link navigation),
skip link, FAQ accordion (mouse + keyboard, answers present in server HTML), content visible with JS disabled,
axe-core WCAG 2.0/2.1/2.2 A+AA on every route (no serious/critical violations), titles/descriptions/canonicals/OG
per page, heading order, unique titles & descriptions, JSON-LD validity and absence of fake ratings/reviews/
government types, sitemap + robots, server-rendered key content.

## Lighthouse (lab, CI)

| Preset | Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| mobile | / | 99 | 100 | 100 | 100 | 0.9 s | 0 | 130 ms |
| mobile | /services/ | 99 | 100 | 100 | 100 | 0.9 s | 0 | 120 ms |
| mobile | /services/document-guidance/ | 99 | 100 | 100 | 100 | 0.8 s | 0 | 110 ms |
| mobile | /faqs/ | 99 | 100 | 100 | 100 | 0.8 s | 0 | 120 ms |
| mobile | /contact/ | 99 | 100 | 100 | 100 | 0.8 s | 0 | 100 ms |
| desktop | all five pages | 100 | 100 | 100 | 100 | 0.2 s | 0 | 10–20 ms |

Page weight ≈ 290–316 KiB total transfer per page (incl. fonts). Shipped JS on the homepage: 7 files,
≈ 177 KiB gzip (React 19 + Next.js 16 runtime; app code is the mobile menu, nav state and one
IntersectionObserver). CSS ≈ 11 KiB gzip. No images other than SVG/CSS art; no third-party requests.

## Responsive testing

Automated at **320, 360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1600, 1920, 2560 px** on every
route: no horizontal overflow, no text outside the viewport, no clipped text; tap targets ≥ 24px at 375px.
Visual review (full-page screenshots) at 1440, 768 and 390 px.

Defects found and fixed during QA:
1. Bento cards forced a ~443px min-content width below 480px (horizontal scroll; also broke the mobile
   menu click in tests) → explicit single-column grid + `min-w-0`, compact illustration variants.
2. Muted text `#767676` was 4.25:1 on the page background (axe, mobile quote + FAQ footnote) → `#6b6b6b` (≥4.6:1).
3. Long CTA label overflowed at 320px on service pages → shorter label, buttons capped at container width.
4. Breadcrumb / inline links below 24px tap height → min-height applied.
5. Three meta descriptions over 170 characters → shortened.
6. Mobile menu closed via setState-in-effect (lint) → derived "open for path" state.

## Visual comparison with the reference

Compared section-by-section at 1440 / 810–768 / 390 px against the live Agencee template: header bar,
centred hero with pill label, two-line display headline with glass word, light + dark pill CTAs, marquee,
editorial "what we do" statement, framed service cards in alternating wide/narrow rows with CTA strip,
sticky process column + 2×2 numbered cards, bento benefits, comparison-style pair, two-column FAQ cards,
oversized footer display line with glass word. Intentional differences: brand green instead of teal; glass
word is a solid green pill to keep ≥3:1 contrast; reference sections that need fabricated data (stats,
testimonials, pricing, projects, team) are omitted. See `REFERENCE-SPEC.md`.

## Not verified / limitations

- Real-device testing (iOS Safari, Firefox, Samsung Internet) and 200% zoom were not run in CI; layouts use
  fluid units and no fixed heights around text, but a manual pass on real devices is recommended.
- Field Core Web Vitals (INP especially) require post-launch real-user data.
- No deployment was made; Vercel preview not configured.
- Legal texts are drafts pending business details and legal review (pages are `noindex` until then).

## Outstanding requirements (business owner)

1. Impressum details: legal name/entity, responsible person, address, email, phone, register/VAT if any.
2. Privacy Policy: hosting provider name/address, WhatsApp conversation retention period, legal review.
3. Confirm the WhatsApp number `+49 176 62510556` (taken from the current simplyes.de).
4. Confirm fee wording (site says fees, if any, are confirmed before assistance begins).
5. Decide on a German-language version (would need professional translation + `hreflang`).
6. Choose hosting (Vercel recommended) and switch DNS for simplyes.de at cut-over.
7. Satoshi font: downloaded from Fontshare at build time under the ITF Free Font License (self-hosting
   permitted; redistribution via public repositories is not, so the file is not committed).

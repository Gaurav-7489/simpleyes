# simplyes. — website

Production website for **SimplYes** (*Redefining Consular Services.*): an independent private
documentation-assistance service helping Indians living in Germany with Indian consular and administrative
paperwork across the eight approved service categories (passport, OCI, attestation & legalisation,
affidavits & declarations, visa & documentation support, family, student and corporate).

The build follows the **SimplYes Website Development Specification v1.0** (31 October 2026): sitemap,
homepage, service-page template, enquiry system, design system, SEO, analytics and legal structure.
Everything the owners still have to supply or approve is tracked in
[`docs/OWNER-REGISTER.md`](docs/OWNER-REGISTER.md) and is never filled with guesses.

## Stack

- **Next.js (App Router)** + **React** + **TypeScript (strict)**, exported as a fully **static site** (`out/`)
- **Tailwind CSS v4** with CSS-variable design tokens (`src/app/globals.css`)
- **lucide-react** icons; original SVG/CSS illustrations (no stock or third-party imagery)
- Fonts: Outfit (headings, buttons) + DM Sans (body) via `next/font/google`, self-hosted at build time (§16)
- **Playwright** + **axe-core** for e2e, responsive, accessibility and SEO tests; **Lighthouse** in CI

Client JavaScript is limited to navigation (Services dropdown, mobile menu), the FAQ accordion/filter, the
enquiry form, consent-gated analytics, the service index and audience tabs, one shared scroll-reveal observer
and a small motion layer (scroll progress, subtle spring hover — `src/components/MotionLayer.tsx` — and a damped
cursor parallax on the hero sphere, `src/components/home/HeroParallax.tsx`). The homepage follows the Agencee
reference look (centered hero, glass sphere and word pill, soft framed cards, glossy orbs) with slow, staggered
CSS motion. Native scrolling only; all motion is transform/opacity and disabled for reduced motion / touch.
All content, FAQs and structured data are server-rendered HTML.

## Getting started

```bash
nvm use            # Node 22
npm ci
cp .env.example .env.local   # optional — defaults are production values
npm run dev        # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production static export to `out/` |
| `npm run preview` | Serve `out/` on http://localhost:4173 (mirrors static hosting) |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run test:e2e` | Playwright suite (requires `npm run build` and `npx playwright install chromium`) |
| `npm run check` | All of the above |

## Environment variables

| Variable | Default | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://simplyes.de` | Canonical origin for canonicals, sitemap, OG, JSON-LD |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `4917662510556` | Digits only. Default is the number published on the current simplyes.de |
| `NEXT_PUBLIC_SITE_ENV` | — | `production` for the live build. Anything else → `noindex` + `Disallow: /`. On Vercel, `VERCEL_ENV` is used automatically |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | — | Approved form service / secure endpoint for the enquiry form (JSON POST, 2xx = accepted), e.g. a Formspree form URL. Unset → the form says it is not connected yet and offers WhatsApp/email; it never shows success |
| `NEXT_PUBLIC_CONTACT_EMAIL` | — | Approved public email (footer, contact page, service pages, privacy requests). Unset → email routes are hidden |
| `NEXT_PUBLIC_GA_ID` | — | GA4 measurement ID. Unset → no analytics code and no consent banner. Set → consent banner; GA loads only after "Accept" |

## Project structure

```
src/
  app/                 routes (home, services, services/[slug], how-it-works, about, faqs, pricing, contact,
                       thank-you, privacy, terms, disclaimer, impressum) + sitemap, robots, manifest, llms.txt
  components/
    home/              homepage sections in §07 order (Hero, WhatWeDo=Introduction, Services, WhySimplyes,
                       Process, WhoWeHelp, Approach, TrustPanel, FaqSection) — FinalCta is shared
    layout/            Header, NavLinks (Services dropdown), MobileMenu, Footer, FloatingWhatsApp, BackToTop
    contact/           EnquiryForm, ThankYouTracker
    analytics/         Analytics (consent banner + GA4), TrackServiceView
    service/           ServiceSection (titled list card for service pages)
    illustrations/     original SVG art
    ui/                Button, Badge, Icon, SectionHeading, Wordmark, JsonLd
  content/             ALL copy and business data (site.ts, services.ts, faqs.ts, home.ts)
  lib/                 seo.ts (metadata + JSON-LD), analytics.ts, whatsapp.ts, style.ts
tests/e2e/             Playwright suites
scripts/               static server, Lighthouse runner, check-content (placeholder guard), CI helpers
docs/                  owner register, deployment guide, QA report, earlier reference spec
```

### Editing content

All text lives in `src/content/`. Business/legal details are in `src/content/site.ts`; values that are
`null` are **not yet provided** and are rendered as visible "to be provided" placeholders on the
Impressum/Privacy pages (which stay `noindex` until `legal.reviewed` is set to `true`).

- **Services:** `src/content/services.ts` — exactly the eight approved categories (§05 scope lock). Each entry
  drives its page (14-part template), card, dropdown/footer link, enquiry option, sitemap, llms.txt, JSON-LD
  and WhatsApp message. Document lists are *categories only*, labelled "subject to verification".
- **FAQs:** `src/content/faqs.ts` — six categories, single source for the FAQ page and the homepage selection.
- **Contact details:** `site.contact` (`email`, `phone`, `hours`, `responseTime`) render only when non-null.
- **Placeholder guard:** with `NEXT_PUBLIC_SITE_ENV=production`, `prebuild` fails if any non-comment line in
  `src/content/` contains `[confirm`, `[owner`, `TODO` or `to be provided`.

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Nothing has been deployed by this PR.

## Outstanding business inputs

See [`docs/OWNER-REGISTER.md`](docs/OWNER-REGISTER.md) (specification Appendix A, with current status).

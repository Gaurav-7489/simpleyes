# simplyes. — website

Production website for **SimplYes** (*Redefining Consular Services.*): an independent private
documentation-assistance service helping Indians living in Germany with Indian consular and administrative
paperwork across eight service areas (passport, OCI, attestation & legalisation, affidavits & declarations,
visa & documentation support, family, student and corporate). Visa and Corporate are built but unpublished
(`published: false`) until the owner confirms their scope.

The visual design follows the client-selected reference
[agencee-template.framer.website](https://agencee-template.framer.website/) — measured tokens, layout and
motion are documented in [`docs/REFERENCE-SPEC.md`](docs/REFERENCE-SPEC.md). All code, copy, illustrations
and branding are original to SimplYes.

## Stack

- **Next.js (App Router)** + **React** + **TypeScript (strict)**, exported as a fully **static site** (`out/`)
- **Tailwind CSS v4** with CSS-variable design tokens (`src/app/globals.css`)
- **lucide-react** icons; original SVG/CSS illustrations (no stock or third-party imagery)
- Self-hosted fonts: Satoshi (display, ITF Free Font License) + Inter (body, via `next/font`)
- **Playwright** + **axe-core** for e2e, responsive, accessibility and SEO tests; **Lighthouse** in CI

Client JavaScript is limited to the mobile menu, nav active state, one shared scroll-reveal observer and the
motion layer: [Lenis](https://lenis.darkroom.engineering) smooth scroll, spring physics for magnetic buttons and
tilting cards (`src/components/MotionLayer.tsx`) and the draggable physics chips in the hero
(`src/components/home/HeroPhysics.tsx`). All of it is transform-only, skipped for reduced motion / touch.
Everything else (including all content, FAQs and structured data) is server-rendered HTML.

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

## Project structure

```
src/
  app/                 routes (home, services/[slug], how-it-works, about, faqs, contact, impressum, privacy)
                       + sitemap.ts, robots.ts, manifest.ts, llms.txt/route.ts (generated), icon.svg, fonts/
  components/
    home/              homepage sections (Hero, WhatWeDo, Services, Process, WhySimplyes, Transparency, FaqSection)
    layout/            Header, MobileMenu, NavLinks, Footer, FloatingWhatsApp
    service/           ServiceSection (titled list card for service pages)
    illustrations/     original SVG/CSS art
    ui/                Button, Badge, CardFrame, SectionHeading, Wordmark, JsonLd
  content/             ALL copy and business data (site.ts, services.ts, faqs.ts, home.ts)
  lib/                 seo.ts (metadata + JSON-LD), whatsapp.ts, style.ts
tests/e2e/             Playwright suites
scripts/               static server, Lighthouse runner, font fetch, check-content (placeholder guard), CI helpers
docs/                  reference spec, deployment guide, QA report
```

### Editing content

All text lives in `src/content/`. Business/legal details are in `src/content/site.ts`; values that are
`null` are **not yet provided** and are rendered as visible "to be provided" placeholders on the
Impressum/Privacy pages (which stay `noindex` until `legal.reviewed` is set to `true`).

- **Services:** `src/content/services.ts`. Each entry drives its page, card, sitemap entry, llms.txt line,
  JSON-LD and WhatsApp message. Set `published: true` only once the owner confirms the scope. `pricing`,
  `documents` and `timeline` are optional and must only be set with verified values (and an official source
  for `documents`).
- **Contact details:** `site.contact` (`email`, `phone`, `hours`, `responseTime`) render only when non-null.
- **Placeholder guard:** with `NEXT_PUBLIC_SITE_ENV=production`, `prebuild` fails if any non-comment line in
  `src/content/` contains `[confirm`, `[owner`, `TODO` or `to be provided`.

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Nothing has been deployed by this PR.

## Outstanding business inputs

See the "Outstanding requirements" section of [`docs/QA-REPORT.md`](docs/QA-REPORT.md): legal entity and
Impressum details, hosting provider for the privacy notice, retention period, fee policy wording, legal
review, and an optional German-language version.

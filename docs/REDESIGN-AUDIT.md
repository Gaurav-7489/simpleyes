# Redesign audit — SimplYes Premium V2 (Concept 2)

Audited at `main` @ `19279e3` (8 Nov 2026) before any change. Evidence comes from the code, the test suite and the
Vercel project settings (read-only).

## Findings before the redesign

| Area | Finding |
|---|---|
| Stack | Next.js 16.4 App Router, React 19.3, TypeScript 6 (strict), Tailwind 4.3, lucide-react. Static export (`output: "export"`, `trailingSlash: true`) on Vercel. No reason to migrate. |
| Homepage | 10 sections + footer (Hero, What we do, Services index, Why (7 bento items), Process, Who we help (tabs), Approach, Trust, FAQs, CTA). Several repeat the same message (scope/independence appears 4×). Long on mobile. |
| Motion | A lazy-loaded `MotionLayer` (scroll-progress bar, spring "magnetic" buttons, card tilt) and `HeroPhysics` (draggable hero chips, ~320 lines) — decorative JS and continuous transforms that the brief rules out. Reveal fades were 800 ms. |
| Visual | Many identical cards; generic illustration set; uppercase labels; hero did not show the approved Concept 2 composition. 1,976-line `globals.css` with many dead classes (bento, chat scenes, marquee, orbs). |
| Enquiry | Honest and well tested: a real JSON POST only when `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is set, otherwise a truthful "being connected" notice with WhatsApp/email. Honeypot, timeouts, duplicate-submit guard, no uploads. **Endpoint is not configured in production.** |
| Content | `services.ts` (8 services with dated official sources, "subject to verification" categories), `faqs.ts`, `home.ts` are authoritative and accurate. No PCC, no prices, no testimonials. |
| SEO | Per-page titles/descriptions/canonicals/OG via `pageMetadata`; Organization, WebSite, Service, BreadcrumbList, FAQPage, ContactPage JSON-LD; sitemap of indexable URLs; robots disallow-all on non-production builds; legal pages noindex until reviewed; `llms.txt` generated from content. |
| Domains | Vercel project `simpleyes`: `simplyes.de` (production, verified), `www.simplyes.de` → 308 → apex, **`simpleyes.vercel.app` also serves production and was crawlable** (`robots.txt` Allow, canonical → simplyes.de). |
| Redirects / slashes | Retired slugs redirect in `vercel.json`; trailing slashes enforced by Next. |
| Tests / CI | Unit tests (enquiry + owner settings), Playwright (routes, links, nav, a11y via axe, SEO, responsive 320–2560 px, reduced motion, enquiry flows), Lighthouse in CI, cross-browser job (Firefox/WebKit) for enquiry/nav/FAQ. |
| Legal / owner flags | `owner-settings.json`: legal identity fields null, `legal.reviewed: false`, all launch approvals false. |

## Decisions

**Preserved:** all routes and slugs, all content modules and their wording, enquiry logic, owner-settings and launch
checks, JSON-LD builders, robots/sitemap/llms.txt behaviour, legal safeguards, CSP and security headers, the test suite.

**Refactored:** design tokens and the whole visual system (`globals.css` rewritten, −60%); header/nav; mobile menu (animated
services group, WhatsApp shortcut); footer; PageHero; ServiceCard; FAQ accordion (animated `grid-template-rows`, no
clipping); service template (reading column + sticky assistance card + "In short" answer block); every inner page.

**Added:** original Concept 2 hero illustration (`HeroVisual`, SVG); service tile grid; mobile action bar (Get Assistance +
WhatsApp, appears after the hero, hides near CTAs/footer/menu/form focus); `Breadcrumbs`; ItemList and AboutPage JSON-LD;
email on the Organization contact point; richer `llms.txt`; `X-Robots-Tag: noindex` for the `simpleyes.vercel.app` host.

**Removed:** `MotionLayer`, `LazyMotion`, `HeroPhysics`, `ServiceIndex`, `ServiceArt`, `ServiceSection`, and the homepage
sections What we do / Who we help / Approach / Trust (their content remains on About, How It Works and service pages).

**Unsafe assumptions avoided:** no photo/stock imagery implying staff or official status; no passport emblem or government
marks in artwork; no new claims, prices, response times or FAQs.

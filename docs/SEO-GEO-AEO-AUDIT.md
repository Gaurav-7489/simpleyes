# SEO · GEO · AEO audit — Premium V2

## Technical SEO

| Item | Status |
|---|---|
| Unique titles & descriptions | Present (tested: unique, 15–70 / 70–170 chars). Homepage title/description updated to the new H1. |
| One H1, no skipped heading levels | Present and tested on every indexable route. |
| Canonicals | `https://simplyes.de/...` with trailing slash on every page (from `NEXT_PUBLIC_SITE_URL`). Verified against the Vercel project: `simplyes.de` is the verified production domain. |
| Duplicate hosts | `www` → 308 → apex (Vercel). **Added** `X-Robots-Tag: noindex` for `simpleyes.vercel.app` (it served production and allowed crawling). Preview deployments stay noindex + `Disallow: /` via `VERCEL_ENV`. |
| Open Graph / X cards | Present (`/og-image.png`, 1200×630). Image still uses the earlier artwork — refresh once the official logo exists. |
| Sitemap / robots | Indexable URLs only; legal pages added automatically once `legal.reviewed = true`; thank-you never listed. |
| Noindex rules | thank-you, 404 and legal pages (until reviewed). |
| Breadcrumbs | Visible on every inner page and matching BreadcrumbList JSON-LD. |
| hreflang | Not used — English only, no localised versions. |
| Performance | Static HTML, SVG hero (no raster LCP), no motion libraries. Lighthouse lab: see README / final report. |
| Search Console / Bing | Ready: verify `simplyes.de` (DNS TXT), submit `https://simplyes.de/sitemap.xml`. Needs owner accounts. |

## Structured data

| Type | Where | Notes |
|---|---|---|
| Organization | all pages | Name, URL, logo, slogan, description, areaServed Germany, contactPoint (WhatsApp number, **email added**). No address, no opening hours, no ratings. |
| WebSite | all pages | — |
| Service | each service page | Provider → Organization; areaServed Germany. No prices. |
| BreadcrumbList | inner pages | Matches visible breadcrumb. |
| FAQPage | /faqs/, service pages | Matches visible accordions exactly. Not expected to produce rich results (Google limits them); kept for accuracy, not ranking. |
| ContactPage | /contact/ | — |
| ItemList | /services/ | **Added** — mirrors the visible directory. |
| AboutPage | /about/ | **Added** — `about` → Organization. |

Intentionally absent: LocalBusiness / ProfessionalService (no public address), GovernmentOrganization, Review/AggregateRating,
Person, Offer/price. Validate with the Schema Markup Validator and Rich Results Test after deployment (not reachable from the
build sandbox).

## GEO (generative engines)

- Consistent identity sentence on every surface: independent private documentation-assistance service, not affiliated with
  the Embassy, Consulates or application centres.
- Eight-service taxonomy identical across nav, footer, sitemap, JSON-LD and `llms.txt`.
- `llms.txt` now also lists the five-step journey (with who acts), what SimplYes does not do, the fee model and the email.
  It is an optional summary; it does not guarantee AI indexing.
- Official sources with "checked" dates stay on each service page. Source URLs were **not** re-verified in this pass (the
  sandbox cannot reach external sites) — see LAUNCH-BLOCKERS.

## AEO (answer engines)

- Each service page now opens with an **"In short"** block: the one-sentence answer, who it is for, and SimplYes' role —
  before any detail.
- The FAQ page opens with a short independence answer.
- Homepage FAQs reduced to five, independence first.
- No new questions were invented; all answers come from `faqs.ts` / `services.ts`.

## Still pending

Official logo + refreshed OG image; Search Console / Bing verification; post-deploy validator runs; re-check of official
source URLs; field Core Web Vitals once live traffic exists.

# SEO, GEO and AEO audit — simplyes.de

Audit date: 15 Nov 2026. Production checked over HTTPS with `curl` and the built HTML. No Search Console,
Bing Webmaster Tools or Vercel dashboard access was available, so **no indexing, ranking, impression or
click data is reported here**. Nothing below claims Google or Bing has indexed the site.

Legend: ✅ verified on production or in the build · 🔧 fixed in this change (verify after deploy) · ⏳ owner action · ℹ️ by design

## 1. Audit matrix

| Feature | Current status | Issue | Required action |
|---|---|---|---|
| Canonical domain | ✅ Every page has `<link rel="canonical">` on `https://simplyes.de/…/` | — | None |
| `www.simplyes.de` | ✅ 308 → `https://simplyes.de/` | — | None |
| No trailing slash (`/about`) | ✅ 308 → `/about/` | — | None |
| `simpleyes.vercel.app` | Before: 200, `index, follow`, a full duplicate of the site (canonical pointed to simplyes.de, which limits but does not remove the risk) | Duplicate host | 🔧 `vercel.json` host redirect: 308 → `https://simplyes.de/:path*` |
| Other production aliases (`simpleyes-<team>.vercel.app`, `simpleyes-git-main-…`) | Serve the production build | Possible duplicates | 🔧 `X-Robots-Tag: noindex, nofollow` for any `*.vercel.app` host. Previews stay usable for testing; `simplyes.de` gets no such header |
| Preview/staging builds | ✅ `robots.txt` disallows everything and pages are `noindex` when `NEXT_PUBLIC_SITE_ENV` ≠ `production` | — | None |
| `/privacy-policy` | 308 → `/privacy-policy/` → 308 → `/privacy/` (2 hops) | Minor: the platform adds the slash before `vercel.json` redirects run | ℹ️ Acceptable (Google follows up to 10 hops); the page is noindex until legal review |
| Unreviewed legal pages | ✅ `noindex`, not in the sitemap | — | ⏳ Set `legal.reviewed` only after a real review |
| `/thank-you/` | ✅ `noindex`, not in the sitemap | — | None. It is deliberately **not** disallowed in robots.txt: a blocked crawler could never see the noindex |
| 404 page | ✅ `noindex`, real 404 status | — | None |
| Sitemap | Before: every page dated `2026-11-15` from one build-wide value | Unrealistic `lastmod` | 🔧 Per-page dates in `src/content/page-dates.ts`, changed only when that page's content changes (test enforces an entry per page, no future dates) |
| Titles | Before: 3 over 60 characters (`/services/` 61, OCI 61, Student 65) and service titles worded as categories | Truncation in results; weaker match to how people search | 🔧 All ≤ 60. Service titles now name the task, e.g. "Indian Passport Renewal & Reissue Help in Germany", "OCI Card Application & Update Help in Germany", "Apostille & Attestation Help in Germany". The test limit is now 60 |
| Meta descriptions | ✅ 137–164 characters, unique, factual | — | None |
| Headings | ✅ One H1 per page; H2/H3 in order (axe checks) | — | None |
| Images | ✅ The only raster image (passport photo) has descriptive alt text; SVG scenes have `role="img"` + `aria-label`; decorative SVGs are hidden | — | ⏳ Owner to confirm approval of the passport photo (shows the State Emblem) |
| Internal links | ✅ Home → 8 services; each service → prefilled contact, related services, FAQs; footer → all pages | — | None |
| Open Graph / Twitter | ✅ Title, description, image (1200×630) on all pages | Image is a stand-in | ⏳ Replace when the official logo arrives |
| Structured data | ✅ Organization (+ email ContactPoint), WebSite, BreadcrumbList, Service (+ `hasOfferCatalog` of the approved problems, `availableChannel`), FAQPage | Google no longer shows FAQ rich results (May 2026) | ℹ️ Keep the valid markup, expect no FAQ snippet; see §3 |
| `LocalBusiness` | Not used | No confirmed address, opening hours or office | ⏳ Add only after the Impressum address and opening hours are confirmed and approved for publication |
| Performance / crawlability | ✅ Static HTML; all content (including closed accordion rows) is in the HTML without JavaScript | — | None |
| Search Console / Bing | ❌ Not accessible from this session | No data | ⏳ See §5 |

## 2. GEO / AEO (answer engines)

| Item | Status |
|---|---|
| Crawlable HTML | ✅ Every service page, FAQ and process step is server-rendered static HTML; the accordions are `<button>` + panel with the text present in the HTML |
| Direct answers | ✅ Each service page opens with a one-sentence outcome; FAQs answer in the first sentence; "What SimplYes can / cannot do" is stated plainly. No new FAQs were invented in this audit |
| Entity consistency | ✅ The same description everywhere: "SimplYes is an independent documentation assistance service" for Indians in Germany, **not** an embassy, consulate, government authority or law firm (Organization JSON-LD, footer, About, `llms.txt`) |
| `llms.txt` / `llms-full.txt` | ✅ Plain-text summary and full text. ℹ️ This is an emerging convention; **it does not guarantee that any AI system reads, indexes or cites the site** |
| Claims | ✅ Tests reject prices, "guaranteed approval/appointment/visa" and "we guarantee" in the AI-facing text. No eligibility rulings, testimonials, credentials or affiliations |
| City pages / keyword stuffing | ✅ None created |

### AI crawlers (`src/lib/crawlers.ts`, `src/app/robots.ts`)

robots.txt now separates three purposes instead of listing every bot with "AI" in its name:

| Group | User agents | What it controls | Setting |
|---|---|---|---|
| Search indexing | `Googlebot`, `Bingbot` | Google and Bing results (Bing also feeds Copilot and other answer engines) | Always allowed |
| AI search & user-triggered retrieval | `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User` | Appearing in ChatGPT/Perplexity/Claude search answers; fetching a page a user asked about | Always allowed |
| Model training | `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended` | Use of the text to train models. `Google-Extended` and `Applebot-Extended` are control tokens, not separate crawlers; blocking them does not affect Google Search or Apple search visibility | Allowed (the pre-audit behaviour). ⏳ Owner decision: set `ALLOW_MODEL_TRAINING = false` to opt out |

Bots not listed (e.g. `CCBot`, `Bytespider`) fall under `User-Agent: *` (allowed). Add a group only for a
concrete reason. robots.txt is a request that reputable crawlers honour, not access control.

## 3. Structured data

- Valid JSON-LD, generated from the same content as the page (no hidden claims). Checked in tests: every
  service's `hasOfferCatalog` lists exactly its approved problems; the Organization names no address.
- **FAQPage:** according to Google's FAQPage documentation (as reported in industry coverage checked 15 Nov
  2026), FAQ rich results stopped appearing in Google Search on **7 May 2026** for all sites. Support in the Rich
  Results Test and in Search Console reports was removed in mid-2026. So **no FAQ rich result can be expected**.
  The markup stays because it is valid, accurate and matches the visible FAQs word for word. Other consumers,
  such as Bing and AI answer engines, may still read it; this is not guaranteed. It must never be added for
  hidden or invented questions. Re-check Google Search Central before relying on this.
- **Service** is not a Google rich-result type; it describes the offering for parsers. **LocalBusiness**
  needs a confirmed address — not added.
- Owner/developer check after deploy: run a service page and `/faqs/` through `https://validator.schema.org/`
  (syntax and vocabulary), and the home page through `https://search.google.com/test/rich-results`
  (breadcrumbs/organization). Expect no FAQ rich-result result.

## 4. Changes in this release

1. `vercel.json`: `simpleyes.vercel.app` → 308 to `https://simplyes.de/:path*`; `X-Robots-Tag: noindex, nofollow`
   on every other `*.vercel.app` host. Unit test `tests/unit/hosting.test.mjs`.
2. `src/content/page-dates.ts` + `src/app/sitemap.ts`: per-page `lastmod`.
3. `seoTitle` per service (`src/content/services.ts`); `/services/` title shortened.
4. robots.txt groups by purpose; owner-controlled training switch.
5. Tests: titles ≤ 60, sitemap dates per page, robots groups.

## 5. Search Console and Bing — owner steps (no access from development)

1. **Google Search Console** (`https://search.google.com/search-console`), signed in with an account owned by SimplYes:
   Add property → **Domain** → `simplyes.de` → add the TXT record shown at the domain's DNS provider → Verify.
   (Adding a TXT record does not change mail or website routing.)
2. Sitemaps → submit `https://simplyes.de/sitemap.xml`.
3. URL inspection → test `https://simplyes.de/` and one service page → **Request indexing**.
4. After 1–2 weeks, check Pages (indexed / excluded and why) and Performance. Expected exclusions: the
   thank-you page, legal pages while unreviewed, redirected `www`/`vercel.app` URLs.
5. **Bing Webmaster Tools** (`https://www.bing.com/webmasters`): Import from Google Search Console (fastest), or add the
   site and verify by DNS; submit the same sitemap. Bing's index also feeds several AI answer engines.
6. Give the developer read access (Search Console → Settings → Users) if reports should be reviewed.

Until these are done, nobody can state whether or how the site is indexed.

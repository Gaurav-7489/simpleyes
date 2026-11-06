# Handover

## 6 November 2026 completion pass

See [`LAUNCH-STATUS.md`](LAUNCH-STATUS.md) for the current release scope, validation evidence and exact
owner handoff. That dated report supersedes the earlier production observations below. The existing
eight-service website is being completed; AI, uploads, portals and payments remain outside this release.

Specification §22 (F · Handover). Read with [`DEPLOYMENT.md`](DEPLOYMENT.md) (hosting, domain, DNS, launch
checklist), [`OWNER-REGISTER.md`](OWNER-REGISTER.md) (open owner inputs) and [`QA-REPORT.md`](QA-REPORT.md)
(test results and §23 status).

## 1. Accounts and access (owner-held)

All accounts must be created by, or transferred to, the business owners. Developers are invited as members,
never as the only owner.

| Account | Purpose | Status |
|---|---|---|
| GitHub repository `simpleyes` | Source code, history, CI | Exists |
| Hosting: Vercel (`gaurav-7489s-projects/simpleyes`) | Production (simplyes.de) + preview deployments | Live. Confirm the account owner and the plan (Hobby is non-commercial) |
| Domain registrar for `simplyes.de` | DNS, SSL via host | Existing, owner-held |
| Form service: Formdall (recommended) | Receives enquiries, filters spam, emails `Info@simplyes.de` | To be created by SimplYes under `Info@simplyes.de` (see ENQUIRY-SETUP.md) |
| Business inbox `Info@simplyes.de` | Enquiry notifications, public contact | Exists |
| Google Analytics 4 | Traffic and conversion measurement | To be created by owners |
| Google Search Console | Indexing, sitemap, search queries | To be verified after launch |

## 2. Third-party services and subscriptions

| Service | Used for | Personal data? | Cost | Required? |
|---|---|---|---|---|
| Hosting (Vercel) | Serving the static site | Server logs (IP) | Hobby is free but for non-commercial use only; Pro is billed per team member per month (check current pricing). Cloudflare Pages' free tier allows commercial use | Yes |
| Form service: Formdall (recommended) | Enquiry spam check and delivery to the inbox | Yes: enquiry fields; not stored if "store submissions" stays off; servers in Germany; AVV included | Free: 100 submissions/month; Hobby €4.99/month incl. VAT for 1,000 | Yes, before enquiries can arrive |
| Email provider for `Info@simplyes.de` | Receiving enquiries | Yes | Existing | Yes |
| Google Analytics 4 | Analytics, only after consent | Pseudonymous IDs | Free | Optional |
| Google Search Console | SEO monitoring | No | Free | Recommended |
| Google Fonts (Outfit, DM Sans) | Typography | **No**: fonts are downloaded at build time and served from the site's own domain | Free (open licence) | Yes |
| WhatsApp (`wa.me` link) | Contact route | Only when the visitor chooses to open WhatsApp | Free | Yes |

Every service that receives personal data must be named in the Privacy Policy (with a data processing
agreement where required) before launch. There are no other runtime dependencies: no CMS, database,
tag manager, chat widget, font CDN or AI service.

## 3. Content editing (instructions for the business team)

The site has no separate CMS. All content is in a few readable files under `src/content/`. You can edit
them in GitHub's web editor (pencil icon), and saving to `main` triggers CI and, once hosting is
connected, a new deployment.

| To change… | Edit | Notes |
|---|---|---|
| Phone, WhatsApp, email, response time, opening hours | `src/content/site.ts` → `site.whatsapp`, `site.contact` | Leave a value `null` to hide it; never guess |
| Impressum / legal details | `src/content/site.ts` → `site.legal` | Set `reviewed: true` only after legal review; this makes the legal pages indexable |
| Service pages (all eight) | `src/content/services.ts` | One entry per service; the slug (URL) must not change without a redirect |
| FAQs | `src/content/faqs.ts` | Single source for the FAQ page, homepage and service pages |
| Homepage, About, How It Works, Pricing text | `src/content/home.ts` | |
| Pricing amounts (when approved) | `src/content/home.ts` → `pricing.serviceFees` | One line per service: `{ slug, fee: { kind: "from", amountEur } }` or `{ kind: "quote" }`. Empty = table hidden |

Rules that the build enforces or the team must keep:

- Exactly eight services. Do not add a service without written owner approval (§05 scope lock).
- No invented prices, contact details, testimonials, statistics or official requirements.
- A production build fails if content contains `TODO`, `[confirm`, `[owner` or `to be provided`.
- After editing, check the change on the staging/preview deployment before it goes to production.

A headless CMS can be added later (the content model is already separated from the layout) if the team
needs to edit frequently without GitHub.

## 4. Backup and recovery

- **Website:** the git repository is the complete backup: code, content, images and configuration. Any
  earlier version can be restored by redeploying a previous commit (Vercel: Deployments → ⋯ → *Promote to
  Production* / *Instant Rollback*). Keep at least one owner-held clone or GitHub's own backups.
- **Enquiries:** the site stores no data. Enquiries live in the form service's dashboard and in the
  business inbox. Back up and retain them according to the retention period in the Privacy Policy
  (owner decision).
- **Analytics:** held in GA4. Set the data retention period deliberately (EU use).
- **Domain:** keep registrar access and DNS records documented. DEPLOYMENT.md lists the records to change
  at cut-over.
- **Recovery test before launch:** roll back once on staging and confirm the previous version is served.

## 5. Organised assets

| Asset | Location | Status |
|---|---|---|
| Wordmark (typographic stand-in) | `src/components/ui/Wordmark.tsx` | Replace with the official SVG when supplied |
| Favicon / app icons | `src/app/icon.svg`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png` | Derive from the official logo when supplied |
| Social sharing image | `public/og-image.png` (1200×630) | Derive from the official logo when supplied |
| Illustrations | `src/components/illustrations/ServiceArt.tsx` and homepage SVG | Original SVG, no licensed or stock imagery |
| Colours, type, spacing tokens | `src/app/globals.css` | Teal `#0B7F8C` applied; logo gradient stops still approximate |

## 6. Technical documentation

- Architecture, scripts, environment variables, project structure: [`README.md`](../README.md)
- Deployment, redirects, security headers, staging noindex: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- Analytics events (§18): `src/lib/analytics.ts`: `view_service`, `cta_click`, `whatsapp_click`,
  `email_click`, `form_start`, `form_error`, `generate_lead` (fired once on `/thank-you/` after an accepted
  submission). No personal data is ever sent.
- Tests: `tests/e2e/` (Playwright + axe). CI: `.github/workflows/ci.yml` (lint, build, typecheck, e2e,
  Lighthouse).

## 7. Known limitations and outstanding issues

Launch-blocking items are owner inputs, tracked in OWNER-REGISTER.md. The technical limitations are:

1. **Enquiry delivery is not connected yet (verified on production 6 Nov 2026).** The form is fully built and validated. Until
   `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is set, it explains that it is not connected and offers WhatsApp/email; it
   never shows false success. Server-side re-validation, spam filtering, notification email and the
   optional acknowledgement email are provided by the chosen form service. Duplicate submits are blocked
   in the browser (disabled button + "Sending…").
2. **Static hosting.** There is no server of our own, so rate limiting and duplicate detection beyond the
   browser rely on the form service. Security headers apply on Vercel (`vercel.json`), not on GitHub
   Pages.
3. **Legal pages** are structured drafts and stay `noindex` until reviewed (`site.legal.reviewed`). The
   Impressum is publicly reachable with placeholder fields; fill it in first.
4. **Brand assets.** The wordmark, favicon and social image are stand-ins until the official logo file is
   supplied. The teal is final (`#0B7F8C`).
5. **Not yet verified on real devices or browsers:** iOS Safari, Android Chrome, desktop Safari, Firefox and
   Edge, plus a screen-reader spot check (§23). Automated testing covers Chromium only.
6. **Production checks still open:** real enquiry reaching the inbox, notifications, GA4 events, Search
   Console, rollback test. Domain, SSL, redirects, links and Lighthouse were checked on production.
7. **Held-back FAQs:** "How can I pay?", "What happens if I cancel a service?", "Can I receive help
   remotely?" and "How will I receive updates?" wait for owner answers.

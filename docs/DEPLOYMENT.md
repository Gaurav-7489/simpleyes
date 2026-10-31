# Deployment

The site is a static export (`next build` → `out/`). No server runtime or database is required. The enquiry
form posts to an external, approved form service (no credentials in client code), and analytics load only
after consent.

## Before going live (checklist)

- [ ] Fill in `site.legal` in `src/content/site.ts` with verified Impressum details; set `reviewed: true`
      only after the owner / a lawyer has approved Impressum and Privacy Policy.
- [ ] Name the hosting provider, form service and retention periods in the Privacy Policy; supply the Terms
      (payments, cancellation/refunds, complaints, liability) and have Privacy, Terms, Disclaimer and Impressum
      reviewed by a qualified German adviser.
- [ ] Confirm the WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`) and set `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] **Enquiry form:** create the form at the approved service (e.g. Formspree: new form → notification
      email = the business inbox; enable its spam filtering), set `NEXT_PUBLIC_ENQUIRY_ENDPOINT`, then submit
      a real test enquiry on production and confirm it arrives (subject: "New enquiry — <service> — <city>")
      and that the page redirects to `/thank-you/`. If the service is not on `formspree.io`, add its host to
      `connect-src` and `form-action` in `vercel.json`.
- [ ] **Analytics:** create the GA4 property (EU data settings, Google signals off), set `NEXT_PUBLIC_GA_ID`,
      have the banner text reviewed, and mark `generate_lead` as a key event in GA4. Verify events in GA4
      DebugView after accepting the banner.
- [ ] **Now, until cut-over:** set `NEXT_PUBLIC_SITE_ENV=staging` on the Vercel project (Production and
      Preview). Without it, `simpleyes.vercel.app` builds as production and is indexable with a canonical
      pointing at `simplyes.de`, which still serves the old site.
- [ ] Production build uses `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://simplyes.de`.
- [ ] After launch: submit `https://simplyes.de/sitemap.xml` in Google Search Console / Bing Webmaster Tools
      and monitor Core Web Vitals (field data) there.

## Option A — Vercel (recommended)

1. Import the GitHub repository in Vercel (framework auto-detected: Next.js).
2. Environment variables (Production): `NEXT_PUBLIC_SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://simplyes.de`.
   Preview deployments automatically get `noindex` + `Disallow: /` (via `VERCEL_ENV`).
3. Add the domain `simplyes.de` (and `www.simplyes.de` → redirect to apex) in Project → Domains, then
   update DNS at the registrar as Vercel instructs. The domain currently points at GitHub Pages, so DNS
   must be switched at cut-over time.
4. `vercel.json` applies security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)
   and long-term caching for hashed assets.

## Option B — GitHub Pages (current host of simplyes.de)

1. Build with `NEXT_PUBLIC_SITE_ENV=production npm run build`.
2. Publish `out/` (e.g. with `actions/upload-pages-artifact` + `actions/deploy-pages`), add a `CNAME` file
   containing `simplyes.de` to `out/`, and add an empty `.nojekyll` so `_next/` is served.
3. Limitation: GitHub Pages cannot set custom response headers, so the CSP/HSTS/frame headers from
   `vercel.json` will not apply. If those are required, put a CDN (e.g. Cloudflare) in front or use Option A.

## Redirects (`vercel.json`, permanent)

- The six retired service slugs (`/services/document-guidance/`, `application-form-assistance`,
  `photo-signature-preparation`, `appointment-guidance`, `process-clarification`, `personalized-assistance`)
  → `/services/`
- `/clients` → `/` (old-site link)
- `/datenschutz/` and `/privacy-policy/` → `/privacy/`

The local static server and `next build` do not apply `vercel.json`; verify redirects on a Vercel preview
deployment (`curl -sI https://<preview>/services/document-guidance/`). GitHub Pages (Option B) would need
meta-refresh stub pages instead.

## Verifying a deployment

```bash
npm run build && npm run preview          # local static server on :4173
npx playwright test                       # full suite against the export
```

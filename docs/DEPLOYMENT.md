# Deployment

The site is a static export (`next build` → `out/`). No server runtime or database is required. The enquiry
form posts to an external, approved form service (no credentials in client code), and analytics load only
after consent.

## Current state (checked 6 Nov 2026)

- **Host:** Vercel, Git-connected to this repository. Pushing to `main` deploys production; other branches get
  preview deployments (automatically `noindex` + `Disallow: /` via `VERCEL_ENV`).
- **Domain:** `simplyes.de` is already served by Vercel with SSL; `www.simplyes.de` redirects to the apex.
  The site is live and indexable.
- **Vercel alias:** `simpleyes.vercel.app` serves the same production build (canonical points to
  `simplyes.de`). Recommended: in Project → Domains, redirect it to `simplyes.de`.
- **Not configured yet:** `NEXT_PUBLIC_ENQUIRY_ENDPOINT` (form shows "being connected"), `NEXT_PUBLIC_GA_ID`.
- **Owner:** the project `simpleyes` (`prj_KkwE0rGCxj686jynFiYLcQ7KEg6W`) lives in the Vercel team
  `gaurav-7489s-projects`, the default team of the developer's personal Vercel account, not a SimplYes-owned
  account. (From the Vercel GitHub integration's comment on the PR.)
- **Plan:** not visible from GitHub. To check: sign in at vercel.com with the account that owns
  `gaurav-7489s-projects` → the team switcher (top left) shows the plan next to the team name → **Settings →
  Billing** shows the plan and charges; **Settings → Members** shows who owns the team. Vercel's Hobby plan is
  for personal, non-commercial use only; a business site should run on Pro (about $20 per deploying seat per
  month; check Vercel's pricing page).
- **Ownership (not done; owner decision):** for SimplYes to own hosting, create a Vercel account/team with
  `Info@simplyes.de`, choose its plan, then move the project there (Project → Settings → **Transfer project**)
  and re-check the domain and environment variables afterwards. Nothing has been changed or purchased.

## Remaining launch steps

- [ ] **Impressum (urgent: it is live with placeholders):** fill in `site.legal` in `src/content/site.ts`
      with verified details; set `reviewed: true` only after the owners / a lawyer have approved Impressum and
      Privacy Policy.
- [ ] Name the hosting provider, form service and retention periods in the Privacy Policy; supply the Terms
      (payments, cancellation/refunds, complaints, liability) and have Privacy, Terms, Disclaimer and Impressum
      reviewed by a qualified German adviser.
- [ ] **Enquiry form:** follow [`ENQUIRY-SETUP.md`](ENQUIRY-SETUP.md) (Formdall, EU/Germany): create the
      account under `Info@simplyes.de`, create the form with an email action to `Info@simplyes.de`, set
      `NEXT_PUBLIC_ENQUIRY_ENDPOINT` and `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD` in Vercel, redeploy, then send a
      real test enquiry and confirm the email arrives. `vercel.json` already allows `api.formdall.de`; any
      other service needs its host added to `connect-src` and `form-action`.
- [ ] **Analytics (kept disabled until the owners decide):** if wanted, create the GA4 property (EU data settings, Google signals off), set `NEXT_PUBLIC_GA_ID`,
      have the banner text reviewed, and mark `generate_lead` as a key event in GA4. Verify events in GA4
      DebugView after accepting the banner.
- [ ] Production env vars: `NEXT_PUBLIC_SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://simplyes.de`
      (current behaviour matches this).
- [ ] Submit `https://simplyes.de/sitemap.xml` in Google Search Console / Bing Webmaster Tools and monitor
      Core Web Vitals (field data) there.
- [ ] Test a rollback once (Deployments → previous deployment → Instant Rollback), then roll forward.

## Environment variables in Vercel

`NEXT_PUBLIC_*` values are compiled into the static files, so after changing any of them, **redeploy**
(Deployments → ⋯ → Redeploy) for the change to take effect. See README.md for the full list.

## Alternative host: Cloudflare Pages or GitHub Pages

Because the build is a plain static export, it can move without code changes:

1. Build command `npm run build`, output directory `out`, Node 22, same environment variables.
2. Redirects and security headers from `vercel.json` must be re-created in the new host's format
   (Cloudflare Pages: `_redirects` and `_headers` files in `public/`). GitHub Pages cannot set headers or
   server redirects at all.
3. Point the `simplyes.de` DNS records at the new host and remove the domain from Vercel.

## Redirects (`vercel.json`, permanent)

- The six retired service slugs (`/services/document-guidance/`, `application-form-assistance`,
  `photo-signature-preparation`, `appointment-guidance`, `process-clarification`, `personalized-assistance`)
  → `/services/`
- `/clients` → `/` (old-site link)
- `/datenschutz/` and `/privacy-policy/` → `/privacy/`

Verified on production on 6 Nov 2026 (308 responses). The local static server does not apply `vercel.json`.

## Verifying a deployment

```bash
npm run build && npm run preview          # local static server on :4173
npx playwright test                       # full suite against the export
BASE=https://simplyes.de CHROME_PATH=/path/to/chrome node scripts/lighthouse.mjs   # Lighthouse on live
```

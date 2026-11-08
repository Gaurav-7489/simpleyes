# Launch blockers & owner decisions — Premium V2

The redesign does not change any owner setting or approval. Nothing here was filled in by guessing.

## Blocking a public relaunch of the redesign

1. **Owner approval of the V2 preview.** Do not merge to `main` (which deploys production) until the owners approve.
2. **Impressum / legal identity** — `legal.legalName`, `businessType`, `representative`, `street`, `postalCodeCity`, `vatId`,
   `register` are `null` in `src/content/owner-settings.json`. Legally required in Germany (§ 5 DDG). Pages show visible
   "to be provided" markers and stay noindex.
3. **Legal review** — Privacy, Terms, Disclaimer and Impressum need review by the owners / a qualified adviser before
   `legal.reviewed` is set to `true`. Do not describe the site as GDPR-certified.
4. **Enquiry form endpoint** — `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is not set in production, so the form truthfully says it is
   being connected and routes to WhatsApp/email. Set up per `docs/ENQUIRY-SETUP.md`, then confirm delivery
   (`launch.enquiryDeliveryConfirmed`).
5. **Launch approvals** in `owner-settings.json → launch` (branding, hosting, service content, independence statement,
   quotation model) are all `false`; `npm run check:launch` fails until they are recorded.

## Needed for V2 polish (not legally blocking)

- **Official logo file.** The header uses a typographic tick + "SimplYes." following Concept 2 (`Wordmark.tsx`). Replace with
  the supplied SVG; regenerate `public/og-image.png`, icons and `src/app/icon.svg` from it.
- **Hero imagery.** The hero uses an original SVG illustration (Brandenburg Gate, no emblems). If the owners prefer a
  photograph, supply a licensed image (with licence record) — avoid real government documents, emblems or identifiable people.
- **Official source re-check.** Source links in `src/content/services.ts` were last checked 30 Oct 2026; re-verify before
  relaunch (not possible from the build sandbox).
- **Hosting plan.** Vercel team is the developer's personal team; Hobby plan is non-commercial. Owners to confirm account/plan.

## Domain / indexing

- Canonical domain `https://simplyes.de` confirmed in the Vercel project (verified, `www` → 308 → apex).
- `simpleyes.vercel.app` now sends `X-Robots-Tag: noindex` (takes effect when this branch reaches production). Optionally,
  the owners can make it a 308 redirect to `simplyes.de` in Vercel → Domains.
- Search Console and Bing Webmaster Tools: owners to verify the domain and submit the sitemap.

## Not verified in this environment

- Firefox and WebKit runs (browser downloads are blocked here) — covered by the CI `enquiry-and-browsers` job.
- Live Vercel preview rendering — depends on Vercel building the pushed branch.
- Field Core Web Vitals (only lab Lighthouse was measured).

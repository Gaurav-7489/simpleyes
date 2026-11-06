# SimplYes launch completion — 6 November 2026

**Status: code complete and deployed; real enquiry integration and business/legal launch approval pending.**

## Owner self-service completion

The handover now includes `src/content/owner-settings.json` for legal identity, mailbox/retention text,
commercial policy text and owner approval records. Prebuild validation rejects malformed settings and
prevents legal review from being marked complete while required fields are missing. Fifteen unit tests
cover enquiry configuration and the owner settings safeguards. The manual **Owner launch readiness**
GitHub workflow checks the recorded inputs and public Contact page; it intentionally reports pending
activation until real inputs, approvals and an owner-confirmed inbox test are supplied.

The optional `policies` group accepts full owner/adviser-approved legal-page replacements as escaped
plain text, so final policy revisions can also be published without editing page components.

Owner-handover application release `9594e8355ba019b744f42cc1dc6072d053ac0060` passed both `quality` and
`enquiry-and-browsers` in [CI run 42257126008](https://github.com/Gaurav-7489/simpleyes/actions/runs/42257126008).
Local lint, production build, TypeScript and all 15 unit tests passed. Full-policy rendering/escaping and
default fallback were verified. Public smoke checks confirmed all 20 required pages return 200, expected
canonicals/noindex rules and the correct contact destinations. The owner readiness check correctly lists
the missing owner inputs and disconnected production endpoint; it has not been marked ready.

Follow [OWNER-ACTIVATION.md](OWNER-ACTIVATION.md) for the complete owner procedure. The enquiry backend
remains the managed Formdall service; its production validation/delivery is an external activation check.
No custom API, customer database, portal or document-upload backend has been built or claimed.

## Verified release evidence

- PR #4 was merged as `8799cc8031f62b2398f1e114ffcc26cb55b6f69f`.
- Application release `adecded9f38e2c82f775d13c41fe9edd43d6db66` was pushed to `main` and verified through GitHub.
  It includes `73b289f` (enquiry safeguards) and `8c262ba` (early input and accessible mobile menu fixes).
- Vercel production deployment `dpl_CsBjCSDaaWDfi7UDX9m6CZLMgVW2` is READY, assigned to `simplyes.de`,
  `www.simplyes.de` and `simpleyes.vercel.app`, with the exact application release SHA above.
- Public HTTP smoke checks: all **20 required pages** and `robots.txt`, `sitemap.xml`, `llms.txt` return
  200. An unknown route returns 404 with noindex. `www.simplyes.de` reaches the apex. The Vercel alias
  serves the site with the canonical pointing to `https://simplyes.de/` (it is not redirected).
- Production canonicals, Formdall CSP, approved email/WhatsApp destinations, noindex on thank-you and
  unreviewed legal pages, disabled-form disclosure and disabled-analytics disclosure were checked.
- Live browser: Services opens and Escape closes it; OCI Services opens its own page; its assistance CTA
  preselects OCI on Contact; blank submission shows inline errors and focuses Full name; selecting
  Corporate Services reveals company fields. The live teal/lime values are #0B7F8C / #B8E05A.
  No application console errors were observed; browser extension errors are outside the site.
- Pre-release CI run [42249251449](https://github.com/Gaurav-7489/simpleyes/actions/runs/42249251449):
  **171 full-site browser tests + 84 configured-enquiry/cross-browser tests passed**, zero failed or
  flaky; seven configuration unit tests passed. There were 101 expected skips across the two jobs
  (inapplicable device checks and mutually exclusive configured/unconfigured form scenarios).
- Final application CI on `main`, run [42250218500](https://github.com/Gaurav-7489/simpleyes/actions/runs/42250218500),
  also completed successfully: both `quality` and `enquiry-and-browsers` passed.
- Lighthouse **CI lab results**, five pages on mobile and desktop: performance 99–100; accessibility,
  best practices and SEO 100. These are static-export lab measurements, not production field metrics.
- `npm audit --omit=dev` reported zero known production dependency vulnerabilities.
- Vercel error/fatal log lookup found no matching entries for this deployment. This is a static site;
  the absence of function logs is not proof of customer email delivery.

The final handover commit changes documentation only; the application release above is the tested code
snapshot. Documentation-only pushes are excluded by the CI path filter. Production email delivery has
**not** been tested because no real form endpoint is configured.

## Authoritative starting state

Connected GitHub and Vercel were inspected for this pass. `main` was
`b300934887fd26e80bc3fb92f2d2280bd9c77d75`; production deployment
`dpl_7puoNA192kabbzpbEe2X2tPsYSY5` was READY on that commit. PR #4 was open at
`a2dc2f2726fb0b65b0d8de9a2aba69bc0c40dc2b`, seven commits ahead, conflict-free, with both
GitHub quality runs passing. The newer handoff commit `3667813` was not the connected production state.
No existing code or business contact changes were reverted.

| Area | State at inspection | Work in this release |
|---|---|---|
| Eight service pages, other required pages, service CTA preselection, FAQ search/filter, WhatsApp/email | Already on production | Preserve; revalidate |
| PR #4: navigation, teal, small-phone button wrap, fee table, configurable Formdall honeypot, QA docs | Tested but unmerged | Integrate reviewed changes |
| Corporate fields | Revealed from a service link, not when Corporate Services was selected directly | Reveal from either route |
| Loading on slower browsers | iPhone/WebKit traces showed the first form entry being reset before React was ready | Keep form, navigation and FAQ controls disabled until handlers attach; add a delayed-script regression check |
| Closed mobile menu | WebKit could keep the closing panel in the accessibility tree during its visibility transition | Remove the visibility transition; make closed content inert and aria-hidden immediately |
| Submission result | Any parseable or malformed 2xx could be treated as acceptance | Require positive JSON acceptance or HTTP 204; reject explicit errors and redirects |
| Network stalls, duplicate submissions | No request timeout; state-only duplicate guard | 20-second timeout, synchronous lock, abort on unmount; preserve input on failure |
| Form configuration | No checks for endpoint/CSP mismatches or a honeypot overwriting real fields | Fail prebuild on unsafe or unusable configuration; seven unit checks |
| Brand tokens / fees | Lime differed from the execution brief; fractional approved prices would round | Apply #B8E05A, add #2FA35E token, preserve cents in fee display |
| Privacy | Hosting unnamed, disabled integrations described as active, DPA asserted without evidence | Name Vercel, describe disabled form/analytics accurately, remove unverified DPA assertion |
| Browser coverage | Chromium; configured-form checks skipped by default | Add CI job with mocked provider responses on Chromium, Firefox and iPhone/WebKit |
| Real enquiry delivery | No Vercel enquiry variables; no provider account access | External setup pending; never claim inbox delivery |
| Legal/business approval | Legal identity, policies and review missing | Keep explicit pending-review status and noindex; never invent details |

## Implementation and validation

- Local dependency installation, seven unit tests, ESLint, production static build and TypeScript passed.
- Local Playwright browser installation failed because the download returned an invalid archive. The
  managed preview also rejected Next.js with injected Vite-style arguments. Browser verification is
  performed by GitHub Actions; local browser checks are not claimed.
- The CI `quality` job covers all routes, links, SEO, axe, reduced motion and responsive widths from 320
  through 2560 px, plus Lighthouse. `enquiry-and-browsers` builds with clearly labelled CI-only provider
  values and intercepts submissions; no real enquiry is sent. It covers accepted JSON, HTTP errors,
  misleading HTTP 200 bodies, network errors/retries, duplicates, timeout and honeypot rejection, plus
  navigation and FAQs on Chromium, Firefox and iPhone/WebKit.
- Consult the release commit's GitHub Actions results and Vercel deployment metadata for final remote
  results. A mocked acceptance response proves frontend behaviour, not notification delivery.
- Physical phones, assistive-technology review, Search Console, mailbox delivery and rollback are not
  claimed as verified. Analytics stays disabled until approved and configured.

## Exact external dependencies

| Item | Responsible party / action | What it blocks |
|---|---|---|
| Formdall account and form | SimplYes account owner: follow ENQUIRY-SETUP.md; provide the real endpoint and embed honeypot field, configure notification to Info@simplyes.de | Website form delivery |
| Provider contract and inbox | SimplYes owner: confirm provider terms/DPA, mailbox provider and approved retention periods; confirm a real test arrives, including spam | Verified delivery and privacy sign-off |
| Legal identity | SimplYes owner: legal name, representative, street, postal code/city, applicable registration/VAT details | Complete Impressum/public launch |
| Legal/commercial copy | Owner and qualified adviser: review Privacy, Terms, Disclaimer, Impressum, payment/cancellation/refund policies, independence statement and service copy | Public business launch approval |
| Official brand assets | SimplYes owner: approved logo/favicon/social source; current wordmark remains | Brand sign-off |
| Hosting | Team owner: confirm plan suitability and account ownership; no paid upgrade or transfer was performed | Commercial hosting confirmation |
| Optional analytics | Owner: decide whether GA4 is wanted; if so provide property ID and approve consent text | Analytics only |

Email and WhatsApp links use **Info@simplyes.de** and **+49 1521 6627596**. Their link destinations can
be tested; mailbox access and a live WhatsApp conversation are separate checks.

## Next instruction after the owner supplies the missing inputs

> Continue SimplYes from docs/LAUNCH-STATUS.md. Connect the real Formdall endpoint and honeypot field I
> provide to Vercel Production, update the supplied legal/business details and reviewed policies, run all
> checks, commit and push to main, deploy, then verify a real test enquiry reaches Info@simplyes.de.
> Keep every missing approval clearly pending; do not mark legal review complete without my confirmation.

An instruction alone cannot replace the actual endpoint, legal facts, reviewed wording or inbox access.
The site must not be described as fully ready for public business launch while those remain unresolved.

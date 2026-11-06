# SimplYes launch completion — 6 November 2026

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

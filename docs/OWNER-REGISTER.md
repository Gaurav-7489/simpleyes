# Owner Confirmation Register

Specification Appendix A, with the current build status. Nothing below may be filled with invented or
placeholder values on the live site. **●** = blocks launch.

| | Item | What is needed | Where it plugs in | Status |
|---|---|---|---|---|
| ● | Official logo asset | SVG/PNG "simplyes." wordmark with exact gradient stops; favicon and social image source | `src/components/ui/Wordmark.tsx` (stand-in drawn after the mockup: green check + "SimplYes."), `src/app/icon.svg`, `public/og-image.png` | Open |
| ● | Primary colour | Full hex and any supporting palette | `--color-accent-*`, `--color-teal` in `src/app/globals.css` | **Confirm:** the site now follows the owners' UI mockup (Nov 2026): deep green `#005C45` for actions, `#00905A` highlight. This replaces the earlier confirmed teal `#0B7F8C`, which the mockup does not use. Reverting is a token change |
| ● | Business email address | Public contact address and enquiry notification inbox | `NEXT_PUBLIC_CONTACT_EMAIL`; form service notification settings | Done — `Info@simplyes.de` |
| ● | WhatsApp number | Approved number and pre-filled message text | `NEXT_PUBLIC_WHATSAPP_NUMBER`, `src/lib/whatsapp.ts` | Done — `+49 1521 6627596` |
| ● | Pricing model | Fixed or quotation per service; amounts; family packages; payment methods; cancellation and refund terms | `pricing.serviceFees` in `src/content/home.ts` (fee table, "From €X" / "On quotation"), `/terms/`; FAQ entries for payment and cancellation are held back | Open — quotation model live, fee table built but empty |
| ● | Legal pages (**Impressum is live with placeholders**) | Privacy, Terms, Disclaimer wording reviewed by qualified German advisers; Impressum and cookie-consent requirements | `/privacy/`, `/terms/`, `/disclaimer/`, `/impressum/`; `site.legal` in `src/content/site.ts` | Open — drafts with "to be provided" markers, all noindex until `legal.reviewed = true` |
| ● | Independence statement | Final reviewed wording | `independenceStatement` in `src/content/home.ts` (footer, homepage, service pages, About, Disclaimer) | Open — spec draft in use |
| ● | Platform decision | Continue Framer or custom build | — | Built as Option B (Next.js · React · TypeScript · Tailwind, static export), live on Vercel at simplyes.de. Owners to confirm, incl. Vercel plan (Hobby is non-commercial) |
| ● | Service page content | Approval of copy for all eight pages; verification of document categories | `src/content/services.ts` | Open — written to §05/§08 scope, categories labelled "subject to verification" |
| ● | Form service | Which approved service receives enquiries (and its DPA) | `NEXT_PUBLIC_ENQUIRY_ENDPOINT`, `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD`; Privacy Policy §4 (names Formdall automatically); CSP in `vercel.json` | EU-only storage requested. Recommended: Formdall (Germany), steps in [`ENQUIRY-SETUP.md`](ENQUIRY-SETUP.md). Account to be created by SimplYes under `Info@simplyes.de`. Until then the form shows "being connected" and points to WhatsApp/email |
| | Mailbox provider | Who hosts `Info@simplyes.de` (name, address, DPA) | Privacy Policy §4 | Open — how to identify it: [`ENQUIRY-SETUP.md`](ENQUIRY-SETUP.md#identify-the-mailbox-provider-for-infosimplyesde) |
| | Hosting account | Vercel project owner and plan; SimplYes-owned account | Vercel team `gaurav-7489s-projects` (developer's personal team) | Open — plan not visible from GitHub; Hobby is non-commercial |
| | Analytics & consent (**kept disabled until decided**) | GA4 property, banner wording and cookie list reviewed | `NEXT_PUBLIC_GA_ID`; `src/components/analytics/Analytics.tsx`; Privacy Policy §5 | Open — consent-gated GA4 built; off until ID is set |
| | Process & communication | Remote assistance, update channels, response window, document-review method, retention periods | `site.contact.responseTime`/`hours`; How It Works; thank-you page; FAQs "Can I receive help remotely?" / "How will I receive updates?" are held back | Open |
| | Service coverage | Whether all cities are served; public business address (for LocalBusiness data) | `site.coverageStatement`; LocalBusiness JSON-LD not added | Open — "We assist customers across Germany" kept from the approved brief |
| | About page facts | Story details; founder bios/photos only if desired; registration details if publishable | `about` in `src/content/home.ts` | Open — no bios, photos or credentials published |
| | Corporate offering | Group arrangements and corporate enquiry fields | Corporate Services page; enquiry form corporate option (company name, team size) | Open |
| | Social links, imagery, timeline | Approved social profiles; licensed images/illustrations; milestones | Footer "Contact" column; illustrations are original SVG | Open |

## Content deliberately held back

These FAQ questions from §12 are not published because their answers are owner decisions:
"How can I pay?", "What happens if I cancel a service?", "Can I receive help remotely?",
"How will I receive updates?". Add them to `src/content/faqs.ts` once answered.

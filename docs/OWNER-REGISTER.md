# Owner Confirmation Register

Specification Appendix A, with the current build status. Nothing below may be filled with invented or
placeholder values on the live site. **●** = blocks launch.

| | Item | What is needed | Where it plugs in | Status |
|---|---|---|---|---|
| ● | Official logo asset | SVG/PNG "simplyes." wordmark with exact gradient stops; favicon and social image source | `src/components/ui/Wordmark.tsx` (currently a typographic stand-in), `src/app/icon.svg`, `public/og-image.png` | Open |
| ● | Primary teal colour | Full hex (brief gives only "#0B7F8…") and any supporting palette | `--color-accent-*`, `--color-teal` in `src/app/globals.css` (current greens follow the spec's visual reference, not brand values) | Open |
| ● | Business email address | Public contact address and enquiry notification inbox | `NEXT_PUBLIC_CONTACT_EMAIL`; form service notification settings | Open — email routes hidden until set |
| ● | WhatsApp number | Approved number and pre-filled message text | `NEXT_PUBLIC_WHATSAPP_NUMBER`, `src/lib/whatsapp.ts` | Open — `+49 176 62510556` comes from the old site |
| ● | Pricing model | Fixed or quotation per service; amounts; family packages; payment methods; cancellation and refund terms | `src/content/home.ts` (`pricing`), `/pricing/`, `/terms/`; FAQ entries for payment and cancellation are held back | Open — quotation model live, no amounts |
| ● | Legal pages | Privacy, Terms, Disclaimer wording reviewed by qualified German advisers; Impressum and cookie-consent requirements | `/privacy/`, `/terms/`, `/disclaimer/`, `/impressum/`; `site.legal` in `src/content/site.ts` | Open — drafts with "to be provided" markers, all noindex until `legal.reviewed = true` |
| ● | Independence statement | Final reviewed wording | `independenceStatement` in `src/content/home.ts` (footer, homepage, service pages, About, Disclaimer) | Open — spec draft in use |
| ● | Platform decision | Continue Framer or custom build | — | Built as Option B (Next.js · React · TypeScript · Tailwind, static export). Owners to confirm |
| ● | Service page content | Approval of copy for all eight pages; verification of document categories | `src/content/services.ts` | Open — written to §05/§08 scope, categories labelled "subject to verification" |
| | Form service | Which approved service receives enquiries (and its DPA) | `NEXT_PUBLIC_ENQUIRY_ENDPOINT`; Privacy Policy §4; CSP in `vercel.json` | Open — form built; shows "not connected yet" + WhatsApp until set |
| | Analytics & consent | GA4 property, banner wording and cookie list reviewed | `NEXT_PUBLIC_GA_ID`; `src/components/analytics/Analytics.tsx`; Privacy Policy §5 | Open — consent-gated GA4 built; off until ID is set |
| | Process & communication | Remote assistance, update channels, response window, document-review method, retention periods | `site.contact.responseTime`/`hours`; How It Works; thank-you page; FAQs "Can I receive help remotely?" / "How will I receive updates?" are held back | Open |
| | Service coverage | Whether all cities are served; public business address (for LocalBusiness data) | `site.coverageStatement`; LocalBusiness JSON-LD not added | Open — "We assist customers across Germany" kept from the approved brief |
| | About page facts | Story details; founder bios/photos only if desired; registration details if publishable | `about` in `src/content/home.ts` | Open — no bios, photos or credentials published |
| | Corporate offering | Group arrangements and corporate enquiry fields | Corporate Services page; enquiry form corporate option (company name, team size) | Open |
| | Social links, imagery, timeline | Approved social profiles; licensed images/illustrations; milestones | Footer "Contact" column; illustrations are original SVG | Open |

## Content deliberately held back

These FAQ questions from §12 are not published because their answers are owner decisions:
"How can I pay?", "What happens if I cancel a service?", "Can I receive help remotely?",
"How will I receive updates?". Add them to `src/content/faqs.ts` once answered.

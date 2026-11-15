# SimplYes — project status

**Updated 15 November 2026. Live: https://simplyes.de/ (Vercel, `main` at `e4e489c`).**

**Status: website and enquiry code complete and live. Launch is blocked only by owner actions: connecting
Formdall, a real inbox test, and the legal/business details.**

## Delivered (implemented, tested, deployed, live-verified)

| Area | What was delivered | PR |
|---|---|---|
| Specification v1.0 | 20 launch pages, 8 service pages, FAQs, pricing (quotation model), legal page structure, SEO (titles, canonicals, sitemap, robots, structured data, llms.txt), accessibility (WCAG 2.2 AA checks), no analytics without consent | #4 and earlier |
| Design | Owner-confirmed green palette, floating header, mobile tab bar, short inner pages with tap-to-open sections | #6, #7 |
| Homepage | Full-screen Berlin hero, Get Assistance first; Choose your service → Why SimplYes (chat demo) → Simple process → FAQs → Contact | #8 |
| Service pages | Name, one sentence, image, "What do you need help with?" problem picker, details on tap; passport owner photo, original illustrations for the other seven | #8 |
| Smart contact flow | Service + problem carried to Contact and validated; "Something else" note; draft kept across Back/forward; WhatsApp message with service + problem | #8 |
| Enquiry backend | Formdall integration (EU), one field contract shared with Formdall's server-side schema (`/enquiry-schema.json`), stable `service_id`/`issue_id`, success only on provider acceptance, timeouts, duplicate-click and spam protection, WhatsApp/email fallback | #8, #9 |
| Handover | ENQUIRY-SETUP, ENQUIRY-OPERATIONS, OWNER-ACTIVATION, OWNER-REGISTER, DEPLOYMENT, HANDOVER, PHASE-2-BACKEND (recommendation only) | #9 |

### Evidence (15 Nov 2026)
- CI (`quality`, `enquiry-and-browsers`) passed on every merged PR; Vercel production deployment of `e4e489c`
  succeeded.
- Local: lint, typecheck, build, unit tests 16/16, Playwright 196 passed / 0 failed (desktop + Pixel 7, axe
  included); dummy-endpoint build: all enquiry and schema-contract tests passed (requests intercepted).
- Live browser on simplyes.de: Passport → "Passport renewal" → Contact arrives prefilled; invalid email shows an
  error; sending shows "could not be sent" with details kept (form not connected) — no false thank-you;
  no console errors. `/enquiry-schema.json` is live (reject mode, 21 fields, 8 service ids).
- Formdall live API: CORS preflight allows JSON POST from simplyes.de; unknown form key returns 404 JSON.

## Not done — needs the owners (nothing here can be completed by the developers)

| # | Action | Why only the owner | Guide |
|---|---|---|---|
| 1 | Create the Formdall account under Info@simplyes.de; form, email action, origin allowlist, field schema; download the AVV | Accepting provider terms and the data processing agreement on behalf of the business; email verification at Info@simplyes.de | ENQUIRY-SETUP §1–3 |
| 2 | Set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` and `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD` in Vercel (Production), redeploy | Vercel account access | ENQUIRY-SETUP §4 |
| 3 | Send one real test enquiry; confirm it in Info@simplyes.de (and spam); record it in `owner-settings.json` | Inbox access | ENQUIRY-OPERATIONS "Test the form" |
| 4 | Impressum: legal name and form, representative, address, register/VAT if any | Business facts | OWNER-ACTIVATION §1–2 |
| 5 | Mailbox provider + DPA, enquiry retention period, mailbox access/2FA | Business decision | ENQUIRY-OPERATIONS "Privacy" |
| 6 | Terms: payment, cancellation/refunds, liability, complaints; review of all legal pages by a German adviser, then `legal.reviewed: true` | Legal decision | OWNER-ACTIVATION §2 |
| 7 | Vercel plan (Hobby is non-commercial) and ownership of the project/repository | Purchase/account decision | DEPLOYMENT |
| 8 | Official logo SVG; confirm or replace the passport photo (State Emblem) | Brand/legal decision | OWNER-REGISTER |
| 9 | Optional: answers for the four held-back FAQs, analytics yes/no, auto-reply wording | Business decision | OWNER-REGISTER |

When 1–3 are done the form delivers enquiries; when 4–6 are done the site is legally ready; `npm run check:launch`
(or the **Owner launch readiness** workflow) then reports the remaining items, if any.

## Not verified automatically
Real iOS Safari / Android devices, desktop Safari/Firefox/Edge and a screen-reader spot check (Chromium and
WebKit/Firefox engines are covered in CI where configured). Search Console verification and sitemap submission
need the owner's Google account.

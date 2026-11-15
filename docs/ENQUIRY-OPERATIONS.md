# Enquiries — how they work and how to run them

Practical guide for the SimplYes team. Setup steps are in [ENQUIRY-SETUP.md](ENQUIRY-SETUP.md).

## How it works

```
Customer (simplyes.de)  ──JSON over HTTPS──▶  Formdall (servers in Germany)  ──email──▶  Info@simplyes.de
   form checks fields                         origin allowlist, spam checks,           Reply-To = customer
   picks service + problem                    field schema (reject), rate limits
```

- The website is static (no server of our own, no database). Formdall is the backend: it validates, filters
  spam and emails each enquiry. With "Store submissions" off, Formdall keeps no copy; the inbox is the record.
- The visitor chooses a service and problem on a service page; the contact form arrives filled in. The
  browser sends the enquiry to Formdall and shows `/thank-you/` **only** when Formdall answers
  `{"success": true}`. Any error, timeout or rejection keeps the visitor on the form with their text and
  offers WhatsApp and email.
- Each email has the subject `New SimplYes Enquiry — <Service> — <Problem>` and lists: name, email, phone*,
  city*, service (+ `service_id`), problem (+ `issue_id`)*, description*, preferred contact*, corporate
  company/team size*, consent, submission time, page and campaign tags* (* only when filled in).

## Accounts and settings (owner-held)

| What | Where | Notes |
|---|---|---|
| Formdall account | app.formdall.de, login `Info@simplyes.de` | Owner = SimplYes; 2FA on; AVV (data processing agreement) downloaded |
| Form "SimplYes enquiry" | Formdall dashboard | Origin allowlist `simplyes.de`; captcha none; honeypot/disposable/deliverability on; field schema from `/enquiry-schema.json` (mode reject); store submissions off |
| Email action | Formdall → Actions | Recipient `Info@simplyes.de`; subject `{{subject}}`; no auto-reply until wording is approved |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | Vercel → simpleyes → Settings → Environment Variables (Production) | Formdall form URL; public by design (it is in the page) |
| `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD` | Same | Hidden input name from Formdall's Embed snippet; public by design |

No secret keys are involved. After changing either variable, **redeploy** (they are built into the page).

## Day to day

- **Receiving:** enquiries arrive in `Info@simplyes.de`. Press **Reply** — it goes to the customer (Formdall
  sets Reply-To). Formdall sends from its own address, so its messages pass SPF/DMARC; no DNS change is
  needed on simplyes.de.
- **Responding:** answer from the business mailbox. Do not ask customers to email passport scans or ID numbers;
  agree a secure method first if documents are really needed.
- **Missed or rejected enquiries:** Formdall → the form → **Spam statistics** (reasons such as honeypot, disposable address,
  invalid data, origin, quota). Each email action also has a delivery status (success, or failed after 3
  attempts), shown in a stored submission's detail view; with "Store submissions" off, switch storage on with
  a 1-day retention while testing or investigating. Formdall answers some spam with the same "success" as real
  enquiries, so a thank-you page alone is not proof; the inbox is.
- **Spam folder:** check it in the first weeks; mark Formdall messages "not spam" if any land there.
- **Quota:** Free plan = 100 accepted enquiries per month (spam does not count). Formdall emails the owner at
  80 % and 100 %. When full, the form shows a failure and offers WhatsApp/email; upgrade to Hobby
  (€4.99/month, 1,000) if that happens.

## Test the form (after any change)

1. On https://simplyes.de/services/passport-services/ choose "Passport renewal" → Continue to Contact.
2. Fill in your own name and an owner-controlled email, tick consent, send.
3. Expect `/thank-you/` **and** an email in `Info@simplyes.de` (check spam) with the subject
   "New SimplYes Enquiry — Passport Services — Passport renewal", Reply-To = your test address, and Formdall's
   delivery status **success**.
4. Record the date in `src/content/owner-settings.json` (`launch.enquiryDeliveryConfirmed: true`,
   `deliveryVerifiedAt`). Do not use real customer data for tests.

## Change the recipient

Formdall → the form → Actions → the Email action → change the address (up to 10 per form). No website change
or redeploy is needed. Update the Privacy Policy if the mailbox provider changes.

## If Formdall is down or must be replaced

- The website keeps working: failed sends show WhatsApp (+49 1521 6627596) and email (Info@simplyes.de).
- To switch provider: create the new form, add its host to `connect-src` and `form-action` in `vercel.json`,
  set the two variables, update the Privacy Policy processor entry (`knownFormServices` in
  `src/content/site.ts`), redeploy and repeat the test above. The payload contract is
  `src/lib/enquiry-schema.ts`.
- To pause the form: remove `NEXT_PUBLIC_ENQUIRY_ENDPOINT` and redeploy; the form shows "being connected" with
  WhatsApp/email.

## Privacy — still for the owner and a qualified German adviser

- Name the mailbox provider and its address, and confirm a data processing agreement with it.
- Decide how long enquiry emails are kept, and delete them after that (Formdall stores nothing when
  "Store submissions" is off).
- Restrict access to `Info@simplyes.de` to the people who handle enquiries; enable 2FA on the mailbox.
- Handle access and deletion requests (Art. 15/17 GDPR) by searching the mailbox for the requester's address.
- Legal basis, Privacy Policy wording and Impressum must be reviewed; technical tests do not establish compliance.

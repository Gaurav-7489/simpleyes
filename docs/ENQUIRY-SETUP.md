# Enquiry delivery setup (Formdall)

How to connect the enquiry form to `Info@simplyes.de` through **Formdall**, an EU form service with servers in
Germany. Facts below are from Formdall's own pricing page, documentation, Impressum and privacy policy,
checked 6 Nov 2026. Re-check prices before buying anything.

Nothing in this document has been set up yet. The code is ready: the form stays in its "being connected"
state (pointing visitors to WhatsApp and email) until the two environment variables in step 4 are set.

## Why Formdall

| | |
|---|---|
| Data location | Submission API on Hetzner, mail server on Contabo, website on netcup: all in Germany. Billing via Creem (Estonia, EU) |
| Contract | Data processing agreement (AVV, Art. 28 GDPR) included on every plan; it becomes part of the contract when you accept the terms at sign-up and can be downloaded as a PDF |
| Data kept | By default Formdall **does not store** enquiry contents; it checks them for spam and emails them on. IP addresses are only stored as a daily-rotating hash; no cookies |
| Spam | Hidden honeypot field, disposable-address and undeliverable-address checks, IP reputation, rate limits (10/min per IP), 5-second duplicate suppression |
| Fit with this site | Accepts the form's JSON request and answers with JSON, so the site can show `/thank-you/` only when the enquiry is accepted |
| Operator | Daniel Proschko (sole trader), Bahnhofstr. 8, 82216 Maisach, Germany |

**Supplier risk:** Formdall is run by one person. Mitigation: enquiries land in your own
inbox (nothing important lives only at Formdall), and switching to another service means changing two
environment variables plus the Privacy Policy entry.

## Cost

| Plan | Price (incl. VAT) | Submissions / month | Max. storage, if storage is switched on |
|---|---|---|---|
| **Free** (recommended start) | €0 | 100 | 14 days |
| Hobby | €4.99 / month or €49.90 / year | 1,000 | 90 days |
| Business | €19.99 / month or €199.90 / year | 10,000 (5 team seats) | 365 days |

All features are in every plan; plans differ only in quantities. Spam that is rejected does not count against
the quota, and Formdall emails the owner at 80 % and 100 % of the monthly allowance. Upgrade to Hobby only if
you regularly expect more than 100 real enquiries a month. Auto-replies to customers on Free and Hobby carry
Formdall branding.

Alternative if you prefer a different EU provider: **Formward** (Stockholm; data in Sweden; DPA on every plan;
Free 50 submissions/month, Personal €15/month for 200). Using it needs a small code change (its host in the
Content-Security-Policy and the Privacy Policy entry).

## Setup steps (owner: SimplYes, login `Info@simplyes.de`)

### 1. Create the account
1. Go to `https://app.formdall.de/register`.
2. Enter a name for the account holder, **`Info@simplyes.de`** as the email, and a strong password (Formdall
   requires 12+ characters with upper and lower case, a digit and a symbol). Store it in the business's password
   manager.
3. Tick the box accepting the terms (AGB) and confirming you have read the privacy policy. This also concludes
   the data processing agreement (AVV).
   Use email and password, **not** "Sign in with Google/GitHub", so the account belongs to the business address.
4. Open the confirmation link sent to `Info@simplyes.de` within 60 minutes.

### 2. Secure the account and file the AVV
1. Settings → **Security** (*Sicherheit*) → enable **two-factor authentication**; store the recovery codes safely.
2. Settings → **Data processing** (*Auftragsverarbeitung*, visible to the workspace owner): once the legal details are confirmed, enter the
   company name, address and representative, then **download the AVV PDF** and keep it with your records.

### 3. Create the form
1. Create a form named **`SimplYes enquiry`**.
2. **Settings** tab (*Einstellungen*):
   - **Origin allowlist** (*Herkunfts-Allowlist*): `simplyes.de` (this also covers `www.simplyes.de`). Submissions from anywhere else
     are refused.
   - **Redirect URL** (*Weiterleitungs-URL*): leave empty. The website handles the thank-you page itself.
   - **Store submissions** (*Einsendungen speichern*): leave **off** (recommended). Enquiries then exist only in your inbox, which keeps
     data at Formdall to a minimum.
   - **Spam:** keep **Honeypot**, **Block disposable addresses** (*Wegwerf-Adressen blockieren*) and
     **Check deliverability** (*Zustellbarkeit prüfen*) switched on.
     Set **Captcha** to **none**. The website does not include Formdall's captcha widget, so turning it on
     would reject every enquiry.
3. **Field schema / server-side validation:** confirm the provider's current required-field and format
   rules for name, email, service, message and consent before enabling the form. The development team has
   not verified these settings in an owner-controlled Formdall account. Do not treat browser validation as
   proof of backend validation, and do not mark activation complete until rejected/invalid submissions and
   real inbox delivery have been tested. If the provider cannot enforce the required checks, keep backend
   activation pending rather than bypassing them.
4. **Actions** tab (*Aktionen*) → add an **Email** action:
   - Recipient: `Info@simplyes.de`
   - Subject: `{{subject}}` (the website sends a ready-made subject such as
     "New enquiry — OCI Services — Frankfurt")
   - Formdall sets Reply-To to the customer's email, so "Reply" in your mail program answers them directly.
5. Do **not** add an **Auto-reply** until its wording, including any promised response time, has been
   approved.
6. **Embed** tab (*Einbetten*): note two values:
   - the **form URL** `https://api.formdall.de/api/v1/f/<FORM_KEY>`;
   - the **name of the hidden input** in the snippet (the honeypot). Formdall does not publish this name; it
     is only shown in the snippet.

### 4. Connect the website (Vercel)
1. Vercel → project **simpleyes** → Settings → **Environment Variables** → add for **Production** (and
   Preview, if you want to test there):
   - `NEXT_PUBLIC_ENQUIRY_ENDPOINT` = the form URL from step 3.6
   - `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD` = the hidden input's name from step 3.6

   Both values are public (they appear in the page anyway); they are not secrets.
2. **Redeploy** production (Deployments → latest → ⋯ → Redeploy). `NEXT_PUBLIC_*` values only take effect on a
   new build.
3. The Privacy Policy then names Formdall automatically. The mailbox provider and retention period stay marked
   "to be provided" until supplied.

### 5. Test on production
1. On `https://simplyes.de/contact/`, send a real test enquiry with your own email address and a city.
2. Expect: the page moves to `/thank-you/`; an email arrives at `Info@simplyes.de` with the subject
   "New enquiry — <service> — <city>", all fields listed, and Reply-To set to the test address. Check the spam
   folder too.
3. In Formdall, the email action's delivery status should be **success**.
4. Important: Formdall answers *silently rejected* spam with the same "success" response, so the
   **email arriving is the only real proof**. If the page shows thank-you but no email arrives, check Formdall's
   spam statistics (e.g. honeypot name wrong, origin not allowed).

Preview deployments (`*.vercel.app`) are not on the origin allowlist, so test enquiries from previews are
refused (`origin_forbidden`) unless you add that preview's hostname temporarily.

## Identify the mailbox provider for `Info@simplyes.de`

The Privacy Policy must name the provider that hosts the business inbox, and you need a data processing
agreement with it. To find it:

1. **Ask or check where you log in** to read `Info@simplyes.de` (webmail address, or the account in the mail
   app's settings: incoming server name).
2. **Look up the domain's MX record**, which names the mail provider:
   - macOS/Linux terminal: `dig MX simplyes.de +short`
   - Windows: `nslookup -type=mx simplyes.de`
   - or any online "MX lookup" tool, entering `simplyes.de`
3. Read the result:

| MX record contains | Provider |
|---|---|
| `google.com` / `googlemail.com` | Google Workspace |
| `mail.protection.outlook.com` | Microsoft 365 |
| `ionos` / `kundenserver.de` | IONOS |
| `strato` | Strato |
| `zoho` | Zoho Mail (check whether the account is in the EU data centre, `zoho.eu`) |
| `protonmail.ch` | Proton Mail |
| `hostinger`, `one.com`, `netcup`, `hetzner`, `all-inkl`, … | that hosting company |

4. Then provide the provider's **name and address**, and confirm a **data processing agreement** is in place
   (most providers offer one in the account's admin or legal settings).

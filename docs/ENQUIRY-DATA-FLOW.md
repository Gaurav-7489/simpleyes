# Customer enquiry data flow

Checked 15 Nov 2026 against the code on `main` and the live site https://simplyes.de. No customer data,
passport scans or test enquiries were sent to any real service during this audit.

**Labels used below**
- **Verified**: observed on production or proven by the code and automated tests.
- **Documented**: what the setup guide says will happen once Formdall is connected. Not yet true.
- **Unverified**: depends on accounts this session cannot see (Formdall, mailbox, Vercel dashboard).

## Short answer

Today an enquiry form submission **goes nowhere**. The live form says it is "being connected" and points
visitors to WhatsApp and email. No form key is present in the live HTML or JavaScript, so no enquiry endpoint is
configured (**verified**). The only copy of what a visitor types is in their own browser tab, which deletes
it after 30 minutes or when the tab is closed. SimplYes has **no database** (**verified**).

## Architecture

```
TODAY (verified)
┌────────────────────────── Visitor's browser ───────────────────────────┐
│ Service page: picks a problem ──URL: ?service=<id>&issue=<id> (ids only)│
│ Contact form ── draft in sessionStorage (this tab only, 30-min expiry) │
│ "Send" ──▶ blocked: form says "being connected", offers ↓              │
└───────────────┬───────────────────────────────────────┬─────────────────┘
                │ visitor chooses                        │ visitor chooses
                ▼                                        ▼
      WhatsApp (wa.me link: only                Visitor's own email app
      "Hello SimplYes, I need assistance        → Info@simplyes.de
      with <Service> — <Problem>.")             (mailbox provider unknown)

AFTER FORMDALL IS CONNECTED (documented, not active)
Browser ──HTTPS JSON──▶ Formdall API (Hetzner, Germany)
                          origin allowlist · spam checks · field schema (reject)
                          "Store submissions" OFF → no copy kept at Formdall
                          └──email (Contabo mail server, Germany)──▶ Info@simplyes.de mailbox
                                                                      = the only lasting record

Static website hosting (Vercel): serves pages only, never receives form contents.
Vercel request logs hold IP address, URL (ids only), user agent: retention per Vercel plan (unverified).
```

## The 10 questions

**1. Where does a customer's enquiry first go?**
Today: nowhere. The Send button cannot deliver while no endpoint is configured; visitors are directed to
WhatsApp or email instead (**verified** live). Once connected, the browser sends the enquiry over HTTPS
directly to Formdall's API `api.formdall.de` (Germany). Vercel and the website never receive it
(**documented**; the code path is tested with an intercepted mock).

**2. Where is the data temporarily stored?**
Only in the visitor's own browser tab (`sessionStorage`) (**verified**, code + tests):

| Key | Contents | Cleared |
|---|---|---|
| `simplyes-enquiry-draft` | Name, email, phone, city, company, service, problem, description. **Never** the consent tick | 30 min after the last edit, when the tab closes, or once an enquiry is accepted |
| `simplyes-selection-<service>` | Chosen problem id + optional "Something else" note | Same |
| `simplyes-other-note` | "Something else" note, handed to the form, then deleted on arrival | On reading, 30 min, tab close |
| `simplyes-lead` | Service name + preferred contact method only (no personal details) | Read once by the thank-you page |
| `simplyes-analytics-consent` (localStorage) | "granted"/"denied" — only if analytics is ever configured; it is not | Never written today |

No cookies are set (no `Set-Cookie` header; test checks the browser jar is empty). No analytics runs
(no measurement ID configured, verified live). URLs carry only service/problem **ids**, never typed text
(test B/F). WhatsApp messages contain only the service and problem names.

In transit (once connected): HTTPS (TLS) from the browser to Formdall, then email from Formdall to the mailbox.
Encryption of that email hop depends on both mail servers (**unverified**).

**3. Where is the data permanently stored, if anywhere?**
Today: nowhere, because no form enquiry is delivered. Once connected (**documented**): in the
`Info@simplyes.de` mailbox, kept until someone deletes it. If "Store submissions" is switched on in Formdall,
a copy is also kept there for up to 14 days on the Free plan. The setup guide says to keep it off. Formdall keeps
only a daily-rotating hash of the IP address. WhatsApp and email conversations are stored by WhatsApp/Meta and the
mailbox provider respectively, outside the website.

**4. Does SimplYes currently have a database?** No (**verified**): static site, no server code, no database
connection or credentials in the repository or the build.

**5. Is Formdall active?** No (**verified** on production: the form shows "being connected"; no form key in the
page or scripts). Whether a Formdall account already exists is **unverified**. If one does, it isn't connected.

**6. Does the business receive an email?** Not from the form, because nothing is sent (**verified**). Emails a
customer writes themselves to Info@simplyes.de arrive as normal. Form-to-inbox delivery has **never been
tested** and must not be assumed until the owner test in `ENQUIRY-OPERATIONS.md` passes (an email actually
arrives). A thank-you page alone proves nothing, because Formdall also answers silently-rejected spam with "success".

**7. Can the business see old enquiries?** Only what is in the mailbox (and WhatsApp). There are no form
enquiries yet. Once connected, the mailbox is the archive; mailbox search is the lookup tool. Formdall keeps none
when storage is off.

**8. Can the business delete customer information?** Yes: delete the emails (including from Trash/archives
and any forwarded copies) and the WhatsApp chat. The website holds nothing to delete. The visitor's browser
copy expires by itself. If Formdall storage is ever switched on, delete the submission there too.

**9. What security and privacy risks remain?**
- The enquiry route is not connected. Visitors who don't use WhatsApp or email cannot reach SimplYes through the form.
- The mailbox becomes the only store of customer data. Its provider, location, data processing agreement, 2FA and who can access it are **unknown**.
- There is no retention period yet; emails would be kept indefinitely.
- Customers may type sensitive details (passport numbers, immigration status) into the free-text field. The form
  asks for a description only, and the team must not request scans by email.
- Formdall is run by a single operator (supplier risk). The mitigation is that the inbox holds everything.
- Vercel request logs (IP addresses) and the Vercel plan (Hobby is non-commercial) are **unverified**.
- The Privacy Policy and Impressum are drafts awaiting the owner's details and a legal review. Processing data in
  Germany/the EU does **not** by itself make this GDPR-compliant.
- On a shared computer, a draft stays in an open tab for up to 30 minutes (previously until the tab was closed).

**10. Do we need a database now, or can we wait?** Wait. See the recommendation below.

## Database: Option A vs Option B

| | **A. Email-first (current design)** | B. Private database (e.g. Supabase EU / Postgres + admin) |
|---|---|---|
| Cost | €0 (Formdall Free, 100/month) – €4.99/month | About €25–100/month plus hosting for server code and maintenance |
| Build effort | Done; owner setup about 30 minutes | Server endpoint, auth, admin UI, backups, access control: weeks |
| Where data lives | Mailbox only | Database + mailbox notifications (two stores to secure, export and delete) |
| GDPR work | Mailbox data processing agreement, retention, access | Same, plus database data processing agreement, access logging, deletion tooling, security patching |
| Fits when | Up to a few hundred enquiries a month, handled by one small team | Several staff need case status, assignment, reporting, or document uploads |

**Recommendation: Option A.** Activate Formdall, keep "Store submissions" off, and treat the mailbox as the
record. Revisit Option B only for a concrete need: case tracking across staff, volume beyond what an inbox handles,
or secure document upload. Document upload needs its own separately approved secure document-management design,
not this form. See `PHASE-2-BACKEND.md`.

## Change in this release

Drafts and the problem choice used to stay in `sessionStorage` until the tab closed, and only the main draft was
removed after sending. Now every entry carries a timestamp and is discarded after **30 minutes without an edit**,
and **all** enquiry entries are removed once an enquiry is accepted (`src/lib/enquiry-keys.ts`). Back/forward
still restores what was typed (test E). New tests check the expiry, that consent is never stored, that nothing goes
to localStorage or cookies, and that nothing typed remains after a successful send.

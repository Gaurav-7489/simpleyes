# Phase 2 backend — recommendation only (not built)

Out of the current production scope. Build only after the website is live, enquiries are flowing and the owners
have approved scope, budget and a privacy review (document uploads need a DPIA-style assessment).

## What it would add
Staff enquiry inbox with lead status, assignments and follow-ups; customer records and case progress; secure
document upload; customer login; appointment scheduling; email notifications and reminders; staff roles and an
audit trail.

## Recommended architecture (EU-hosted, small team)
- **App:** Next.js (App Router) on Vercel **Pro** in server mode for the private staff/customer area, kept as a
  separate project (e.g. `app.simplyes.de`) so the public static site stays simple and fast.
- **Data, auth, files:** Supabase (EU region, Frankfurt): Postgres with row-level security, email/passkey auth
  with 2FA for staff, private storage buckets for documents (signed, short-lived URLs; malware scan on upload).
- **Email:** a transactional provider with EU processing and a DPA (e.g. Brevo or Postmark), with SPF/DKIM/DMARC
  set up on `simplyes.de`.
- **Intake:** Formdall webhook (HMAC-signed) → app endpoint, so website enquiries create leads automatically.
- **Scheduling:** Cal.com (EU cloud or self-hosted) embedded, synced to the staff calendar.
- **Audit/security:** append-only audit table, least-privilege roles, backups with point-in-time recovery,
  retention jobs that delete closed cases on schedule.

## Indicative recurring costs (check current prices before deciding)
| Item | Approx. per month |
|---|---|
| Vercel Pro (1–2 seats) | €20–40 |
| Supabase Pro (EU) | ~€25 + usage |
| Transactional email | €0–15 |
| Scheduling (Cal.com) | €0–15 per user |
| Formdall (if kept for intake) | €0–5 |
| **Total** | **≈ €50–100**, plus one-off build, security review and legal review |

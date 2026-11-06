# SimplYes owner activation

The frontend and enquiry integration are implemented. The enquiry backend is the managed Formdall
service; a custom API, database, customer portal and document uploads are outside the approved website
scope. Real email delivery remains unverified until the owner creates/configures the service and tests it.

This guide lets the business owner complete activation through GitHub and Vercel without changing page
components. The owner needs access to both accounts and the business inbox.

## 1. Collect the business inputs

| Input | What to supply |
|---|---|
| Identity | Legal business name/type, responsible person, street, postal code/city and country |
| Registration | Registration and VAT details if applicable; optional values can remain null |
| Legal text | Owner/adviser-reviewed Privacy, Terms, Disclaimer and Impressum; approved independence wording |
| Commercial terms | Payment methods/timing, cancellation/refund terms, liability text and complaints procedure |
| Privacy | Mailbox provider name/address and approved enquiry/conversation retention wording |
| Branding/hosting | Official logo or approval of the current wordmark; confirmation of hosting plan/ownership suitability |
| Service copy | Approval of the eight service pages and quotation-based pricing |
| Enquiry service | Actual Formdall submission URL and embed honeypot field name |

Public contact details are already Info@simplyes.de and +49 1521 6627596. Do not replace them with old values.
All information entered in the public repository must be suitable for publication. Passwords, private API
keys and customer documents do not belong in this file.

## 2. Enter approved text in one file

Open [owner-settings.json](../src/content/owner-settings.json) on GitHub, choose **Edit**, and work on `main`
(or use the repository's required pull request process). Keep the JSON structure and field names intact.

| Group | Effect on the website |
|---|---|
| `legal` | Populates Impressum; `lastUpdated` is the date of the approved legal text |
| `privacy` | Populates mailbox provider and retention entries in the Privacy Policy |
| `terms` | Populates the payment, cancellation/refund, liability and complaints entries |
| `launch` | Records owner approvals for the readiness check; does not invent or publish new policy wording |

Replace an unknown `null` only with approved plain text, enclosed in double quotes. The renderer escapes
it safely. Use `\n` inside a text value for line breaks; do not insert HTML. Leave optional `vatId` or
`register` values null if they do not apply. Unknown required details remain null and keep activation pending.

Set `legal.reviewed` to true only after the owner/adviser has reviewed the actual wording displayed on all
four legal pages. The build rejects this flag if required business/policy inputs are still missing.
Final reviewed wording in other sections of those pages must also be checked; the flag cannot certify
legal compliance. Commit the file, wait for CI and Vercel to pass, and inspect the published pages.

## 3. Activate Formdall and connect Vercel

Follow [ENQUIRY-SETUP.md](ENQUIRY-SETUP.md) for the existing integration. The owner creates the account
under Info@simplyes.de, confirms access and provider agreements, creates the enquiry form, and sets its
notification recipient to Info@simplyes.de. Provider features, availability and plan limits must be checked
in the current account; no subscription has been purchased or account created by the development team.

Copy the real submission URL and hidden honeypot field name from the provider's embed code. In Vercel,
select the `simpleyes` project, open Environment Variables, and set these for **Production**:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | The actual Formdall form submission URL |
| `NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD` | The hidden spam-prevention field name from that form's embed code |

These two values are public form configuration. The build checks HTTPS, the approved CSP origin and
field-name collisions. Redeploy after changing either value; existing deployments retain their old values.
Keep analytics off unless it is separately approved and configured.

Formdall must perform the server-side spam/validation and email processing for this architecture. Confirm
its field-validation settings against the provider's current documentation. The website's browser checks
alone do not establish backend validation. Do not mark backend operation complete until its real behaviour
and email delivery have been checked in the owner-controlled account.

## 4. Run a real enquiry test

1. Open https://simplyes.de/services/oci-services/ and select **Get Assistance With This Service**.
2. Confirm OCI is selected. Submit a short test using your own valid contact details and no identity documents.
3. Confirm the website reaches Thank You, then confirm the actual notification arrives at Info@simplyes.de.
   Check spam and the provider's delivery result; verify the service, message and Reply-To information.
4. Confirm required/invalid fields and a rejected provider submission do not produce a false confirmation.
   Verify provider-side required-field/spam rules, not only browser validation.
5. Only after receipt, set `launch.enquiryDeliveryConfirmed` to true and record `deliveryVerifiedAt` as the
   actual YYYY-MM-DD test date. Set the other `launch` flags only for decisions the owner has approved.

No real test enquiry has yet been sent or received by the development team. Mocked CI responses prove
frontend handling; they cannot prove delivery or a provider's production validation rules.

## 5. Run the owner readiness check

On GitHub open **Actions → Owner launch readiness → Run workflow**, selecting `main`. It checks owner
inputs/approval flags and the public Contact page. No private Vercel token or email password is needed.
It intentionally fails while information is missing, approvals are pending or the form is disconnected.

Alternatively, from an existing checkout run `npm run check:launch`. The output lists remaining items by
field name. The test date and delivery approval are owner attestations; the check does not read the inbox
or approve legal text. A green result is configuration evidence, alongside the owner's real delivery test
and business sign-off.

## 6. Operate and maintain

- Keep account recovery and billing with the business owner. Give team members only the access they need.
- Monitor delivery, spam, submission allowance and the inbox; renew the domain and review content/policies.
- For ordinary service/FAQ content edits use `src/content/services.ts` and `src/content/faqs.ts`. Preserve
  the eight service slugs. Keep quotation pricing until approved amounts are supplied.
- Use Vercel's deployment history for rollback if a later release fails. A rollback exercise has not been
  claimed as completed. Re-check the active deployment after any recovery.
- Technical release evidence is in [LAUNCH-STATUS.md](LAUNCH-STATUS.md); general handover is in
  [HANDOVER.md](HANDOVER.md).

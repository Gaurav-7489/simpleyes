import type { Metadata } from "next";
import Link from "next/link";
import { enquiryService, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Missing, OwnerCopy, OwnerPolicy, PendingReview } from "@/components/LegalNotice";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How SimplYes handles personal data: the enquiry form, WhatsApp and email contact, optional analytics with consent, hosting, retention and your rights.",
  path: "/privacy/",
  noindex: !site.legal.reviewed,
});

/**
 * Describes the data processing this codebase actually performs: static pages,
 * self-hosted fonts, hosting access logs, the enquiry form (via the approved
 * form service), user-initiated WhatsApp/email contact, and Google Analytics
 * only after consent and only when a measurement ID is configured.
 * Must be reviewed by the business owner / a legal professional before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero narrow badge="Legal" title="Datenschutz / Privacy Policy" crumbs={[{ name: "Datenschutz / Privacy", path: "/privacy/" }]} />
      <section className="pb-[var(--section-y)] pt-10">
        <div className="container-site"><div className="max-w-[760px]">
          {!site.legal.reviewed && (
            <PendingReview>
              This privacy notice describes how this website is built and operated. It has not yet been reviewed by
              the business owners or a qualified German adviser; processor agreements, controller details
              and retention periods must be confirmed before launch.
            </PendingReview>
          )}
          <OwnerPolicy value={site.policies.privacyPolicy} lastUpdated={site.legal.lastUpdated}>
          <div className="prose-simple mt-8">
            <p className="text-sm">Last updated: {site.legal.lastUpdated}</p>

            <h2>1. Controller</h2>
            <p>
              The controller responsible for data processing on this website is the provider named in our{" "}
              <Link href="/impressum/">Impressum</Link>.
            </p>

            <h2>2. Summary</h2>
            <ul>
              <li>
                {site.enquiryEndpoint
                  ? "If you send an enquiry, we process the details you enter to respond to you."
                  : "The online enquiry form is not connected. Details entered in it are not transmitted to us."}{" "}
                The form never asks for or accepts identity documents or uploads.
              </li>
              <li>
                {site.gaMeasurementId
                  ? "Analytics cookies are used only if you accept them in the cookie banner."
                  : "Analytics is not enabled and no analytics cookies are set."}{" "}
                We do not use advertising cookies.
              </li>
              <li>Fonts are hosted on our own server — no connection to third-party font services is made.</li>
              <li>If you contact us via WhatsApp or email, those providers process data as described below.</li>
            </ul>

            <h2>3. Hosting and server log files</h2>
            <p>
              This website is hosted by Vercel Inc. (<a href="https://vercel.com/legal/privacy-notice">provider privacy notice</a>). When you visit the
              website, the hosting provider automatically processes technical data that your browser transmits (IP
              address, date and time of the request, requested page, referrer URL, browser and operating system). This
              is necessary to deliver the website securely and to detect misuse. Legal basis: Art. 6(1)(f) GDPR
              (legitimate interest in secure and reliable operation).
            </p>

            <h2>4. Enquiry form</h2>
            {!site.enquiryEndpoint ? (
              <p>
                The online enquiry form is not connected. Information entered in the form stays in your browser and
                is not submitted to a form provider or our inbox. Please use our email or WhatsApp contact routes;
                their data handling is described below.
              </p>
            ) : (
              <>
            <p>
              When you submit the enquiry form we process: your name, email address, and — if you provide them — phone
              number, city, preferred contact method, company name and approximate team size; the service you select;
              your message; your privacy confirmation; and technical metadata (submission time, the page you came from
              and campaign parameters such as utm_source, where present). We use this only to respond to your enquiry
              and, if you decide to proceed, to prepare our assistance. Legal basis: Art. 6(1)(b) GDPR (pre-contractual
              measures at your request) and Art. 6(1)(f) GDPR (responding to enquiries).
            </p>
            {enquiryService ? (
              <p>
                Form submissions are transmitted to {enquiryService.name} ({enquiryService.provider}), which checks them
                for spam on {enquiryService.location} and forwards them by email to our business inbox. {enquiryService.name}{" "}
                describes its processing and sub-processors in <a href={enquiryService.url}>its privacy policy</a>.
                Our business inbox is provided by{" "}
                <OwnerCopy value={site.privacy.mailboxProvider} label="Email (mailbox) provider name and address" />. Only the authorised SimplYes team can
                access enquiries. Retention period for enquiry data: <OwnerCopy value={site.privacy.enquiryRetention} label="Retention period" />.
              </p>
            ) : (
              <p>
                Form submissions are transmitted to <Missing label="Form service provider name and address" />, which
                forwards them to our business inbox, provided by <OwnerCopy value={site.privacy.mailboxProvider} label="Email (mailbox) provider name and address" />.
                Only the authorised SimplYes team can access enquiries. Retention period for enquiry data:{" "}
                <OwnerCopy value={site.privacy.enquiryRetention} label="Retention period" />.
              </p>
            )}
              </>
            )}
            <p>Please do not include passport numbers, identity numbers or other sensitive information in your message.</p>

            <h2>5. Analytics (only with your consent)</h2>
            {!site.gaMeasurementId ? (
              <p>Analytics is not enabled on this website. No Google Analytics scripts are loaded or analytics cookies set.</p>
            ) : (
            <p>
              If you accept analytics in the cookie banner, we use Google Analytics 4, provided by Google Ireland
              Limited, Gordon House, Barrow Street, Dublin 4, Ireland, to understand how the website is used (for example
              which pages are visited and which buttons are clicked). Advertising features are disabled. We never send
              names, email addresses, phone numbers or message content to analytics. Data may be processed by Google in
              the USA. Legal basis: Art. 6(1)(a) GDPR and § 25(1) TDDDG (consent). You can change your choice at any time
              via “Cookie settings” in the footer. If you decline, no analytics code is loaded.
            </p>
            )}

            <h2>6. Contact via WhatsApp or email</h2>
            <p>
              Our website contains links that open WhatsApp, a service provided in the EU by WhatsApp Ireland Limited
              (part of Meta). No data is transmitted to WhatsApp unless you click such a link. Some links pre-fill a
              short, general message; you can edit it before sending, and it does not contain personal data.
            </p>
            <p>
              If you message us, we process the information you send (for example your phone number, name and the
              content of your messages) to answer your enquiry and provide the assistance you request. Legal basis:
              Art. 6(1)(b) GDPR (pre-contractual and contractual measures) and Art. 6(1)(f) GDPR (responding to
              enquiries). WhatsApp may process data outside the EU; please refer to WhatsApp&apos;s own privacy
              policy.
            </p>
            <p>
              Please do not send copies of identity documents or other sensitive information until we have agreed what
              is actually needed for your request. Retention period for conversation data:{" "}
              <OwnerCopy value={site.privacy.conversationRetention} label="Retention period" />.
            </p>
            <p>
              Email enquiries are received at {site.contact.email}. Mailbox provider:{" "}
              <OwnerCopy value={site.privacy.mailboxProvider} label="Email (mailbox) provider name and address" />.
            </p>

            <h2>7. External links</h2>
            <p>
              We link to official websites such as the {site.official.embassy.label}. When you follow those links, the
              respective operator is responsible for processing your data.
            </p>

            <h2>8. Your rights</h2>
            <p>
              Under the GDPR you have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17),
              restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on
              legitimate interests (Art. 21). You also have the right to lodge a complaint with a data protection
              supervisory authority, in particular in the EU member state of your residence.
            </p>
            <p>
              To request access to or deletion of your information, contact us at{" "}
              {site.contact.email ? <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : <Missing label="Privacy contact email" />}.
            </p>

            <h2>9. Changes</h2>
            <p>
              We will update this notice if the website or our data processing changes, for example if we introduce
              new services or tools.
            </p>
          </div>
          </OwnerPolicy>
        </div></div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Missing, PendingReview } from "@/components/LegalNotice";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How the SimplYes website handles personal data: no cookies, no analytics, self-hosted fonts, hosting logs and WhatsApp contact.",
  path: "/privacy/",
  noindex: !site.legal.reviewed,
});

/**
 * Describes the data processing this codebase actually performs:
 * static pages, no cookies, no analytics/trackers, self-hosted fonts,
 * hosting access logs, and optional user-initiated WhatsApp contact.
 * Must be reviewed by the business owner / a legal professional before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero badge="Legal" title="Datenschutz / Privacy Policy" crumbs={[{ name: "Datenschutz / Privacy", path: "/privacy/" }]} />
      <section className="pb-[var(--section-y)]">
        <div className="container-site max-w-[760px]">
          {!site.legal.reviewed && (
            <PendingReview>
              This privacy notice describes how this website is built and operated. It has not yet been reviewed by
              the business owner or a legal professional; hosting provider, controller details and retention periods
              must be confirmed before launch.
            </PendingReview>
          )}
          <div className="prose-simple mt-8">
            <p className="text-sm">Last updated: {site.legal.lastUpdated}</p>

            <h2>1. Controller</h2>
            <p>
              The controller responsible for data processing on this website is the provider named in our{" "}
              <Link href="/impressum/">Impressum</Link>.
            </p>

            <h2>2. Summary</h2>
            <ul>
              <li>This website does not use cookies.</li>
              <li>We do not use analytics, advertising or tracking tools.</li>
              <li>There are no contact forms; we do not collect data through this website itself.</li>
              <li>Fonts are hosted on our own server — no connection to third-party font services is made.</li>
              <li>If you choose to contact us via WhatsApp, WhatsApp processes data as described below.</li>
            </ul>

            <h2>3. Hosting and server log files</h2>
            <p>
              This website is hosted by <Missing label="Hosting provider name and address" />. When you visit the
              website, the hosting provider automatically processes technical data that your browser transmits (IP
              address, date and time of the request, requested page, referrer URL, browser and operating system). This
              is necessary to deliver the website securely and to detect misuse. Legal basis: Art. 6(1)(f) GDPR
              (legitimate interest in secure and reliable operation).
            </p>

            <h2>4. Contact via WhatsApp</h2>
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
              <Missing label="Retention period" />.
            </p>

            <h2>5. External links</h2>
            <p>
              We link to official websites such as the {site.official.embassy.label}. When you follow those links, the
              respective operator is responsible for processing your data.
            </p>

            <h2>6. Your rights</h2>
            <p>
              Under the GDPR you have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17),
              restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on
              legitimate interests (Art. 21). You also have the right to lodge a complaint with a data protection
              supervisory authority, in particular in the EU member state of your residence.
            </p>

            <h2>7. Changes</h2>
            <p>
              We will update this notice if the website or our data processing changes, for example if we introduce
              new services or tools.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

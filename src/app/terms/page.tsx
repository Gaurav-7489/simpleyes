import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Missing, PendingReview } from "@/components/LegalNotice";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The nature and scope of SimplYes documentation assistance, responsibilities, fees, cancellations, limitations and complaints.",
  path: "/terms/",
  noindex: !site.legal.reviewed,
});

/**
 * §20 structure. Business terms (payments, cancellation, refunds, complaints)
 * are owner decisions and must be supplied/reviewed by qualified German
 * advisers — they are shown as "to be provided", never guessed.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero badge="Legal" title="Terms & Conditions" crumbs={[{ name: "Terms & Conditions", path: "/terms/" }]} />
      <section className="pb-[var(--section-y)]">
        <div className="container-site max-w-[760px]">
          {!site.legal.reviewed && (
            <PendingReview>
              Draft structure. The final terms must be supplied or reviewed by the business owners and a qualified German
              adviser before launch. Sections marked “to be provided” are owner decisions.
            </PendingReview>
          )}
          <div className="prose-simple mt-8">
            <p className="text-sm">Last updated: {site.legal.lastUpdated}</p>

            <h2>1. Nature and scope of services</h2>
            <p>
              {site.name} provides documentation assistance: explaining processes in plain language, identifying the
              relevant service and next steps, guiding document preparation and, where agreed, reviewing and organising
              documentation. The services offered are the eight categories described on our{" "}
              <Link href="/services/">Services</Link> pages.
            </p>
            <p>{independenceStatement}</p>

            <h2>2. Customer responsibilities</h2>
            <p>
              You remain responsible for your application: for the accuracy and completeness of the information and
              documents you provide, for submitting applications through the official channels, and for meeting official
              requirements and deadlines.
            </p>

            <h2>3. Fees and payments</h2>
            <p>
              Service fees are explained before any paid assistance begins (see <Link href="/pricing/">Pricing</Link>).
              Payment methods and timing: <Missing label="Payment methods and timing" />.
            </p>

            <h2>4. Cancellations and refunds</h2>
            <p>
              <Missing label="Cancellation and refund terms" />
            </p>

            <h2>5. Third-party charges</h2>
            <p>
              Government or consular fees are set and collected by the relevant authorities. Translation, notarisation,
              courier and other third-party costs are charged by those providers. None of these are part of the{" "}
              {site.name} service fee unless expressly stated.
            </p>

            <h2>6. Limitations</h2>
            <ul>
              <li>We do not process applications or make official decisions.</li>
              <li>We do not guarantee approvals, outcomes or timelines.</li>
              <li>We do not represent customers before authorities.</li>
              <li>We do not provide legal or immigration-law advice.</li>
              <li>Official requirements may change; the current official instruction always applies.</li>
            </ul>
            <p>
              Limitation of liability: <Missing label="Liability wording (legal review)" />.
            </p>

            <h2>7. Complaints and contact</h2>
            <p>
              Complaints procedure: <Missing label="Complaints procedure" />. You can reach us via the{" "}
              <Link href="/contact/">Contact page</Link>
              {site.contact.email ? (
                <>
                  {" "}or at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </>
              ) : null}
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PendingReview } from "@/components/LegalNotice";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer & Service Limitations",
  description: "SimplYes is an independent documentation assistance service, not affiliated with any government authority, embassy or consulate.",
  path: "/disclaimer/",
  noindex: !site.legal.reviewed,
});

/** §20 — independence, no affiliation, no guarantees, decisions with authorities, legal boundaries, changing requirements. */
export default function DisclaimerPage() {
  return (
    <>
      <PageHero badge="Legal" title="Disclaimer & service limitations" crumbs={[{ name: "Disclaimer", path: "/disclaimer/" }]} />
      <section className="pb-[var(--section-y)]">
        <div className="container-site max-w-[760px]">
          {!site.legal.reviewed && (
            <PendingReview>Draft wording based on the approved specification, subject to owner and legal review.</PendingReview>
          )}
          <div className="prose-simple mt-8">
            <p className="text-sm">Last updated: {site.legal.lastUpdated}</p>

            <h2>Independent service status</h2>
            <p>{independenceStatement}</p>

            <h2>No government affiliation</h2>
            <p>
              {site.name} is not an embassy, consulate, government department or government-affiliated organisation, and
              does not act on behalf of any of them or of any outsourced application centre. Our website does not use
              government seals, emblems or official imagery.
            </p>

            <h2>No guarantee of approval</h2>
            <p>
              We cannot guarantee that any application will be accepted or approved, or that it will be processed within a
              particular time.
            </p>

            <h2>Official decisions remain with the authorities</h2>
            <p>
              Official applications, appointments, fees, processing and decisions remain solely with the relevant
              authorities and their designated service providers.
            </p>

            <h2>Legal and immigration-law boundaries</h2>
            <p>
              {site.name} provides documentation assistance only. We do not provide legal advice, legal representation or
              immigration-law advice, and we do not draft legal documents in a way that requires legal authorisation. Where
              your matter needs such services, we will tell you so and you should consult an appropriately qualified
              professional.
            </p>

            <h2>Official requirements may change</h2>
            <p>
              Requirements, fees and procedures are set by the authorities and can change without notice. Information on
              this website is general guidance; where an official instruction differs from anything we say, the official
              instruction applies.
            </p>

            <p>
              See also our <Link href="/terms/">Terms &amp; Conditions</Link> and <Link href="/privacy/">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Missing, PendingReview } from "@/components/LegalNotice";

const legal = site.legal;
const complete = Boolean(legal.legalName && legal.representative && legal.street && legal.postalCodeCity && legal.email);

export const metadata: Metadata = pageMetadata({
  title: "Impressum (Legal Notice)",
  description: "Legal notice (Impressum) for the Simplyes website.",
  path: "/impressum/",
  // Not indexed until verified business details are in place.
  noindex: !complete || !legal.reviewed,
});

function Value({ value, label }: { value: string | null; label: string }) {
  return value ? <>{value}</> : <Missing label={label} />;
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero badge="Legal" title="Impressum" lead="Legal notice in accordance with § 5 DDG." crumbs={[{ name: "Impressum", path: "/impressum/" }]} />
      <section className="pb-[var(--section-y)]">
        <div className="container-site max-w-[760px]">
          {(!complete || !legal.reviewed) && (
            <PendingReview>
              The provider details below have not yet been supplied and verified by the business owner. This page must
              be completed with the correct registered details and reviewed before the website goes live.
            </PendingReview>
          )}
          <div className="prose-simple mt-8">
            <h2>Service provider</h2>
            <p>
              <Value value={legal.legalName} label="Full legal name / company name" />
              <br />
              <Value value={legal.street} label="Street and number" />
              <br />
              <Value value={legal.postalCodeCity} label="Postal code and city" />
              <br />
              {legal.country}
            </p>

            <h2>Represented by</h2>
            <p>
              <Value value={legal.representative} label="Name of the responsible person" />
            </p>

            <h2>Contact</h2>
            <p>
              Email: <Value value={legal.email} label="Email address" />
              <br />
              Telephone: <Value value={legal.phone} label="Telephone number" />
              <br />
              WhatsApp: {site.whatsapp.display}
            </p>

            {(legal.vatId || legal.register) && (
              <>
                <h2>Register and VAT</h2>
                <p>
                  {legal.register && (
                    <>
                      {legal.register}
                      <br />
                    </>
                  )}
                  {legal.vatId && <>VAT ID: {legal.vatId}</>}
                </p>
              </>
            )}

            <h2>Independent service</h2>
            <p>{site.disclosure}</p>

            <h2>Liability for links</h2>
            <p>
              This website contains links to external websites, including official government websites. We have no
              influence on their content, and the respective provider is responsible for it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

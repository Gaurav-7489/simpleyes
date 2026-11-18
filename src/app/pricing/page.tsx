import type { Metadata } from "next";
import Link from "next/link";
import { pricing } from "@/content/home";
import { enquiryHref } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { DocumentStage } from "@/components/scene/DocumentStage";
import { FinalCta } from "@/components/FinalCta";
import { FeeTable } from "@/components/FeeTable";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Pricing & Service Fees | ${site.name}`,
  absoluteTitle: true,
  description:
    "How Simplyes charges: quotation-based service fees explained before assistance begins, and how they differ from official and third-party costs.",
  path: "/pricing/",
});

/**
 * Explains how Simplyes charges. No amounts until the owners approve them (quotation model). Approved prices
 * go into `pricing.serviceFees` and appear in <FeeTable> ("From €X" / "On quotation") without a redesign.
 */
export default function PricingPage() {
  const quoteHref = enquiryHref(undefined, "pricing");
  return (
    <>
      <PageHero
        title="Clear about fees, before we begin"
        lead="Our fees depend on the service and your situation, so we work with quotations. Here is what affects a quote — and which costs are separate from ours."
        crumbs={[{ name: "Pricing", path: "/pricing/" }]}
      >
        <ButtonLink href={quoteHref} location="pricing-hero">
          Request a Service Quote
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="fee-types" className="section-tight">
        <div className="container-site">
          <h2 id="fee-types" className="type-h2 max-w-[18ch]">
            Four kinds of cost, kept separate
          </h2>
          <div className="layers mt-10">
            <div className="layers-stage" aria-hidden="true">
              <DocumentStage scene="pricing" tilt ratio="1 / 0.9" />
            </div>
            <ol className="layers-list">
              {pricing.feeTypes.map((fee, i) => (
                <li key={fee.title} className="layer" data-own={i === 0 ? "" : undefined}>
                  <span className="layer-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="type-card-title">{fee.title}</h3>
                    <p className="mt-2 max-w-[52ch] text-[0.9875rem] leading-relaxed text-ink-2">{fee.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FeeTable fees={pricing.serviceFees} />

      <section aria-labelledby="quote-factors" className="section-tight">
        <div className="container-site scope-grid">
          <div className="scope-col paper">
            <h2 id="quote-factors" className="type-card-title">
              What may shape a quotation
            </h2>
            <ul className="check-list mt-5">
              {pricing.factors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </div>
          <div className="scope-col scope-col-out">
            <h2 className="type-card-title">How our quotation model works</h2>
            <ol className="quote-steps mt-5">
              {[
                "You describe your situation in a short enquiry.",
                "We explain what we can help with and what the service fee covers.",
                "Official fees and third-party costs are shown as separate from our fee.",
                "You decide whether to go ahead.",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-2">
              Corporate teams can use the{" "}
              <Link href={enquiryHref(undefined, "corporate")} className="link-tertiary">
                corporate enquiry option
              </Link>
              . Questions? See the{" "}
              <Link href="/faqs/#pricing" className="link-tertiary">
                pricing FAQs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        compact
        title="Request a service quote"
        lead="Tell us which service you need and a little about your situation. We'll explain the fee before any assistance begins."
        primaryLabel="Request a Service Quote"
        primaryHref={quoteHref}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Pricing", path: "/pricing/" }])} />
    </>
  );
}

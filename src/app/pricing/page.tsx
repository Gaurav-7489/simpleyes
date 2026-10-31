import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { pricing } from "@/content/home";
import { enquiryHref } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Pricing & Service Fees | ${site.name}`,
  absoluteTitle: true,
  description:
    "How SimplYes charges: quotation-based service fees explained before assistance begins, and how they differ from official and third-party costs.",
  path: "/pricing/",
});

/**
 * §11 — explains how SimplYes charges. No amounts until the owners approve them
 * (quotation model). Structured so a fee table can be added later without redesign.
 */
export default function PricingPage() {
  const quoteHref = enquiryHref(undefined, "pricing");
  return (
    <>
      <PageHero
        badge="Pricing"
        title="Clear about fees, before we begin"
        lead="Our fees depend on the service and your situation, so we work with quotations. Here is what affects a quote — and which costs are separate from ours."
        crumbs={[{ name: "Pricing", path: "/pricing/" }]}
      >
        <ButtonLink href={quoteHref} location="pricing-hero">
          Request a Service Quote
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="fee-types" className="pb-[var(--section-y)]">
        <div className="container-site">
          <h2 id="fee-types" className="type-h2 text-center" data-reveal>
            Four kinds of cost to understand
          </h2>
          <ol className="mx-auto mt-10 grid max-w-[960px] gap-4">
            {pricing.feeTypes.map((fee, i) => (
              <li
                key={fee.title}
                className={`card flex items-start gap-4 ${i === 0 ? "!border-accent-900 !bg-accent-900" : i === 1 ? "card-mint" : ""}`}
                data-reveal
                style={revealDelay(i * 60)}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-10 shrink-0 place-items-center rounded-[12px] font-display font-semibold ${
                    i === 0 ? "bg-white text-accent-900" : "bg-accent-50 text-accent-700 ring-1 ring-accent-100"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className={`type-card-title ${i === 0 ? "text-white" : ""}`}>{fee.title}</h3>
                  <p className={`mt-1.5 text-[0.9375rem] leading-relaxed ${i === 0 ? "text-white/90" : "text-ink-2"}`}>{fee.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="quote-factors" className="section bg-white">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card" data-reveal>
            <h2 id="quote-factors" className="type-card-title">
              What may shape a quotation
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {pricing.factors.map((factor) => (
                <li key={factor} className="rounded-full border border-line bg-canvas px-3.5 py-2 text-sm text-ink">
                  {factor}
                </li>
              ))}
            </ul>
          </div>
          <div className="card card-mint flex flex-col gap-3" data-reveal style={revealDelay(60)}>
            <h2 className="type-card-title">How our quotation model works</h2>
            <ul className="flex flex-col gap-3 type-body">
              {[
                "You describe your situation in a short enquiry.",
                "We explain what we can help with and what the service fee covers.",
                "Official fees and third-party costs are shown as separate from our fee.",
                "You decide whether to go ahead.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-2">
              Corporate teams can use the{" "}
              <Link href={enquiryHref(undefined, "corporate")} className="text-accent-700 underline underline-offset-4">
                corporate enquiry option
              </Link>
              . Questions? See the{" "}
              <Link href="/faqs/#pricing" className="text-accent-700 underline underline-offset-4">
                pricing FAQs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        title="Request a service quote"
        lead="Tell us which service you need and a little about your situation. We'll explain the fee before any assistance begins."
        primaryLabel="Request a Service Quote"
        primaryHref={quoteHref}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Pricing", path: "/pricing/" }])} />
    </>
  );
}

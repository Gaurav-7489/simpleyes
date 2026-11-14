import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { IconTile } from "@/components/ui/Icon";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Our Services — Documentation Assistance in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "All eight SimplYes services: passport, OCI, attestation & legalisation, affidavits, visa documentation, family, student and corporate documentation assistance.",
  path: "/services/",
});

/** §06 — Services overview, owners' mockup layout: all eight services as tiles, each linking to its page. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Our Services"
        lead="Choose the service you need assistance with."
        crumbs={[{ name: "Services", path: "/services/" }]}
      />
      <section aria-label="All services" className="pb-[var(--section-y-compact)]">
        <div className="container-site">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} className="service-tile" data-cta-location="services-grid">
                  <IconTile name={service.icon} />
                  <h2 className="font-display text-[1rem] font-medium leading-tight text-ink sm:text-[1.0625rem]">{service.title}</h2>
                  <p className="text-[0.8125rem] leading-snug text-ink-2 sm:text-sm">{service.summary}</p>
                  <span className="service-tile-more" aria-hidden="true">
                    View Service
                    <ArrowRight className="size-3.5" strokeWidth={1.75} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-sm text-ink-2">
            Not sure which service fits? <Link href="/contact/" className="font-medium text-accent-700 underline underline-offset-4">Send an enquiry</Link> and
            describe your situation.
          </p>
        </div>
      </section>
      <FinalCta compact />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

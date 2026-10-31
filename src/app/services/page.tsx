import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Our Services — Documentation Assistance in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "All eight SimplYes services: passport, OCI, attestation & legalisation, affidavits, visa documentation, family, student and corporate documentation assistance.",
  path: "/services/",
});

/** §06 — Services overview: all eight categories side by side, each linking to its page. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Documentation assistance, by service"
        lead={`Eight service categories for Indians in Germany. Each page explains who it is for, how ${site.name} can help, what to prepare and what remains with the authorities.`}
        crumbs={[{ name: "Services", path: "/services/" }]}
      >
        <ButtonLink href="/contact/" location="services-hero">
          Get Assistance
        </ButtonLink>
      </PageHero>
      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {services.map((service, i) => (
              <li key={service.slug} className="min-w-0" data-reveal style={revealDelay((i % 4) * 60)}>
                <ServiceCard service={service} headingLevel="h2" />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-[60ch] text-center text-sm text-ink-2">
            Not sure which service fits? Send an enquiry and describe your situation — we&apos;ll point you to the right
            one.
          </p>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

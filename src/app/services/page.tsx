import type { Metadata } from "next";
import { services } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/ui/Button";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { revealDelay } from "@/lib/style";

export const metadata: Metadata = pageMetadata({
  title: "Services — Indian documentation assistance in Germany",
  description:
    "Passport, OCI, attestation, affidavit, family and student documentation support for Indians living in Germany. Independent private service.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Documentation assistance for Indians in Germany"
        lead="Choose the area your request belongs to. Each page explains who it's for, how we help, what to prepare and where our role ends."
        crumbs={[{ name: "Services", path: "/services/" }]}
      >
        <WhatsAppButton>Ask Which Service Fits</WhatsAppButton>
      </PageHero>

      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, i) => (
              <li key={service.slug} data-reveal style={revealDelay((i % 4) * 90)}>
                <ServiceCard service={service} headingLevel="h2" />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-[64ch] text-center text-sm text-ink-2">
            All services are preparation and guidance support from an independent private provider. Official
            requirements, fees, appointments, processing and decisions remain with the relevant authorities and their
            official application centres.
          </p>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

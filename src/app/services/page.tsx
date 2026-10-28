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
  title: "Services — Indian consular assistance in Germany",
  description:
    "Document guidance, application form assistance, photo & signature preparation, appointment guidance and process clarification for Indians living in Germany.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Assistance for every step of your process"
        lead="Simplyes helps Indians across Germany understand Indian consular and administrative requirements and prepare their documents, forms, photos and signatures. Choose a service to learn more, or ask us directly."
        crumbs={[{ name: "Services", path: "/services/" }]}
      >
        <WhatsAppButton topic="general">Ask Which Service Fits</WhatsAppButton>
      </PageHero>

      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <li key={service.slug} data-reveal style={revealDelay((i % 3) * 90)}>
                <ServiceCard service={service} headingLevel="h2" />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-[64ch] text-center text-sm text-ink-2">
            All services are guidance and preparation support from an independent private provider. Official
            requirements, fees, appointments and decisions remain with the respective authorities and their designated
            service providers.
          </p>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

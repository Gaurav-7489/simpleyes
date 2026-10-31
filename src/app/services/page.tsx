import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ServiceMosaic } from "@/components/ServiceMosaic";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Our Services — Documentation Assistance in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "All eight SimplYes services: passport, OCI, attestation & legalisation, affidavits, visa documentation, family, student and corporate documentation assistance.",
  path: "/services/",
});

/** Services overview: the eight categories as one visual mosaic, each linking to its page. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Choose your service"
        lead="Eight areas of documentation assistance for Indians in Germany."
        crumbs={[{ name: "Services", path: "/services/" }]}
      />
      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ServiceMosaic services={services} headingLevel="h2" />
        </div>
      </section>
      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { AssistCards } from "@/components/redesign/AssistCards";
import { ChooseService, GuidesSection } from "@/components/redesign/HomeSections";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Indian Passport, e-OCI & Visa Services | Simplyes",
  absoluteTitle: true,
  description:
    "Six services for Indians in Germany: passport, e-OCI, attestation & affidavits, visa, family and student. Document checks, form filling and appointments.",
  path: "/services/",
});

/** Services overview (redesign): the six services with what is included, then appointments, emergencies and guides. */
export default function ServicesPage() {
  return (
    <>
      <RdPageHero
        crumbs={[{ name: "Services", path: "/services/" }]}
        eyebrow="Our services"
        title="Indian passport, e-OCI, visa and attestation services in Germany"
        lead="We check your documents, fill in your forms, help book your appointment and support you in emergencies, so your application is right the first time."
      />
      <ChooseService />
      <div className="pt-12">
        <AssistCards />
      </div>
      <GuidesSection />
      <FinalCta />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Services", path: "/services/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Simplyes services",
            itemListElement: services.map((service, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/services/${service.slug}/`),
              name: service.title,
            })),
          },
        ]}
      />
    </>
  );
}

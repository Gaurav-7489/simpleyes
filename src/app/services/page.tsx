import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, servicesItemListJsonLd } from "@/lib/seo";
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

/** Services overview: a clean directory of the eight approved categories, each linking to its page. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Our Services"
        lead={`Find the documentation support you need. Eight service areas for Indians in Germany — each page explains who it is for, how ${site.name} can help, what to prepare and what remains with the authorities.`}
        crumbs={[{ name: "Services", path: "/services/" }]}
      />
      <section aria-label="All services" className="section !pt-[clamp(40px,5vw,64px)]">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} headingLevel="h2" />
              </li>
            ))}
          </ul>

          <div className="card card-mint mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between" data-reveal>
            <div className="flex items-start gap-4">
              <MessageCircleQuestion aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-700" strokeWidth={1.6} />
              <div>
                <h2 className="type-card-title">Not sure which service fits?</h2>
                <p className="type-body mt-1 max-w-[56ch]">
                  Describe your situation in a short enquiry and we&apos;ll point you to the right service. You can also read the{" "}
                  <Link href="/how-it-works/" className="text-link">
                    five-step process
                  </Link>
                  .
                </p>
              </div>
            </div>
            <ButtonLink href="/contact/" location="services-helper" className="shrink-0">
              Get Assistance
            </ButtonLink>
          </div>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Services", path: "/services/" }]), servicesItemListJsonLd()]} />
    </>
  );
}

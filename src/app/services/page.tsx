import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ServiceList } from "@/components/ServiceList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Services: Indian Passport, e-OCI & Visa | ${site.name}`,
  absoluteTitle: true,
  description:
    "Six Simplyes services: Indian passport, e-OCI, attestation and affidavits, Indian visa documentation, family documentation and New in Germany.",
  path: "/services/",
});

/** Services overview: the six services, named the way the consulates name them. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our services"
        lead="Six services, named the way the consulates name them. Choose the one that matches your situation."
        crumbs={[{ name: "Services", path: "/services/" }]}
      />
      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ServiceList headingLevel="h2" />
          <p className="mt-12 text-[0.9375rem] text-ink-2">
            Not sure which one fits?{" "}
            <Link href="/contact/" className="link-inline">
              Describe your situation
            </Link>{" "}
            and we tell you.
          </p>
        </div>
      </section>
      <FinalCta compact />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { enquiryHref, services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SceneImage } from "@/components/scene/SceneImage";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Services — Documentation Assistance in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "All eight SimplYes services: passport, OCI, attestation & legalisation, affidavits, visa documentation, family, student and corporate documentation assistance.",
  path: "/services/",
});

/** Services overview: a gallery of the eight approved services, each with its own document composition. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        lead="Eight kinds of Indian documentation, explained and prepared with you. Choose the one that matches your situation."
        crumbs={[{ name: "Services", path: "/services/" }]}
      />

      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ul className="svc-gallery">
            {services.map((service, i) => {
              const href = `/services/${service.slug}/`;
              return (
                <li key={service.slug} className="svc-gallery-item" data-flip={i % 2 === 1 ? "" : undefined}>
                  <figure className="svc-gallery-stage">
                    <SceneImage
                      scene={service.scene.kind}
                      alt={service.scene.label}
                      sizes="(min-width: 1024px) 560px, calc(100vw - 36px)"
                      priority={i === 0}
                    />
                  </figure>
                  <div className="svc-gallery-copy">
                    <h2 className="type-h2">
                      <Link href={href} className="svc-gallery-title" data-cta-location="services-page">
                        {service.title}
                      </Link>
                    </h2>
                    <p className="type-lead mt-4 max-w-[34rem]">{service.summary}</p>
                    <p className="mt-6 text-[0.9375rem] font-medium text-ink">Common requests</p>
                    <ul className="svc-gallery-issues mt-2">
                      {service.issues.map((issue) => (
                        <li key={issue.id}>{issue.label}</li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link href={href} className="btn btn-light" data-cta-location="services-page">
                        <span className="btn-face">
                          View {service.shortTitle ?? service.title}
                        </span>
                      </Link>
                      <Link
                        href={enquiryHref(service, service.slug === "corporate-services" ? "corporate" : undefined)}
                        className="link-tertiary"
                        data-cta-location="services-page"
                      >
                        Get assistance
                        <span className="sr-only"> with {service.title}</span>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-16 text-[1.0625rem] text-ink-2">
            Not sure which service fits?{" "}
            <Link href="/contact/" className="link-tertiary">
              Send an enquiry and describe your situation
            </Link>
          </p>
        </div>
      </section>
      <FinalCta compact />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services/" }])} />
    </>
  );
}

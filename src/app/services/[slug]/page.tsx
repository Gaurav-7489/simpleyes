import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { enquiryHref, getService, services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { ServiceScene } from "@/components/illustrations/ServiceScene";
import { ServiceBackdrop } from "@/components/illustrations/ServiceBackdrop";
import { ServiceVisualBody } from "@/components/service/ServiceVisualBody";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackServiceView } from "@/components/analytics/TrackServiceView";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  // §17 pattern ("OCI Services — Documentation Assistance in Germany | SimplYes"), shortened for long names.
  const full = `${service.title} — Documentation Assistance in Germany | ${site.name}`;
  return pageMetadata({
    title: full.length <= 65 ? full : `${service.title} in Germany | ${site.name}`,
    absoluteTitle: true,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Short, interactive service page: hero, "Which one is you?", FAQs and the enquiry CTA. */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const lastChecked = service.sources.map((s) => s.verifiedOn).sort().at(-1);
  const ctaLabel = "Get Assistance With This Service";
  const corporate = service.slug === "corporate-services";
  const primaryHref = enquiryHref(service, corporate ? "corporate" : undefined);

  return (
    <>
      <TrackServiceView name={service.title} />

      {/* 1 · Service-specific hero */}
      <section className="hero-mint relative isolate overflow-hidden pb-[clamp(40px,5vw,72px)] pt-[clamp(96px,10vw,140px)]">
        <ServiceBackdrop slug={service.slug} />
        <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col items-start">
            <nav aria-label="Breadcrumb" className="hero-intro mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-2">
                <li>
                  <Link href="/" className="inline-flex min-h-8 items-center rounded px-1 underline-offset-4 hover:underline">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-3.5 text-ink-3" />
                  <Link href="/services/" className="inline-flex min-h-8 items-center rounded px-1 underline-offset-4 hover:underline">
                    Services
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-3.5 text-ink-3" />
                  <span aria-current="page" className="px-1 text-ink">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>
            <div className="hero-intro flex items-center gap-3">
              <IconTile name={service.icon} />
              <Badge>Service {service.number}</Badge>
            </div>
            <h1 className="type-hero hero-intro mt-5" style={revealDelay(60)}>
              {service.title}
            </h1>
            <div className="hero-intro mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={revealDelay(180)}>
              <ButtonLink href={primaryHref} location="service-hero">
                {ctaLabel}
              </ButtonLink>
              <WhatsAppButton service={service} variant="light" location="service-hero">
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
          {service.visual.photo ? (
            <div className="card-art card-photo hero-intro aspect-[4/3] w-full" style={revealDelay(120)}>
              <Image
                src={service.visual.photo.src}
                alt={service.visual.photo.alt}
                width={service.visual.photo.width}
                height={service.visual.photo.height}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ) : (
            <div className="card-art card-scene hero-intro aspect-[4/3] w-full" aria-hidden="true" style={revealDelay(120)}>
              <ServiceScene kind={service.visual.scene ?? "oci"} uid={service.slug} className="absolute inset-0 h-full w-full" />
            </div>
          )}
        </div>
      </section>

      <ServiceVisualBody service={service} ctaHref={primaryHref} ctaLabel={ctaLabel} />

      {/* Relevant FAQs */}
      <section aria-labelledby="service-faqs" className="section bg-white">
        <div className="container-site max-w-[860px]">
          <h2 id="service-faqs" className="type-h2 text-center" data-reveal>
            {service.title} FAQs
          </h2>
          <div className="mt-10" data-reveal>
            <FaqList items={service.faqs} />
          </div>
          {service.sources.length > 0 && lastChecked && (
            <div className="mt-12" data-reveal>
              <h3 id="official-sources" className="text-center text-sm font-medium text-ink">
                Official sources — checked {formatDate(lastChecked)}
              </h3>
              <ul className="mt-3 flex flex-col items-center gap-1">
                {service.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-8 items-center gap-1.5 text-center text-sm text-accent-700 underline underline-offset-4"
                    >
                      {source.label}
                      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
                      <span className="sr-only"> (official website, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-xs text-ink-3">
                Requirements can change. Where an official instruction differs from anything on this page, the official
                instruction applies.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry CTA (pre-selected form) */}
      <FinalCta
        title={`Get assistance with ${service.title}`}
        lead="Send a short enquiry with this service pre-selected. A real person will get back to you and explain the next step."
        service={service}
        primaryLabel={ctaLabel}
      />

      <JsonLd
        data={[
          serviceJsonLd({ name: service.title, description: service.intro.join(" "), path }),
          breadcrumbJsonLd([
            { name: "Services", path: "/services/" },
            { name: service.title, path },
          ]),
          faqJsonLd(service.faqs),
        ]}
      />
    </>
  );
}

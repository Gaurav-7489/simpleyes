import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, CircleCheck, CircleX, Info } from "lucide-react";
import { enquiryHref, getService, relatedServices, services } from "@/content/services";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
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

/** Service page: short and visual — hero, situations, at a glance, steps, scope, questions, CTA. */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const related = relatedServices(service);
  const lastChecked = service.sources.map((s) => s.verifiedOn).sort().at(-1);
  const ctaLabel = "Get Assistance With This Service";
  const corporate = service.slug === "corporate-services";
  const primaryHref = enquiryHref(service, corporate ? "corporate" : undefined);

  return (
    <>
      <TrackServiceView name={service.title} />

      {/* 1 · Service-specific hero */}
      <section className="relative isolate overflow-hidden pb-[clamp(40px,5vw,72px)] pt-[clamp(96px,10vw,140px)]">
        <div aria-hidden="true" className="hero-rings -z-10 opacity-70" />
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
            <div className="hero-intro flex items-center gap-4">
              <span className="orb-glass size-12" aria-hidden="true">
                <Icon name={service.icon} className="size-5" />
              </span>
              <Badge index={service.number}>Service</Badge>
            </div>
            <h1 className="type-hero hero-intro mt-5" style={revealDelay(60)}>
              {service.title}
            </h1>
            <p className="type-lead hero-intro mt-4 max-w-[40rem] !text-[1.125rem]" style={revealDelay(120)}>
              {service.outcome}
            </p>
            <p className="hero-intro mt-2 text-sm text-ink-3" style={revealDelay(140)}>
              For {service.mainlyFor.toLowerCase()}
            </p>
            <div className="hero-intro mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={revealDelay(180)}>
              <ButtonLink href={primaryHref} location="service-hero">
                {ctaLabel}
              </ButtonLink>
              <WhatsAppButton service={service} variant="light" location="service-hero">
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
          <div className="card-art hero-intro aspect-[4/3] w-full" aria-hidden="true" style={revealDelay(120)}>
            <ServiceArt kind={service.illustration} uid={service.slug} className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      {/* Explainer (only where a service needs one, e.g. "What is OCI?") */}
      {service.explainer && (
        <section aria-labelledby="explainer" className="pb-[var(--section-y)]">
          <div className="container-site">
            <div className="explainer soft-frame" data-reveal>
              <span className="orb-glass size-12 shrink-0" aria-hidden="true">
                <Info className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h2 id="explainer" className="type-card-title">
                  {service.explainer.title}
                </h2>
                <p className="type-body mt-2 max-w-[70ch]">{service.explainer.body[0]}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Situations — in the customer's words, answered */}
      <section aria-labelledby="situations" className="section bg-white">
        <div className="container-site max-w-[980px]">
          <h2 id="situations" className="type-h2 text-center" data-reveal>
            Sounds like you?
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {service.situations.slice(0, 4).map((s, i) => (
              <li key={s.situation} className="situation" data-reveal style={revealDelay((i % 2) * 120)}>
                <p className="situation-quote">{s.situation}</p>
                <p className="situation-answer type-body">{s.howWeHelp}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* At a glance — help with · often involved · have ready */}
      <section aria-labelledby="at-a-glance" className="section">
        <div className="container-site">
          <h2 id="at-a-glance" className="type-h2 text-center" data-reveal>
            At a glance
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="glance soft-frame" data-reveal>
              <h3 id="what-we-help-with" className="glance-title">
                We help with
              </h3>
              <ul className="chip-list">
                {service.helpsWith.map((item) => (
                  <li key={item} className="chip chip-strong">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glance soft-frame" data-reveal style={revealDelay(120)}>
              <h3 id="document-categories" className="glance-title">
                Documents often involved
              </h3>
              <ul className="chip-list">
                {service.documentCategories.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-2 text-xs text-ink-3">Categories only — subject to verification for your case.</p>
            </div>
            <div className="glance soft-frame" data-reveal style={revealDelay(240)}>
              <h3 id="what-to-prepare" className="glance-title">
                Have ready
              </h3>
              <ul className="flex flex-col gap-2.5">
                {service.prepare.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process — five steps, titles only */}
      <section aria-labelledby="service-process" className="section bg-white">
        <div className="container-site">
          <h2 id="service-process" className="type-h2 text-center" data-reveal>
            How it works
          </h2>
          <ol className="rail mt-12" data-reveal>
            {service.process.map((step, i) => (
              <li key={step.title} className="rail-step">
                <span className="orb-glass size-11 font-display text-sm font-semibold" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="rail-title">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scope boundary */}
      <section aria-labelledby="outside-scope" className="section">
        <div className="container-site max-w-[980px]">
          <div className="scope-panel" data-reveal>
            <h2 id="outside-scope" className="type-card-title text-white">
              What stays with the authorities
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.outsideScope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-white/85">
                  <CircleX aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-lime" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/15 pt-4 text-sm text-white/75">{independenceStatement}</p>
          </div>
        </div>
      </section>

      {/* FAQs + official sources + related */}
      <section aria-labelledby="service-faqs" className="section bg-white">
        <div className="container-site max-w-[860px]">
          <h2 id="service-faqs" className="type-h2 text-center" data-reveal>
            Questions
          </h2>
          <div className="mt-10" data-reveal>
            <FaqList items={service.faqs} />
          </div>
          {service.sources.length > 0 && lastChecked && (
            <p className="mt-8 text-center text-xs leading-relaxed text-ink-3">
              Official sources (checked {formatDate(lastChecked)}):{" "}
              {service.sources.map((source, i) => (
                <span key={source.href}>
                  {i > 0 && " · "}
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-accent-700 underline underline-offset-4">
                    {source.label}
                    <span className="sr-only"> (official website, opens in a new tab)</span>
                  </a>
                </span>
              ))}
              . Where an official instruction differs, it applies.
            </p>
          )}
          {related.length > 0 && (
            <div className="mt-12 text-center">
              <h2 id="related-services" className="text-sm font-medium text-ink-2">
                Related services
              </h2>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link href={`/services/${other.slug}/`} className="related-chip">
                      <Icon name={other.icon} className="size-4 text-accent-700" />
                      {other.title}
                      <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 13 · Enquiry CTA (pre-selected form) */}
      <FinalCta
        title={`Get assistance with ${service.title}`}
        lead="Send a short enquiry — this service is already selected."
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, CircleX, ExternalLink, Info, Mail, MessageCircle, Send } from "lucide-react";
import { enquiryHref, getService, relatedServices, services } from "@/content/services";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { ServiceSection } from "@/components/service/ServiceSection";
import { ServiceCard } from "@/components/ServiceCard";
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

/** §08 — one consistent 14-part structure with distinct content per service. */
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
            <div className="hero-intro flex items-center gap-3">
              <IconTile name={service.icon} />
              <Badge>Service {service.number}</Badge>
            </div>
            <h1 className="type-hero hero-intro mt-5" style={revealDelay(60)}>
              {service.title}
            </h1>
            <p className="type-lead hero-intro mt-4 max-w-[40rem] !text-[1.125rem]" style={revealDelay(120)}>
              {service.outcome}
            </p>
            <p className="hero-intro mt-2 text-sm text-ink-3" style={revealDelay(140)}>
              Mainly for: {service.mainlyFor}
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

      {/* 2 · Service introduction (+ unique explainer) */}
      <section aria-labelledby="introduction" className="section !pt-0">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="card" data-reveal>
            <h2 id="introduction" className="type-card-title">
              About this service
            </h2>
            <div className="mt-3 flex max-w-[64ch] flex-col gap-3 type-lead">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {service.explainer ? (
            <div className="card card-mint" data-reveal style={revealDelay(90)}>
              <h2 id="explainer" className="type-card-title flex items-center gap-2">
                <Info aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                {service.explainer.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3 type-body">
                {service.explainer.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ) : (
            <div data-reveal style={revealDelay(90)}>
              <ServiceSection id="who-its-for" title="Who this service is for" items={service.audience} />
            </div>
          )}
        </div>
      </section>

      {/* 3 · Who this service is for (when the explainer took the slot above) */}
      {service.explainer && (
        <section aria-label="Who this service is for" className="pb-[var(--section-y)]">
          <div className="container-site" data-reveal>
            <ServiceSection id="who-its-for" title="Who this service is for" items={service.audience} />
          </div>
        </section>
      )}

      {/* 4 · Common customer situations */}
      <section aria-labelledby="situations" className="section bg-white">
        <div className="container-site">
          <h2 id="situations" className="type-h2 text-center" data-reveal>
            Common situations
          </h2>
          <p className="type-lead mx-auto mt-3 max-w-[52ch] text-center" data-reveal>
            Situations we often hear — and how {site.name} may help with each.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.situations.map((s, i) => (
              <li key={s.situation} className="situation" data-reveal style={revealDelay((i % 2) * 60)}>
                <p className="situation-quote">{s.situation}</p>
                <p className="situation-answer type-body">
                  <a href="#what-we-help-with" className="font-medium text-accent-700 underline-offset-4 hover:underline">
                    How we help:
                  </a>{" "}
                  {s.howWeHelp}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · What SimplYes can help with · 6 · Possible document categories */}
      <section aria-label={`What ${site.name} can help with`} className="section">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div data-reveal>
            <ServiceSection id="what-we-help-with" title={`What ${site.name} can help with`} items={service.helpsWith} />
          </div>
          <div data-reveal style={revealDelay(90)}>
            <ServiceSection id="document-categories" title="Possible document categories" items={service.documentCategories} icon="info">
              <p className="mt-auto rounded-[12px] bg-canvas-alt px-4 py-3 text-sm leading-relaxed text-ink-2">
                Indicative categories only, subject to verification. The documents you actually need depend on your
                situation and the current official requirements.
              </p>
            </ServiceSection>
          </div>
        </div>
        {/* Mid-page CTA (§08 conversion rule) */}
        <div className="container-site mt-8 flex justify-center" data-reveal>
          <div className="cta-strip">
            <p className="text-[0.9375rem] text-ink-2">Ready to get started with {service.title}?</p>
            <ButtonLink href={primaryHref} size="sm" location="service-mid">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 7 · How the process works */}
      <section aria-labelledby="service-process" className="section bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div data-reveal>
            <Badge>How it works</Badge>
            <h2 id="service-process" className="type-h2 mt-5 max-w-[16ch]">
              How the process works
            </h2>
            <p className="type-lead mt-4 max-w-[44ch]">
              The same five clear steps for every service — phrased here for {service.title}.
            </p>
          </div>
          <ol className="stepper stepper-vertical" data-reveal>
            {service.process.map((step, i) => (
              <li key={step.title} className="stepper-item">
                <span className="stepper-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="type-card-title">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="type-body mt-1">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 · What to prepare · 9 · What is included · 10 · What is outside the scope */}
      <section aria-label="Preparation, inclusions and scope" className="section">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div data-reveal>
            <ServiceSection id="what-to-prepare" title="What to have ready" items={service.prepare}>
              <p className="mt-auto rounded-[12px] bg-canvas-alt px-4 py-3 text-sm leading-relaxed text-ink-2">
                Please don&apos;t send passport numbers or documents with your enquiry.
              </p>
            </ServiceSection>
          </div>
          <div data-reveal style={revealDelay(60)}>
            <ServiceSection id="whats-included" title="What is included" items={service.included} />
          </div>
          <div data-reveal style={revealDelay(120)}>
            <div className="card flex h-full flex-col gap-4">
              <h2 id="outside-scope" className="type-card-title">
                What is outside the scope
              </h2>
              <ul className="flex flex-col gap-3">
                {service.outsideScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                    <CircleX aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto rounded-[12px] border border-accent-100 bg-accent-50 px-4 py-3 text-sm leading-relaxed text-ink-2">
                {independenceStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 · Relevant FAQs */}
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

      {/* 12 · Related services */}
      {related.length > 0 && (
        <section aria-labelledby="related-services" className="section">
          <div className="container-site">
            <h2 id="related-services" className="type-h2 text-center" data-reveal>
              Related services
            </h2>
            <ul className="mx-auto mt-10 grid max-w-[1000px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug} data-reveal>
                  <ServiceCard service={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 13 · Enquiry CTA (pre-selected form) */}
      <FinalCta
        title={`Get assistance with ${service.title}`}
        lead="Send a short enquiry with this service pre-selected. A real person will get back to you and explain the next step."
        service={service}
        primaryLabel={ctaLabel}
      />

      {/* 14 · Contact options */}
      <section aria-labelledby="contact-options" className="pb-[var(--section-y)]">
        <div className="container-site max-w-[1000px]">
          <h2 id="contact-options" className="type-card-title text-center">
            Other ways to reach us
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            <li>
              <Link href={primaryHref} className="card flex min-h-16 items-center gap-3 !p-4 text-[0.9375rem] font-medium text-ink hover:border-accent-300">
                <Send aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                Enquiry form
                <ArrowRight aria-hidden="true" className="ml-auto size-4 text-ink-3" strokeWidth={1.75} />
              </Link>
            </li>
            <li>
              <a
                href={whatsappHref(service)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-cta-location="service-contact"
                data-topic={service.slug}
                className="card flex min-h-16 items-center gap-3 !p-4 text-[0.9375rem] font-medium text-ink hover:border-accent-300"
              >
                <MessageCircle aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                WhatsApp
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight aria-hidden="true" className="ml-auto size-4 text-ink-3" strokeWidth={1.75} />
              </a>
            </li>
            {site.contact.email ? (
              <li>
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Enquiry — ${service.title}`)}`}
                  data-cta="email"
                  data-cta-location="service-contact"
                  className="card flex min-h-16 items-center gap-3 !p-4 text-[0.9375rem] font-medium text-ink hover:border-accent-300"
                >
                  <Mail aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                  Email
                  <ArrowRight aria-hidden="true" className="ml-auto size-4 text-ink-3" strokeWidth={1.75} />
                </a>
              </li>
            ) : (
              <li>
                <Link href="/faqs/" className="card flex min-h-16 items-center gap-3 !p-4 text-[0.9375rem] font-medium text-ink hover:border-accent-300">
                  <Info aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                  Read the FAQs
                  <ArrowRight aria-hidden="true" className="ml-auto size-4 text-ink-3" strokeWidth={1.75} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>

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

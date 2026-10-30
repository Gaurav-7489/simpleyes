import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, ExternalLink } from "lucide-react";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { CardFrame } from "@/components/ui/CardFrame";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { ServiceSection } from "@/components/service/ServiceSection";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} for Indians in Germany`,
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

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const others = services.filter((s) => s.slug !== service.slug);
  const lastChecked = service.sources.map((s) => s.verifiedOn).sort().at(-1);

  return (
    <>
      <PageHero
        badge="Service"
        title={service.title}
        lead={service.intro}
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: service.title, path },
        ]}
      >
        <WhatsAppButton service={service}>Ask About {service.shortTitle ?? service.title}</WhatsAppButton>
      </PageHero>

      {/* Who it's for · How SimplYes helps · What to prepare */}
      <section aria-label={`${service.title} overview`} className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div data-reveal>
            <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-6">
              <div className="card-art h-[clamp(220px,28vw,320px)]">
                <ServiceArt kind={service.illustration} className="absolute inset-0 h-full w-full" />
              </div>
              <div>
                <h2 id="how-we-help" className="type-card-title">
                  How {site.name} helps
                </h2>
                <ul className="mt-5 flex max-w-[52ch] flex-col gap-3.5">
                  {service.helpsWith.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                      <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardFrame>
          </div>

          <div className="flex flex-col gap-6">
            <div data-reveal style={revealDelay(90)}>
              <ServiceSection id="who-its-for" title="Who it's for" items={service.audience} className="" />
            </div>
            <div data-reveal style={revealDelay(180)}>
              <ServiceSection
                id="what-to-prepare"
                title="What you can prepare before contacting us"
                items={service.prepare}
                className=""
              >
                <p className="rounded-[14px] bg-canvas-alt px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-2">
                  Please don&apos;t send passport copies or other sensitive documents in your first message.
                </p>
              </ServiceSection>
            </div>
          </div>
        </div>
      </section>

      {/* Questions · Process */}
      <section aria-label={`${service.title} questions and process`} className="section bg-canvas-alt">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div data-reveal>
            <ServiceSection id="questions" title="Questions we often help clarify" items={service.issues} icon="question" />
          </div>
          <div data-reveal style={revealDelay(90)}>
            <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-4">
              <h2 id="service-process" className="type-card-title">
                How it works for this service
              </h2>
              <ol className="flex flex-col gap-4">
                {service.process.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="orb size-9 shrink-0 font-display text-sm font-medium" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-[0.9375rem] font-medium leading-snug text-ink">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="max-w-[52ch] text-[0.9375rem] leading-snug text-ink-2">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardFrame>
          </div>
        </div>
      </section>

      {/* Where our role ends · Fees · optional verified documents/timeline */}
      <section aria-label={`${service.title} boundaries and fees`} className="section bg-canvas">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div data-reveal>
            <ServiceSection id="boundaries" title="Where our role ends" items={service.boundaries} icon="info">
              <p className="mt-auto rounded-[14px] bg-canvas-alt px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-2">
                {site.shortDisclosure}
              </p>
            </ServiceSection>
          </div>
          <div className="flex flex-col gap-6" data-reveal style={revealDelay(90)}>
            <CardFrame cardClassName="flex flex-col gap-3">
              <h2 id="fees" className="type-card-title">
                Fees{service.timeline ? " and timelines" : ""}
              </h2>
              {service.pricing ? (
                <p className="type-body">
                  {service.pricing.note}{" "}
                  <span className="text-ink-3">(checked {formatDate(service.pricing.verifiedOn)})</span>
                </p>
              ) : (
                <p className="type-body">
                  Any service fee is explained and agreed with you before we start. Official fees are separate and paid
                  to the authority or its application centre.
                </p>
              )}
              {service.timeline && (
                <p className="type-body">
                  {service.timeline.note}{" "}
                  <span className="text-ink-3">(checked {formatDate(service.timeline.verifiedOn)})</span>
                </p>
              )}
            </CardFrame>
            {service.documents && (
              <ServiceSection id="documents" title="Documents usually involved" items={service.documents.items} className="">
                <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                  Source:{" "}
                  <a
                    href={service.documents.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-700 underline underline-offset-4"
                  >
                    {service.documents.source.label}
                    <span className="sr-only"> (official website, opens in a new tab)</span>
                  </a>{" "}
                  — checked {formatDate(service.documents.source.verifiedOn)}. Your case may differ.
                </p>
              </ServiceSection>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section aria-labelledby="service-faqs" className="section bg-canvas-alt">
          <div className="container-site max-w-[1080px]">
            <h2 id="service-faqs" className="type-h2 text-center" data-reveal>
              FAQs
            </h2>
            <div className="mt-10" data-reveal>
              <FaqList items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* CTA strip · Official sources */}
      <section aria-label="Next step and official sources" className="section bg-canvas">
        <div className="container-site flex flex-col items-center gap-10">
          <div className="cta-strip" data-reveal>
            <p className="text-sm text-ink-2">Questions about {service.title}?</p>
            <WhatsAppButton service={service}>Chat on WhatsApp</WhatsAppButton>
          </div>

          {service.sources.length > 0 && lastChecked && (
            <div className="w-full max-w-[760px]" data-reveal>
              <h2 id="official-sources" className="text-center text-sm font-medium text-ink">
                Official sources — checked {formatDate(lastChecked)}
              </h2>
              <ul className="mt-4 flex flex-col items-center gap-1">
                {service.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-8 items-center gap-1.5 text-center text-[0.8125rem] text-accent-700 underline underline-offset-4"
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

          <ButtonLink href="/how-it-works/" variant="light">
            How It Works
          </ButtonLink>
        </div>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="other-services" className="section bg-canvas-alt">
          <div className="container-site">
            <h2 id="other-services" className="type-h2 text-center">
              Other services
            </h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}/`}
                    className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-[14px] bg-canvas px-4 py-3 text-sm font-medium text-ink shadow-[0_0_0_1px_rgb(0_0_0/0.05),var(--shadow-card)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {other.title}
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        title={`Need help with ${service.title}?`}
        lead="Tell us what you need on WhatsApp. A real person will reply and explain the next step."
        service={service}
      />
      <JsonLd
        data={[
          serviceJsonLd({ name: service.title, description: service.intro, path }),
          breadcrumbJsonLd([
            { name: "Services", path: "/services/" },
            { name: service.title, path },
          ]),
          ...(service.faqs.length > 0 ? [faqJsonLd(service.faqs)] : []),
        ]}
      />
    </>
  );
}

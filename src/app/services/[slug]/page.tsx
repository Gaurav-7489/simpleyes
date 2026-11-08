import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, CircleX, ExternalLink, Info, Mail, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { enquiryHref, getService, relatedServices, services, type Service } from "@/content/services";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
  // "OCI Services — Documentation Assistance in Germany | SimplYes", shortened for long names.
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

const CTA_LABEL = "Get Assistance With This Service";

/** A checked list used across the service template. */
function CheckList({ items, tone = "check", columns = false }: { items: readonly string[]; tone?: "check" | "info" | "x"; columns?: boolean }) {
  const Icon = tone === "x" ? CircleX : tone === "info" ? Info : CircleCheck;
  const color = tone === "check" ? "text-green-700" : "text-ink-3";
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${columns ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[0.9875rem] leading-snug text-ink-2">
          <Icon aria-hidden="true" className={`mt-0.5 size-[18px] shrink-0 ${color}`} strokeWidth={1.75} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Content block in the reading column: H2 + body, separated by a hairline. */
function Block({ id, title, children, lead }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-12" data-reveal>
      <h2 id={id} className="type-h3">
        {title}
      </h2>
      {lead && <p className="type-body mt-2 max-w-[60ch]">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Sticky assistance card (desktop aside; stacked after the content on smaller screens). */
function AssistCard({ service, primaryHref }: { service: Service; primaryHref: string }) {
  return (
    <div className="card flex flex-col gap-4 !p-6 shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-3">
        <IconTile name={service.icon} size="sm" />
        <p className="font-display text-[1.0625rem] font-medium leading-tight text-ink">Need help with {service.title}?</p>
      </div>
      <p className="type-body !text-[0.9375rem]">
        Send a short enquiry with this service pre-selected — no documents needed at this stage.
      </p>
      <ButtonLink href={primaryHref} location="service-aside" className="w-full">
        {CTA_LABEL}
      </ButtonLink>
      <WhatsAppButton service={service} variant="light" location="service-aside" className="w-full">
        Ask on WhatsApp
      </WhatsAppButton>
      <p className="flex items-start gap-2 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-3">
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
        Independent private service. Official processing and decisions remain with the relevant authority.
      </p>
    </div>
  );
}

/** Service template: one consistent structure with distinct, approved content per service. */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const related = relatedServices(service);
  const lastChecked = service.sources.map((s) => s.verifiedOn).sort().at(-1);
  const corporate = service.slug === "corporate-services";
  const primaryHref = enquiryHref(service, corporate ? "corporate" : undefined);

  return (
    <>
      <TrackServiceView name={service.title} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line pb-[clamp(40px,5vw,72px)] pt-[calc(var(--header-h)+28px)] lg:pt-[calc(var(--header-h)+44px)]">
        <div aria-hidden="true" className="page-hero-bg" />
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div className="flex flex-col items-start">
            <Breadcrumbs
              crumbs={[
                { name: "Services", path: "/services/" },
                { name: service.title, path },
              ]}
              className="hero-in mb-6"
            />
            <div className="hero-in flex items-center gap-3" style={revealDelay(30)}>
              <IconTile name={service.icon} />
              <Badge>Service {service.number}</Badge>
            </div>
            <h1 className="type-page hero-rise mt-5" style={revealDelay(50)}>
              {service.title}
            </h1>
            <p className="type-lead hero-in mt-4 max-w-[40rem]" style={revealDelay(120)}>
              {service.outcome}
            </p>
            <div className="hero-in mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={revealDelay(180)}>
              <ButtonLink href={primaryHref} location="service-hero">
                {CTA_LABEL}
              </ButtonLink>
              <WhatsAppButton service={service} variant="light" location="service-hero">
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Answer block: what this is, who it's for, and the scope — answered before any detail. */}
          <aside aria-label="In short" className="hero-visual-in card !bg-white/80 !p-6 backdrop-blur-[6px]" style={revealDelay(140)}>
            <p className="eyebrow">In short</p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">{service.summary}</p>
            <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-[0.9375rem]">
              <div className="flex flex-col gap-0.5">
                <dt className="text-ink-3">Mainly for</dt>
                <dd className="text-ink">{service.mainlyFor}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-ink-3">Our role</dt>
                <dd className="text-ink">Guidance, preparation and review where agreed — not official processing.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Reading column + sticky assistance aside */}
      <div className="container-site grid gap-10 py-[clamp(48px,6vw,88px)] lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
        <div className="min-w-0">
          <Block id="introduction" title="About this service">
            <div className="flex max-w-[66ch] flex-col gap-4 type-lead">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {service.explainer && (
              <div className="card card-mint mt-8">
                <h3 id="explainer" className="type-card-title flex items-center gap-2">
                  <Info aria-hidden="true" className="size-5 shrink-0 text-accent-700" strokeWidth={1.75} />
                  {service.explainer.title}
                </h3>
                <div className="type-body mt-3 flex flex-col gap-3">
                  {service.explainer.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </Block>

          <Block id="who-its-for" title="Who this service is for">
            <CheckList items={service.audience} columns />
          </Block>

          <Block id="situations" title="Common situations" lead={`Situations we often hear — and how ${site.name} may help with each.`}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.situations.map((s) => (
                <li key={s.situation} className="situation">
                  <p className="situation-quote">{s.situation}</p>
                  <p className="type-body !text-[0.9375rem]">{s.howWeHelp}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="what-we-help-with" title={`What ${site.name} can help with`}>
            <CheckList items={service.helpsWith} columns />
          </Block>

          <Block id="document-categories" title="Possible document categories">
            <CheckList items={service.documentCategories} tone="info" />
            <p className="note mt-6">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
              <span>
                Indicative categories only, subject to verification. The documents you actually need depend on your situation and the
                current official requirements.
              </span>
            </p>
          </Block>

          <Block id="service-process" title="How the process works" lead={`The same five clear steps for every service — phrased here for ${service.title}.`}>
            <ol className="timeline">
              {service.process.map((step, i) => (
                <li key={step.title} className="timeline-item">
                  <span className={`step-num ${i === service.process.length - 1 ? "step-num-strong" : ""}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="pt-2">
                    <h3 className="type-card-title">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="type-body mt-1">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <section aria-label="Preparation and scope" className="grid gap-4 border-t border-line py-10 sm:grid-cols-2 lg:py-12" data-reveal>
            <div className="card">
              <h2 id="what-to-prepare" className="type-card-title">
                What to have ready
              </h2>
              <div className="mt-4">
                <CheckList items={service.prepare} />
              </div>
              <p className="mt-5 text-sm text-ink-3">Please don&apos;t send passport numbers or documents with your enquiry.</p>
            </div>
            <div className="card">
              <h2 id="whats-included" className="type-card-title">
                What is included
              </h2>
              <div className="mt-4">
                <CheckList items={service.included} />
              </div>
            </div>
            <div className="card card-quiet sm:col-span-2">
              <h2 id="outside-scope" className="type-card-title">
                What is outside the scope
              </h2>
              <div className="mt-4">
                <CheckList items={service.outsideScope} tone="x" columns />
              </div>
              <p className="note mt-6">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                <span>{independenceStatement}</span>
              </p>
            </div>
          </section>
        </div>

        <div className="lg:pt-0">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+28px)]" data-wa-anchor>
            <AssistCard service={service} primaryHref={primaryHref} />
          </div>
        </div>
      </div>

      {/* FAQs + official sources */}
      <section aria-labelledby="service-faqs" className="section section-tint">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="flex flex-col gap-6" data-reveal>
            <h2 id="service-faqs" className="type-h2">
              {service.title} FAQs
            </h2>
            {service.sources.length > 0 && lastChecked && (
              <div>
                <h3 id="official-sources" className="text-[0.9375rem] font-medium text-ink">
                  Official sources — checked {formatDate(lastChecked)}
                </h3>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {service.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-8 items-start gap-1.5 text-[0.9375rem] text-accent-700 underline underline-offset-4"
                      >
                        {source.label}
                        <ExternalLink aria-hidden="true" className="mt-1 size-3.5 shrink-0" strokeWidth={1.75} />
                        <span className="sr-only"> (official website, opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 max-w-[48ch] text-sm text-ink-3">
                  Requirements can change. Where an official instruction differs from anything on this page, the official instruction
                  applies.
                </p>
              </div>
            )}
          </div>
          <div data-reveal>
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section aria-labelledby="related-services" className="section">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
              <h2 id="related-services" className="type-h2">
                Related services
              </h2>
              <Link href="/services/" className="link-tertiary">
                All services
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other, i) => (
                <li key={other.slug} data-reveal style={revealDelay(i * 60)}>
                  <ServiceCard service={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        title={`Get assistance with ${service.title}`}
        lead="Send a short enquiry with this service pre-selected. A real person will get back to you and explain the next step."
        service={service}
        primaryLabel={CTA_LABEL}
        primaryHref={primaryHref}
      />

      {/* Other contact routes */}
      <section aria-labelledby="contact-options" className="pb-[var(--section-y)]">
        <div className="container-site max-w-[1000px]">
          <h2 id="contact-options" className="type-card-title text-center">
            Other ways to reach us
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            <li>
              <Link href={primaryHref} className="svc-card !flex-row !items-center !gap-3 !p-4 text-[0.9375rem] font-medium text-ink">
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
                className="svc-card !flex-row !items-center !gap-3 !p-4 text-[0.9375rem] font-medium text-ink"
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
                  className="svc-card !flex-row !items-center !gap-3 !p-4 text-[0.9375rem] font-medium text-ink"
                >
                  <Mail aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                  Email
                  <ArrowRight aria-hidden="true" className="ml-auto size-4 text-ink-3" strokeWidth={1.75} />
                </a>
              </li>
            ) : (
              <li>
                <Link href="/faqs/" className="svc-card !flex-row !items-center !gap-3 !p-4 text-[0.9375rem] font-medium text-ink">
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  Ban,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  CircleX,
  ClipboardList,
  ExternalLink,
  FolderOpen,
  HandHelping,
  Info,
  ListOrdered,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  PackageCheck,
  Send,
  Users,
  type LucideIcon,
} from "lucide-react";
import { enquiryHref, getService, relatedServices, services } from "@/content/services";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { DisclosureList } from "@/components/DisclosureList";
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

function CheckList({ items, variant = "check" }: { items: readonly string[]; variant?: "check" | "cross" }) {
  const Icon = variant === "check" ? CircleCheck : CircleX;
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
          <Icon
            aria-hidden="true"
            className={`mt-0.5 size-4 shrink-0 ${variant === "check" ? "text-accent-600" : "text-ink-3"}`}
            strokeWidth={1.75}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 rounded-[12px] bg-canvas-alt px-4 py-3 text-sm leading-relaxed text-ink-2">{children}</p>;
}

/**
 * §08 — the same 14 parts on every service page, in the owners' short-page layout: hero, situation tiles and
 * calls to action stay visible; the long sections are tap-to-open rows (real headings, content in the HTML).
 */
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
  const rowIcon = (Icon: LucideIcon) => (
    <span aria-hidden="true" className="icon-tile grid size-9 shrink-0 place-items-center rounded-[11px] text-accent-600">
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );

  return (
    <>
      <TrackServiceView name={service.title} />

      {/* 1 · Service-specific hero */}
      <section className="hero-mint relative isolate overflow-hidden pb-[var(--section-y-compact)] pt-[clamp(92px,9vw,120px)]">
        <div className="container-site grid items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col items-start">
            <nav aria-label="Breadcrumb" className="hero-intro mb-4">
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
              <h1 className="type-page-title">{service.title}</h1>
            </div>
            <p className="type-lead hero-intro mt-3 max-w-[40rem]">{service.outcome}</p>
            <p className="hero-intro mt-1.5 text-sm text-ink-3">Mainly for: {service.mainlyFor}</p>
            <div className="hero-intro mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={primaryHref} location="service-hero">
                {ctaLabel}
              </ButtonLink>
              <WhatsAppButton service={service} variant="light" location="service-hero">
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
          <div className="card-art hero-intro hidden aspect-[16/10] w-full sm:block" aria-hidden="true">
            <ServiceArt kind={service.illustration} uid={service.slug} className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      {/* 4 · Common customer situations — tiles, as in the mockup */}
      <section aria-labelledby="situations" className="pb-[var(--section-y-compact)]">
        <div className="container-site">
          <h2 id="situations" className="type-card-title !text-[1.375rem]">
            Common situations
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.situations.map((s) => (
              <li key={s.situation} className="situation-tile">
                <span className="icon-tile grid size-10 shrink-0 place-items-center rounded-[12px] text-accent-600" aria-hidden="true">
                  <MessageSquareQuote className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-[1rem] font-medium leading-snug text-ink">{s.situation}</p>
                  <p className="mt-1 text-sm leading-snug text-ink-2">
                    <span className="font-medium text-accent-700">How we help:</span> {s.howWeHelp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* Mid-page CTA (§08 conversion rule) */}
          <div className="mt-5 flex justify-center">
            <div className="cta-strip">
              <p className="text-[0.9375rem] text-ink-2">Ready to get started with {service.title}?</p>
              <ButtonLink href={primaryHref} size="sm" location="service-mid">
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 2, 3, 5–11 · Details: tap to open */}
      <section aria-label={`${service.title} details`} className="pb-[var(--section-y-compact)]">
        <div className="container-site max-w-[920px]">
          <p className="mb-3 text-sm text-ink-2">
            Tap a topic to open it. Document categories on this page are indicative and subject to verification.
          </p>
          <DisclosureList
            items={[
              {
                id: "introduction",
                title: "About this service",
                icon: rowIcon(Info),
                content: (
                  <div className="flex flex-col gap-3 type-body">
                    {service.intro.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {service.explainer && (
                      <div className="rounded-[14px] bg-accent-50 p-4 ring-1 ring-accent-100">
                        <h3 className="font-display text-base font-medium text-ink">{service.explainer.title}</h3>
                        {service.explainer.body.map((p) => (
                          <p key={p} className="mt-2">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              },
              { id: "who-its-for", title: "Who this service is for", icon: rowIcon(Users), content: <CheckList items={service.audience} /> },
              {
                id: "what-we-help-with",
                title: `What ${site.name} can help with`,
                icon: rowIcon(HandHelping),
                content: <CheckList items={service.helpsWith} />,
              },
              {
                id: "document-categories",
                title: "Possible document categories",
                icon: rowIcon(FolderOpen),
                content: (
                  <>
                    <CheckList items={service.documentCategories} />
                    <Note>
                      Indicative categories only. The documents you actually need depend on your situation and the current
                      official requirements.
                    </Note>
                  </>
                ),
              },
              {
                id: "service-process",
                title: "How the process works",
                icon: rowIcon(ListOrdered),
                content: (
                  <ol className="stepper stepper-vertical">
                    {service.process.map((step, i) => (
                      <li key={step.title} className="stepper-item">
                        <span className="stepper-num" aria-hidden="true">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-base font-medium text-ink">
                            <span className="sr-only">Step {i + 1}: </span>
                            {step.title}
                          </h3>
                          <p className="type-body mt-0.5">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                id: "what-to-prepare",
                title: "What to have ready",
                icon: rowIcon(ClipboardList),
                content: (
                  <>
                    <CheckList items={service.prepare} />
                    <Note>Please don&apos;t send passport numbers or documents with your enquiry.</Note>
                  </>
                ),
              },
              { id: "whats-included", title: "What is included", icon: rowIcon(PackageCheck), content: <CheckList items={service.included} /> },
              {
                id: "outside-scope",
                title: "What is outside the scope",
                icon: rowIcon(Ban),
                content: (
                  <>
                    <CheckList items={service.outsideScope} variant="cross" />
                    <Note>{independenceStatement}</Note>
                  </>
                ),
              },
              {
                id: "service-faqs",
                title: `${service.title} FAQs`,
                icon: rowIcon(CircleHelp),
                content: <FaqList items={service.faqs} headingLevel="h3" />,
              },
            ]}
          />

          {service.sources.length > 0 && lastChecked && (
            <div className="mt-5">
              <h3 id="official-sources" className="text-sm font-medium text-ink">
                Official sources — checked {formatDate(lastChecked)}
              </h3>
              <ul className="mt-1 flex flex-wrap gap-x-4">
                {service.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-8 items-center gap-1.5 text-sm text-accent-700 underline underline-offset-4"
                    >
                      {source.label}
                      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
                      <span className="sr-only"> (official website, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-xs text-ink-3">
                Requirements can change. Where an official instruction differs from anything on this page, the official
                instruction applies.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 12 · Related services — compact tiles */}
      {related.length > 0 && (
        <section aria-labelledby="related-services" className="pb-[var(--section-y-compact)]">
          <div className="container-site max-w-[920px]">
            <h2 id="related-services" className="type-card-title !text-[1.375rem]">
              Related services
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}/`} className="related-tile">
                    <IconTile name={other.icon} size="sm" />
                    <span className="font-medium text-ink">{other.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 13 · Enquiry CTA (pre-selected form) */}
      <FinalCta
        compact
        title={`Get assistance with ${service.title}`}
        lead="Send a short enquiry with this service pre-selected. A real person will get back to you."
        service={service}
        primaryLabel={ctaLabel}
        primaryHref={primaryHref}
      />

      {/* 14 · Contact options */}
      <section aria-labelledby="contact-options" className="pb-[var(--section-y-compact)]">
        <div className="container-site flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <h2 id="contact-options" className="text-sm font-medium text-ink">
            Other ways to reach us
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            <li>
              <Link href={primaryHref} className="contact-pill">
                <Send aria-hidden="true" className="size-4 text-accent-600" strokeWidth={1.75} />
                Enquiry form
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
                className="contact-pill"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-accent-600" strokeWidth={1.75} />
                WhatsApp
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
            </li>
            {site.contact.email && (
              <li>
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Enquiry — ${service.title}`)}`}
                  data-cta="email"
                  data-cta-location="service-contact"
                  className="contact-pill"
                >
                  <Mail aria-hidden="true" className="size-4 text-accent-600" strokeWidth={1.75} />
                  Email
                </a>
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

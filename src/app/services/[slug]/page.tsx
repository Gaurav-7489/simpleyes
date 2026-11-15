import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ExternalLink, Mail, MessageCircle, Send } from "lucide-react";
import { enquiryHref, getService, mainlyForPhrase, relatedServices, services, type Service } from "@/content/services";
import { site } from "@/content/site";
import { independenceStatement } from "@/content/home";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { revealDelay } from "@/lib/style";
import { DocumentStage } from "@/components/scene/DocumentStage";
import { SceneImage } from "@/components/scene/SceneImage";
import { Breadcrumb } from "@/components/PageHero";
import { DisclosureList } from "@/components/DisclosureList";
import { ProblemPicker } from "@/components/service/ProblemPicker";
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
  return (
    <ul className="check-list" data-variant={variant === "cross" ? "cross" : undefined}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function OfficialSources({ service, lastChecked }: { service: Service; lastChecked: string | undefined }) {
  if (service.sources.length === 0 || !lastChecked) return null;
  return (
    <div className="mt-10 border-t border-line pt-6">
      <h3 id="official-sources" className="text-[0.9375rem] font-medium text-ink">
        Official sources — checked {formatDate(lastChecked)}
      </h3>
      <ul className="mt-2 flex flex-col gap-1">
        {service.sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 text-[0.9375rem] text-accent-700 underline decoration-accent-300 underline-offset-4 hover:decoration-current"
            >
              {source.label}
              <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
              <span className="sr-only"> (official website, opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 max-w-[70ch] text-sm text-ink-3">
        Requirements can change. Where an official instruction differs from anything on this page, the official instruction
        applies.
      </p>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[68ch] border-l-2 border-lime pl-4 text-[0.9375rem] leading-relaxed text-ink-2">{children}</p>;
}

/**
 * A service page: the same information on all eight pages (breadcrumb, H1, introduction, who it is for,
 * situations, how we help, preparation, five steps, scope, FAQs, related services, contact options and a
 * service-specific enquiry), each led by its own 3D document composition.
 */
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

      {/* Hero: name, outcome, the service's composition, and the main action — pick your problem. */}
      <section className="service-hero" data-service={service.scene.kind}>
        <div className="container-site service-hero-grid">
          <div className="service-hero-head">
            <Breadcrumb
              crumbs={[
                { name: "Services", path: "/services/" },
                { name: service.title, path },
              ]}
            />
            <h1 className="type-page-title hero-intro mt-6" style={revealDelay(40)}>
              {service.title}
            </h1>
            <p className="type-lead hero-intro mt-5 max-w-[36rem]" style={revealDelay(100)}>
              {service.outcome}
            </p>
            <p className="hero-intro mt-4 text-[0.9375rem] text-accent-700" style={revealDelay(140)}>
              Mainly for {mainlyForPhrase(service)}
            </p>
          </div>

          <div className="service-hero-stage">
            <DocumentStage scene={service.scene.kind} label={service.scene.label} intro tilt ratio="1 / 0.84" />
          </div>

          <div id="choose-problem" className="service-hero-picker scroll-mt-[calc(var(--header-h)+16px)]">
            <h2 className="type-card-title">What do you need help with?</h2>
            <p className="mt-1.5 text-[0.9375rem] text-ink-2">Choose the situation closest to yours. It is filled in for you on the next page.</p>
            <div className="mt-5">
              <ProblemPicker slug={service.slug} title={service.title} issues={service.issues} corporate={corporate} />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction, in plain language. */}
      <section aria-labelledby="about-service" className="section-tight">
        <div className="container-site service-split">
          <h2 id="about-service" className="type-h2 max-w-[12ch]">
            About this service
          </h2>
          <div>
            <div className="flex max-w-[66ch] flex-col gap-4 text-[1.0625rem] leading-relaxed text-ink-2">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {service.explainer && (
              <div className="explainer vellum mt-8">
                <h3 className="type-card-title">{service.explainer.title}</h3>
                {service.explainer.body.map((p) => (
                  <p key={p} className="mt-3 max-w-[64ch] text-[0.9875rem] leading-relaxed text-ink-2">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Common situations, in the customer's own words. */}
      <section aria-labelledby="situations" className="section-tight">
        <div className="container-site">
          <h2 id="situations" className="type-h2 max-w-[16ch]">
            Sound familiar?
          </h2>
          <ul className="situations mt-10">
            {service.situations.map((s) => (
              <li key={s.situation} className="situation">
                <p className="situation-quote">{s.situation}</p>
                <p className="situation-answer">{s.howWeHelp}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Details: tap to open (server-rendered, crawlable, visible without JavaScript). */}
      <section aria-label={`${service.title} details`} className="section-tight">
        <div className="container-site service-split">
          <div>
            <p className="max-w-[28ch] font-display text-[1.375rem] font-light leading-snug tracking-[-0.015em] text-ink">
              The details, when you need them.
            </p>
            <p className="mt-3 max-w-[32ch] text-[0.9375rem] text-ink-2">
              Tap a topic to open it. Document categories are indicative and subject to verification.
            </p>
          </div>
          <DisclosureList
            items={[
              { id: "who-its-for", title: "Who this service is for", content: <CheckList items={service.audience} /> },
              { id: "what-we-help-with", title: `What ${site.name} can help with`, content: <CheckList items={service.helpsWith} /> },
              {
                id: "document-categories",
                title: "Possible document categories",
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
                id: "what-to-prepare",
                title: "What to have ready",
                content: (
                  <>
                    <CheckList items={service.prepare} />
                    <Note>Please don&apos;t send passport numbers or documents with your enquiry.</Note>
                  </>
                ),
              },
            ]}
          />
          <div className="lg:col-start-2">
            <Link href={primaryHref} data-cta-location="service-mid" className="btn btn-dark">
              <span className="btn-face">Get Assistance With This Service</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The five steps, phrased for this service. */}
      <section aria-labelledby="service-process" className="section-tight">
        <div className="container-site">
          <h2 id="service-process" className="type-h2 max-w-[16ch]">
            How the process works
          </h2>
          <ol className="process-rail mt-10">
            {service.process.map((step, i) => (
              <li key={step.title} className="process-rail-item">
                <span className="process-rail-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="process-rail-title">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="process-rail-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scope and limitations. */}
      <section aria-labelledby="scope" className="section-tight">
        <div className="container-site">
          <h2 id="scope" className="type-h2 max-w-[18ch]">
            Scope and limitations
          </h2>
          <div className="scope-grid mt-10">
            <div className="scope-col paper">
              <h3 className="type-card-title">What is included</h3>
              <div className="mt-5">
                <CheckList items={service.included} />
              </div>
            </div>
            <div className="scope-col scope-col-out">
              <h3 className="type-card-title">What is outside the scope</h3>
              <div className="mt-5">
                <CheckList items={service.outsideScope} variant="cross" />
              </div>
              <Note>{independenceStatement}</Note>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs and official sources. */}
      <section aria-labelledby="service-faqs" className="section-tight">
        <div className="container-site service-split">
          <h2 id="service-faqs" className="type-h2 max-w-[12ch]">
            {service.title} FAQs
          </h2>
          <div>
            <FaqList items={service.faqs} />
            <OfficialSources service={service} lastChecked={lastChecked} />
          </div>
        </div>
      </section>

      {/* Related services. */}
      {related.length > 0 && (
        <section aria-labelledby="related-services" className="section-tight">
          <div className="container-site">
            <h2 id="related-services" className="type-h2">
              Related services
            </h2>
            <ul className="related-grid mt-8">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}/`} className="related-card">
                    <span className="related-card-stage" aria-hidden="true">
                      <SceneImage scene={other.scene.kind} alt="" sizes="(min-width: 768px) 400px, 100vw" />
                    </span>
                    <span className="related-card-title">{other.title}</span>
                    <span className="related-card-summary">{other.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Service-specific enquiry (pre-selected form). */}
      <FinalCta
        compact
        title={`Get assistance with ${service.title}`}
        lead="Send a short enquiry with this service pre-selected. A real person will get back to you."
        service={service}
        primaryLabel="Get Assistance With This Service"
        primaryHref={primaryHref}
      />

      {/* Contact options. */}
      <section aria-labelledby="contact-options" className="pb-[var(--section-y-compact)]">
        <div className="container-site flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <h2 id="contact-options" className="text-[0.9375rem] font-medium text-ink">
            Other ways to reach us
          </h2>
          <ul className="flex flex-wrap gap-2">
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
          serviceJsonLd({ name: service.title, description: service.intro.join(" "), path, slug: service.slug, issues: service.issues }),
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

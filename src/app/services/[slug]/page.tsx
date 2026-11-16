import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getService, services } from "@/content/services";
import { servicePages } from "@/content/service-pages";
import { getGuide, guidePath, type Guide } from "@/content/guides";
import { videos } from "@/content/videos";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd, videoJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { Breadcrumb } from "@/components/PageHero";
import { AssistSidebar } from "@/components/redesign/AssistCards";
import { CheckBox, Eyebrow, MissionChips } from "@/components/redesign/bits";
import { VideoPlayer } from "@/components/redesign/VideoPlayer";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackServiceView } from "@/components/analytics/TrackServiceView";
import { ProblemPicker } from "@/components/service/ProblemPicker";

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
    title: `${service.seoTitle} | ${site.name}`,
    absoluteTitle: true,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

const included = ["Document checking", "Form filling", "Photo help, no studio visit needed"];

/**
 * Service page (redesign, Nov 2026): breadcrumb, eyebrow, H1 and lead with WhatsApp and appointment actions;
 * "We help with" cards beside the appointment / emergency / included sidebar; the video; the documents
 * usually needed; FAQs; related guides.
 */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  const page = servicePages[slug];
  if (!service || !page) notFound();

  const path = `/services/${service.slug}/`;
  const video = page.video ? videos[page.video.key] : undefined;
  const related = page.relatedGuides.map(getGuide).filter((g): g is Guide => g !== undefined);

  return (
    <>
      <TrackServiceView name={service.title} />

      <section className="rd-page-hero" aria-labelledby="service-title">
        <div className="container-site">
          <Breadcrumb
            crumbs={[
              { name: "Services", path: "/services/" },
              { name: service.title, path },
            ]}
          />
          <Eyebrow className="mt-7">{service.title}</Eyebrow>
          <h1 id="service-title" className="rd-page-title hero-intro">
            {page.h1}
          </h1>
          <p className="rd-page-lead hero-intro">{page.lead}</p>
          <div className="hero-intro mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappHref(service)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              data-cta="whatsapp"
              data-cta-location="service-hero"
              data-topic={service.slug}
            >
              <span className="btn-face">
                Get help on WhatsApp
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </span>
            </a>
            <Link href="/appointments/" className="btn btn-light" data-cta-location="service-hero">
              <span className="btn-face">Book an appointment</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container-site service-layout">
        <div className="service-main">
          <section aria-labelledby="help-with">
            <h2 id="help-with" className="rd-h3">
              We help with
            </h2>
            <ul className="help-grid">
              {page.helpCards.map((card) => (
                <li key={card.title} className="help-card" data-tone={card.urgent ? "urgent" : undefined}>
                  <h3 className="help-card-title">{card.title}</h3>
                  <p className="help-card-body">{card.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {video && page.video && (
            <section aria-labelledby="service-video" className="mt-14">
              <h2 id="service-video" className="rd-h3">
                {page.video.heading}
              </h2>
              <div className="mt-7">
                <VideoPlayer video={video} />
              </div>
            </section>
          )}

          <section aria-labelledby="service-documents" className="mt-14">
            <h2 id="service-documents" className="rd-h3">
              {page.documents.heading}
            </h2>
            <ul className="doc-list">
              {page.documents.items.map((item) => (
                <li key={item}>
                  <CheckBox />
                  {item}
                </li>
              ))}
            </ul>
            <p className="rd-note mt-7">
              Requirements differ between missions and can change. We check the current list for your mission before you
              submit.
            </p>
          </section>

          <section aria-labelledby="choose-problem-title" id="choose-problem" className="mt-14 scroll-mt-[calc(var(--header-h)+16px)]">
            <h2 id="choose-problem-title" className="rd-h3">
              What do you need help with?
            </h2>
            <p className="mt-3 text-[0.9375rem] text-ink-2">Choose the situation closest to yours. It is filled in for you on the next page.</p>
            <div className="side-card mt-6">
              <ProblemPicker slug={service.slug} title={service.title} issues={service.issues} />
            </div>
          </section>

          <section aria-labelledby="service-faqs" className="mt-14">
            <h2 id="service-faqs" className="rd-h3">
              {service.title}: questions
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="rd-faq">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <AssistSidebar included={included} />
      </div>

      <section aria-labelledby="related-guides" className="rd-section-compact rd-band rd-band-end mt-16">
        <div className="container-site">
          <Eyebrow>
            <span id="related-guides">Related guides</span>
          </Eyebrow>
          <ul className="related-guides">
            {related.map((guide) => (
              <li key={guide.slug}>
                <Link href={guidePath(guide)} className="related-guide">
                  {guide.title} <ArrowRight aria-hidden="true" className="inline size-4" strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
          <MissionChips />
        </div>
      </section>

      <JsonLd
        data={[
          serviceJsonLd({ name: service.title, description: `${page.lead} ${service.intro.join(" ")}`, path, slug: service.slug, issues: service.issues }),
          breadcrumbJsonLd([
            { name: "Services", path: "/services/" },
            { name: service.title, path },
          ]),
          faqJsonLd(service.faqs),
          ...(video ? videoJsonLd([video]) : []),
        ]}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guidePath, guides } from "@/content/guides";
import { getService } from "@/content/services";
import { videos } from "@/content/videos";
import { withBrand, breadcrumbJsonLd, guideJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { AssistSidebar } from "@/components/redesign/AssistCards";
import { Eyebrow, GuideCard, MissionChips } from "@/components/redesign/bits";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { VideoPlayer } from "@/components/redesign/VideoPlayer";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({ title: withBrand(guide.seoTitle), absoluteTitle: true, description: guide.metaDescription, path: guidePath(guide) });
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const service = getService(guide.service);
  const video = guide.video ? videos[guide.video] : undefined;
  const path = guidePath(guide);
  const more = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <RdPageHero
        crumbs={[
          { name: "Guides", path: "/guides/" },
          { name: guide.title, path },
        ]}
        eyebrow={`${guide.kind} · ${guide.time}`}
        title={guide.title}
        lead={guide.summary}
      >
        <a
          href={whatsappHref(service)}
          target="_blank"
          rel="noopener noreferrer"
          className={guide.kind === "Emergency" ? "btn btn-urgent" : "btn btn-dark"}
          data-cta="whatsapp"
          data-cta-location="guide-hero"
          data-topic={service?.slug ?? "general"}
        >
          <span className="btn-face">
            Get help on WhatsApp
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </span>
        </a>
        {service && (
          <Link href={`/services/${service.slug}/`} className="btn btn-light" data-cta-location="guide-hero">
            <span className="btn-face">{service.title}</span>
          </Link>
        )}
      </RdPageHero>

      <div className="container-site service-layout">
        <article className="service-main">
          {video && (
            <div className="mb-12">
              <VideoPlayer video={video} />
            </div>
          )}
          <h2 className="rd-h3">Step by step</h2>
          <ol className="guide-steps">
            {guide.steps.map((step, i) => (
              <li key={step.title}>
                <span className="steps-num" data-first={i === 0 ? "" : undefined} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="help-card-title">{step.title}</h3>
                  <p className="help-card-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="rd-note mt-8">
            Requirements differ between missions and can change. The official instructions of your mission always apply. We check
            the current list for your mission before you submit.
          </p>
        </article>
        <AssistSidebar included={["Document checking", "Form filling", "Photo help, no studio visit needed"]} />
      </div>

      <section aria-labelledby="more-guides" className="rd-section-compact rd-band rd-band-end mt-16">
        <div className="container-site">
          <Eyebrow>
            <span id="more-guides">More guides</span>
          </Eyebrow>
          <ul className="guide-grid guide-grid-3 mt-6">
            {more.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
          <MissionChips />
        </div>
      </section>

      <FinalCta compact service={service} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Guides", path: "/guides/" },
            { name: guide.title, path },
          ]),
          guideJsonLd({ ...guide, path }, video),
        ]}
      />
    </>
  );
}

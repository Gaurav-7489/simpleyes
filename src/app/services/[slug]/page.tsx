import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { enquiryHref, getService, OTHER_ISSUE, services, type Service } from "@/content/services";
import { site } from "@/content/site";
import { includedWithEveryService } from "@/content/home";
import { getVideo } from "@/content/videos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { appointmentWhatsappMessage, urgentWhatsappMessage, whatsappHref, whatsappHrefForMessage } from "@/lib/whatsapp";
import { revealDelay } from "@/lib/style";
import { Breadcrumb } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { VideoTile } from "@/components/video/VideoTile";
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
  return pageMetadata({
    title: `${service.seoTitle} | ${site.name}`,
    absoluteTitle: true,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function OfficialSources({ service }: { service: Service }) {
  const lastChecked = service.sources.map((s) => s.verifiedOn).sort().at(-1);
  if (service.sources.length === 0 || !lastChecked) return null;
  return (
    <div className="mt-8 border-t border-line pt-6">
      <h3 id="official-sources" className="text-[0.875rem] font-medium text-ink">
        Official sources — checked {formatDate(lastChecked)}
      </h3>
      <ul className="mt-2 flex flex-col gap-1">
        {service.sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 text-[0.875rem] text-accent-700 underline decoration-accent-300 underline-offset-4 hover:decoration-current"
            >
              {source.label}
              <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
              <span className="sr-only"> (official website, opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A service page (Nov 2026 redesign): breadcrumb and heading, what we help with (each card opens the enquiry with
 * that problem chosen), the appointment / emergency / included sidebar, the service's video, the usual documents,
 * FAQs with official sources, related video guides and the service-specific enquiry.
 */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const [mainVideoId, ...relatedIds] = service.guides;
  const mainVideo = mainVideoId ? getVideo(mainVideoId) : undefined;
  const relatedVideos = relatedIds.map(getVideo).filter((v) => v !== undefined);
  const urgentHref = whatsappHrefForMessage(urgentWhatsappMessage);

  return (
    <>
      <TrackServiceView name={service.title} />

      <section className="svc2-hero">
        <div className="container-site">
          <Breadcrumb
            crumbs={[
              { name: "Services", path: "/services/" },
              { name: service.title, path },
            ]}
          />
          <p className="eyebrow hero-intro mt-6">{service.title}</p>
          <h1 className="svc2-title hero-intro" style={revealDelay(40)}>
            {service.heroTitle}
          </h1>
          <p className="svc2-lead hero-intro" style={revealDelay(100)}>
            {service.heroLead}
          </p>
          <div className="hero-intro mt-7 flex flex-col gap-3 sm:flex-row" style={revealDelay(160)}>
            <a
              href={whatsappHref(service)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-cta-location="service-hero"
              data-topic={service.slug}
              className="btn btn-dark"
            >
              <span className="btn-face">
                Get help on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
            <Link href="/appointments/" className="btn btn-light" data-cta-location="service-hero">
              <span className="btn-face">Book an appointment</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container-site svc2-grid">
        <div className="svc2-main">
          <section aria-labelledby="we-help-with">
            <h2 id="we-help-with" className="svc2-h2">
              We help with
            </h2>
            <ul className="issue-cards mt-6">
              {service.issues.map((issue) => (
                <li key={issue.id}>
                  <Link
                    href={enquiryHref(service, undefined, issue.id)}
                    className="issue-card"
                    data-urgent={issue.urgent ? "" : undefined}
                    data-cta-location="service-issues"
                  >
                    <span className="issue-card-title">{issue.label}</span>
                    {issue.body && <span className="issue-card-body">{issue.body}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.875rem] text-ink-2">
              Something else?{" "}
              <Link href={enquiryHref(service, undefined, OTHER_ISSUE)} className="link-inline" data-cta-location="service-issues">
                Describe your situation
              </Link>{" "}
              and we tell you the route.
            </p>
          </section>

          {mainVideo && (
            <section aria-labelledby="service-video" className="mt-14">
              <h2 id="service-video" className="svc2-h2">
                Watch: {mainVideo.title}
              </h2>
              <div className="mt-6">
                <VideoTile video={mainVideo} size="feature" location="service-video" />
              </div>
            </section>
          )}

          {service.documents && (
            <section aria-labelledby="service-documents" className="mt-14">
              <h2 id="service-documents" className="svc2-h2">
                {service.documents.title}
              </h2>
              <ul className="doc-list mt-6">
                {service.documents.items.map((item) => (
                  <li key={item}>
                    <span className="tick" aria-hidden="true">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="svc2-note">
                Requirements differ between missions and can change. We check the current list for your mission before you
                submit.
              </p>
            </section>
          )}

          <section aria-labelledby="service-faqs" className="mt-14">
            <h2 id="service-faqs" className="svc2-h2">
              {service.title} FAQs
            </h2>
            <div className="mt-4">
              <FaqList items={service.faqs} />
            </div>
            <OfficialSources service={service} />
          </section>
        </div>

        <aside className="svc2-aside" aria-label="Appointments, emergencies and what is included">
          <div className="side-card">
            <h2 className="side-card-title">Appointment booking</h2>
            <p className="side-card-body">
              We help you book your appointment at the Embassy, Consulate or application centre, with a checklist for the
              day.
            </p>
            <a
              href={whatsappHrefForMessage(appointmentWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-cta-location="service-aside"
              data-topic="appointment"
              className="btn btn-dark mt-5 w-full"
            >
              <span className="btn-face w-full">
                Book with us<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </span>
            </a>
          </div>

          <div className="side-card" data-urgent="">
            <h2 className="side-card-title">Emergency assistance</h2>
            <p className="side-card-body">
              Lost passport or urgent travel to India? Message us first. We help with the Emergency Certificate and your new
              passport.
            </p>
            <a
              href={urgentHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-cta-location="service-aside"
              data-topic="urgent"
              className="btn btn-urgent mt-5 w-full"
            >
              <span className="btn-face w-full">
                Message URGENT<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </span>
            </a>
          </div>

          <div className="side-card">
            <p className="eyebrow">Also included</p>
            <ul className="mt-4 flex flex-col gap-3">
              {includedWithEveryService
                .filter((item) => !item.urgent && item.title !== "Appointment booking")
                .map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                    <span className="tick mt-px" aria-hidden="true">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item.title === "Photo help" ? "Photo help, no studio visit needed" : item.title}
                  </li>
                ))}
            </ul>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-2">
              Official fees are paid to the mission. Our service fee is agreed before we start.
            </p>
          </div>
        </aside>
      </div>

      {relatedVideos.length > 0 && (
        <section aria-labelledby="related-guides" className="svc2-related">
          <div className="container-site">
            <h2 id="related-guides" className="eyebrow">
              Related guides
            </h2>
            <ul className="related-guides mt-5">
              {relatedVideos.map((video) => (
                <li key={video.id}>
                  <Link href={`/guides/#${video.id}`} className="related-guide">
                    {video.title}
                    <ArrowRight aria-hidden="true" className="ml-1 inline size-4" strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        compact
        title={`Get help with ${service.title}`}
        lead="Tell us your situation and city. We reply with the exact documents and the next step."
        service={service}
        primaryLabel="Get Assistance With This Service"
        primaryHref={enquiryHref(service)}
      />

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

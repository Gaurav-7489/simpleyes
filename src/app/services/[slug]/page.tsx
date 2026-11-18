import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseMedical, Check, Home, MapPinned, X } from "lucide-react";
import { enquiryHref, getService, OTHER_ISSUE, services, type AsideCard, type HelpGroup, type Service } from "@/content/services";
import { site } from "@/content/site";
import { getVideo } from "@/content/videos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { appointmentWhatsappMessage, urgentWhatsappMessage, whatsappHref, whatsappHrefForMessage } from "@/lib/whatsapp";
import { revealDelay } from "@/lib/style";
import { Breadcrumb } from "@/components/PageHero";
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

function Tick({ urgent = false }: { urgent?: boolean }) {
  return (
    <span className="tick mt-px" data-urgent={urgent ? "" : undefined} aria-hidden="true">
      <Check className="size-3" strokeWidth={3} />
    </span>
  );
}

function WhatsAppButton({ href, label, variant, topic, location }: { href: string; label: string; variant: string; topic: string; location: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location={location} data-topic={topic} className={`btn ${variant} mt-5 w-full`}>
      <span className="btn-face w-full">
        {label}
        <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
      </span>
    </a>
  );
}

/** One sidebar card. */
function Aside({ card, service }: { card: AsideCard; service: Service }) {
  switch (card.kind) {
    case "appointment":
      return (
        <div className="side-card">
          <h2 className="side-card-title">{card.title ?? "Appointment booking"}</h2>
          <p className="side-card-body">{card.body}</p>
          <WhatsAppButton href={whatsappHrefForMessage(appointmentWhatsappMessage)} label="Book with us" variant="btn-dark" topic="appointment" location="service-aside" />
        </div>
      );
    case "emergency":
      return (
        <div className="side-card" data-urgent="">
          <h2 className="side-card-title">Emergency assistance</h2>
          <p className="side-card-body">
            Lost passport or urgent travel to India? Message us first. We help with the Emergency Certificate and your new
            passport.
          </p>
          <WhatsAppButton href={whatsappHrefForMessage(urgentWhatsappMessage)} label="Message URGENT" variant="btn-urgent" topic="urgent" location="service-aside" />
        </div>
      );
    case "ask":
      return (
        <div className="side-card">
          <h2 className="side-card-title">{card.title}</h2>
          <p className="side-card-body">{card.body}</p>
          <WhatsAppButton href={whatsappHref(service)} label="Ask us" variant="btn-dark" topic={service.slug} location="service-aside" />
        </div>
      );
    case "dark":
      return (
        <div className="side-card" data-dark="">
          <h2 className="side-card-title">{card.title}</h2>
          <p className="side-card-body">{card.body}</p>
          <Link href={card.link.href} className="side-card-link" data-cta-location="service-aside">
            {card.link.label}
          </Link>
        </div>
      );
    case "included":
      return (
        <div className="side-card">
          <p className="eyebrow">Also included</p>
          <ul className="mt-4 flex flex-col gap-3">
            {card.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                <Tick />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-2">{card.note}</p>
        </div>
      );
  }
}

const groupIcons: Record<HelpGroup["icon"], typeof Home> = { insurance: BriefcaseMedical, apartment: Home, arrival: MapPinned };

/**
 * A service page, laid out as in the owners' redesign: breadcrumb and heading, what we help with (each card opens the
 * enquiry with that problem chosen), the sidebar cards, the service's video, the usual documents and related guides.
 * New in Germany adds a problem picker beside the heading, topic groups, what is and is not included, and questions.
 */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const video = service.video ? getVideo(service.video.id) : undefined;
  const relatedVideos = service.guides.map(getVideo).filter((v) => v !== undefined);
  const columns = service.issues.some((issue) => issue.kicker) ? 3 : 2;
  const picker = Boolean(service.helpGroups);

  return (
    <>
      <TrackServiceView name={service.title} />

      <section className="svc2-hero">
        <div className={`container-site ${picker ? "svc2-hero-grid" : ""}`}>
          <div>
            <Breadcrumb
              crumbs={[
                { name: "Services", path: "/services/" },
                { name: service.title, path },
              ]}
            />
            <p className="eyebrow hero-intro mt-6">{service.isNew ? "New service" : service.title}</p>
            <h1 className="svc2-title hero-intro" style={revealDelay(40)}>
              {service.heroTitle}
              {service.heroAccent && (
                <>
                  {" "}
                  <span className="text-accent-700">{service.heroAccent}</span>
                </>
              )}
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
                  {picker ? "Ask us on WhatsApp" : "Get help on WhatsApp"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
              {picker ? (
                <a href="#we-help-with" className="btn btn-light">
                  <span className="btn-face">See what we help with</span>
                </a>
              ) : (
                <Link href="/appointments/" className="btn btn-light" data-cta-location="service-hero">
                  <span className="btn-face">Book an appointment</span>
                </Link>
              )}
            </div>
          </div>

          {picker && (
            <nav aria-labelledby="picker-title" className="svc2-picker hero-intro" style={revealDelay(140)}>
              <h2 id="picker-title" className="side-card-title">
                What do you need help with?
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {[...service.issues, { id: OTHER_ISSUE, label: "Something else" }].map((issue) => (
                  <li key={issue.id}>
                    <Link href={enquiryHref(service, undefined, issue.id)} className="picker-option" data-cta-location="service-picker">
                      <span aria-hidden="true" className="picker-dot" />
                      {issue.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      {service.helpGroups ? (
        <NewInGermanyBody service={service} />
      ) : (
        <div className="container-site svc2-grid" data-full={service.aside.length === 0 ? "" : undefined}>
          <div className="svc2-main">
            <section id="we-help-with" aria-labelledby="we-help-with-title" className="scroll-mt-[calc(var(--header-h)+24px)]">
              <h2 id="we-help-with-title" className="svc2-h2">
                We help with
              </h2>
              <ul className="issue-cards mt-6" data-columns={columns}>
                {service.issues.map((issue) => (
                  <li key={issue.id}>
                    <Link
                      href={enquiryHref(service, undefined, issue.id)}
                      className="issue-card"
                      data-urgent={issue.urgent ? "" : undefined}
                      data-cta-location="service-issues"
                    >
                      {issue.kicker && <span className="issue-card-kicker">{issue.kicker}</span>}
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

            {video && service.video && (
              <section aria-labelledby="service-video" className="mt-14">
                <h2 id="service-video" className="svc2-h2">
                  {service.video.heading}
                </h2>
                <div className="mt-6">
                  <VideoTile video={video} size="feature" caption={service.video.caption} location="service-video" />
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
                      <Tick />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="svc2-note">{service.documents.note}</p>
              </section>
            )}
          </div>

          {service.aside.length > 0 && (
            <aside className="svc2-aside" aria-label={`${service.title}: booking and help`}>
              {service.aside.map((card, i) => (
                <Aside key={i} card={card} service={service} />
              ))}
            </aside>
          )}
        </div>
      )}

      {relatedVideos.length > 0 && (
        <section aria-labelledby="related-guides" className="svc2-related">
          <div className="container-site">
            <h2 id="related-guides" className="eyebrow">
              Related guides
            </h2>
            <ul className="related-guides mt-5">
              {relatedVideos.map((v) => (
                <li key={v.id}>
                  <Link href={`/guides/#${v.id}`} className="related-guide">
                    {v.title}
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
        title={service.cta?.title ?? `Get help with ${service.title}`}
        lead={service.cta?.lead ?? "Tell us your situation and city. We reply with the exact documents and the next step."}
        service={service}
        primaryLabel="Get Assistance With This Service"
        primaryHref={enquiryHref(service)}
        whatsappFirst={Boolean(service.cta)}
      />

      <JsonLd
        data={[
          serviceJsonLd({ name: service.title, description: service.heroLead, path, slug: service.slug, issues: service.issues }),
          breadcrumbJsonLd([
            { name: "Services", path: "/services/" },
            { name: service.title, path },
          ]),
          ...(service.faqs.length ? [faqJsonLd(service.faqs)] : []),
        ]}
      />
    </>
  );
}

/** New in Germany: topic groups, included / not included, and questions. */
function NewInGermanyBody({ service }: { service: Service }) {
  return (
    <div className="container-site pb-[var(--section-y-compact)]">
      <section id="we-help-with" aria-labelledby="we-help-with-title" className="scroll-mt-[calc(var(--header-h)+24px)]">
        <h2 id="we-help-with-title" className="svc2-h2">
          We help with
        </h2>
        <ul className="help-groups mt-6">
          {service.helpGroups!.map((group) => {
            const Icon = groupIcons[group.icon];
            return (
              <li key={group.title} className="help-group">
                <span className="help-card-icon" aria-hidden="true">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="help-group-title">{group.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink">
                      <Tick />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {service.scope && (
        <section aria-label="What is and is not included" className="scope2 mt-14">
          <div className="side-card">
            <h2 className="eyebrow">Included</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {service.scope.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="side-card" data-urgent="">
            <h2 className="eyebrow eyebrow-rust">Not included</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {service.scope.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                  <span className="tick mt-px" data-urgent="" aria-hidden="true">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section aria-labelledby="service-questions" className="mt-14">
          <h2 id="service-questions" className="svc2-h2">
            Questions
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="faq-card" open>
                <summary>
                  <h3>{faq.question}</h3>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

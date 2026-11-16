import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getMission, missionPath, missions, type Mission } from "@/content/missions";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { withBrand, breadcrumbJsonLd, faqJsonLd, missionJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappHrefForMessage } from "@/lib/whatsapp";
import { AssistSidebar } from "@/components/redesign/AssistCards";
import { CheckBox, Eyebrow } from "@/components/redesign/bits";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { FaqPreview, FiveSteps } from "@/components/redesign/HomeSections";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return missions.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) return {};
  return pageMetadata({
    title: withBrand(mission.seoTitle),
    absoluteTitle: true,
    description: mission.metaDescription,
    path: missionPath(mission),
    other: {
      "geo.region": mission.region,
      "geo.placename": mission.city,
      "geo.position": `${mission.geo.lat};${mission.geo.lng}`,
      ICBM: `${mission.geo.lat}, ${mission.geo.lng}`,
    },
  });
}

function missionFaqs(mission: Mission) {
  const short = mission.kind === "Embassy" ? `the Indian Embassy in ${mission.city}` : `the Indian Consulate in ${mission.city}`;
  return [
    {
      question: `Which states does the ${mission.name} serve?`,
      answer: `The ${mission.name} serves people living in ${mission.states.slice(0, -1).join(", ")} and ${mission.states.at(-1)}. Applications from other states go to the Embassy in Berlin or another Consulate General.`,
    },
    {
      question: `Can you help me book an appointment at ${short}?`,
      answer: `Yes. We help you book your appointment at the ${mission.name} or its application centre and prepare a checklist of what to bring. The available slots are set by the mission.`,
    },
    {
      question: `Can you help with passport renewal and e-OCI at the ${mission.name}?`,
      answer:
        "Yes. We check your documents, fill in your forms, get your photo upload-ready and help you book your appointment, so your application is complete when you submit it.",
    },
    {
      question: `Is Simplyes the ${mission.name}?`,
      answer: `No. Simplyes is an independent private service and is not part of, or affiliated with, the ${mission.name}. Official processing, fees and decisions stay with the mission. Its official website is ${mission.website.replace(/^https:\/\//, "").replace(/\/$/, "")}.`,
    },
  ];
}

export default async function MissionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) notFound();
  const path = missionPath(mission);
  const faqs = missionFaqs(mission);
  const others = missions.filter((m) => m.slug !== mission.slug);
  const waMessage = `Hello Simplyes, I need help with an application at the ${mission.name}.`;

  return (
    <>
      <RdPageHero
        crumbs={[
          { name: "Indian missions", path: "/missions/" },
          { name: mission.name, path },
        ]}
        eyebrow={`${mission.kind} · ${mission.city}`}
        title={mission.h1}
        lead={mission.lead}
      >
        <a
          href={whatsappHrefForMessage(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark"
          data-cta="whatsapp"
          data-cta-location="mission-hero"
          data-topic={mission.slug}
        >
          <span className="btn-face">
            Get help on WhatsApp
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </span>
        </a>
        <Link href="/appointments/" className="btn btn-light" data-cta-location="mission-hero">
          <span className="btn-face">Book an appointment</span>
        </Link>
      </RdPageHero>

      <div className="container-site service-layout">
        <div className="service-main">
          <p className="mission-disclosure">
            <strong>Independent service.</strong> {site.name} is not the {mission.name} and is not affiliated with it. For official
            information, visit the mission&apos;s own website:{" "}
            <a href={mission.website} target="_blank" rel="noopener noreferrer" className="rd-link inline-flex items-center gap-1">
              {mission.website.replace(/^https:\/\//, "").replace(/\/$/, "")}
              <ExternalLink aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              <span className="sr-only"> (official website, opens in a new tab)</span>
            </a>
          </p>

          <section aria-labelledby="who-applies" className="mt-12">
            <h2 id="who-applies" className="rd-h3">
              Who applies to the {mission.name}
            </h2>
            <p className="mt-4 max-w-[60ch] text-ink-2">
              Indian citizens, OCI holders and visa applicants who live in these federal states:
            </p>
            <ul className="state-chips">
              {mission.states.map((state) => (
                <li key={state} className="chip chip-static">
                  {state}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="mission-services" className="mt-14">
            <h2 id="mission-services" className="rd-h3">
              What we help with for the {mission.city} {mission.kind === "Embassy" ? "Embassy" : "Consulate"}
            </h2>
            <ul className="help-grid">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}/`} className="help-card help-card-link">
                    <h3 className="help-card-title">{service.title}</h3>
                    <p className="help-card-body">{service.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="mission-checklist" className="mt-14">
            <h2 id="mission-checklist" className="rd-h3">
              Before your appointment in {mission.city}
            </h2>
            <ul className="doc-list">
              {[
                `Check that you live in a state the ${mission.city} ${mission.kind === "Embassy" ? "Embassy" : "Consulate"} serves`,
                "Fill in the online form and sign the printout",
                "Photo to the mission's specification, same as uploaded",
                "Originals and copies: passport, residence permit, Meldebescheinigung",
                "Fee payment proof and, where needed, a tracked return envelope",
              ].map((item) => (
                <li key={item}>
                  <CheckBox />
                  {item}
                </li>
              ))}
            </ul>
            <p className="rd-note mt-7">
              Requirements differ between missions and can change. We check the {mission.name}&apos;s current list before you
              submit.
            </p>
          </section>
        </div>
        <AssistSidebar included={["Document checking", "Form filling", "Photo help, no studio visit needed"]} />
      </div>

      <div className="mt-16">
        <FiveSteps withVideo={false} />
      </div>
      <FaqPreview items={faqs} />

      <section aria-labelledby="other-missions" className="rd-section-compact">
        <div className="container-site">
          <Eyebrow>
            <span id="other-missions">Other Indian missions in Germany</span>
          </Eyebrow>
          <ul className="mission-grid">
            {others.map((m) => (
              <li key={m.slug}>
                <Link href={missionPath(m)} className="mission-card">
                  <span className="mission-card-name">{m.name}</span>
                  <span className="mission-card-states">{m.states.join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title={`Applying in ${mission.city}? Let's make it simpler.`}
        lead="Tell us your service and city. We reply with the exact documents and the next step."
      />
      <JsonLd
        data={[
          ...missionJsonLd(mission),
          breadcrumbJsonLd([
            { name: "Indian missions", path: "/missions/" },
            { name: mission.name, path },
          ]),
          faqJsonLd(faqs),
        ]}
      />
    </>
  );
}

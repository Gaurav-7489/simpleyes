import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { missionPath, missions } from "@/content/missions";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappHrefForMessage } from "@/lib/whatsapp";
import { appointmentWhatsappMessage } from "@/components/redesign/AssistCards";
import { CheckRows, Eyebrow } from "@/components/redesign/bits";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { FaqPreview, FiveSteps } from "@/components/redesign/HomeSections";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Indian Embassy & Consulate Appointment Help | Simplyes",
  absoluteTitle: true,
  description:
    "No slots in sight? We help you book your appointment at the Embassy of India in Berlin or the Consulates in Frankfurt, Munich and Hamburg, with a checklist.",
  path: "/appointments/",
});

const faqs = [
  {
    question: "Can you book my consulate appointment?",
    answer:
      "Yes. We help you book your appointment at the Embassy, Consulate or application centre and prepare what you need to bring. The available slots are set by the mission.",
  },
  {
    question: "Which mission do I book with?",
    answer:
      "The one responsible for the federal state you live in: the Embassy in Berlin or the Consulate General in Frankfurt, Munich or Hamburg. We tell you which one applies.",
  },
  {
    question: "Can you get me an earlier appointment?",
    answer: "No one can. Slots are released by the mission. We help you find and book an available slot and make sure nothing is missing on the day.",
  },
  {
    question: "What do I bring on the day?",
    answer: "You receive a checklist for your service and mission: originals, copies, photos, the signed form and the fee payment proof.",
  },
];

export default function AppointmentsPage() {
  return (
    <>
      <RdPageHero
        crumbs={[{ name: "Appointments", path: "/appointments/" }]}
        eyebrow="Appointment booking"
        title="Appointments at the Indian Embassy and Consulates in Germany"
        lead="No slots in sight? We help you book your appointment at the Indian Embassy, Consulate or application centre, and make sure your documents are ready on the day."
      >
        <a
          href={whatsappHrefForMessage(appointmentWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark"
          data-cta="whatsapp"
          data-cta-location="appointments-hero"
          data-topic="appointments"
        >
          <span className="btn-face">
            Book with us on WhatsApp
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </span>
        </a>
        <Link href="/contact/" className="btn btn-light" data-cta-location="appointments-hero">
          <span className="btn-face">Get Assistance</span>
        </Link>
      </RdPageHero>

      <section aria-labelledby="appointment-help" className="rd-section-compact">
        <div className="container-site rd-why-grid">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 id="appointment-help" className="rd-h2 mt-5">
              The right mission, a booked slot and a checklist for the day
            </h2>
            <p className="mt-6 max-w-[34rem] text-ink-2">
              Appointments are for passports, e-OCI, visa and attestation. Each mission serves particular federal states, and
              each asks for its own documents. We sort out both before you go.
            </p>
          </div>
          <div className="why-card">
            <CheckRows
              items={[
                { title: "Passport, e-OCI, visa and attestation", body: "Every service that needs an appointment." },
                { title: "Berlin, Frankfurt, Munich and Hamburg", body: "The mission responsible for where you live." },
                { title: "A checklist of what to bring", body: "Originals, copies, photos, signed form and fee proof." },
                { title: "Documents checked beforehand", body: "So you are not sent home for a missing page." },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="which-mission" className="rd-section rd-band">
        <div className="container-site">
          <Eyebrow>Which mission?</Eyebrow>
          <h2 id="which-mission" className="rd-h2 mt-5">
            Book with the mission for your federal state
          </h2>
          <ul className="mission-grid">
            {missions.map((mission) => (
              <li key={mission.slug}>
                <Link href={missionPath(mission)} className="mission-card">
                  <span className="mission-card-name">{mission.name}</span>
                  <span className="mission-card-states">{mission.states.join(", ")}</span>
                  <span className="rd-link mt-auto pt-4">Help with this mission →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="rd-note mt-8">
            {site.name} is independent and books appointments through the missions&apos; own systems. Available slots are set by the
            mission.
          </p>
        </div>
      </section>

      <FiveSteps withVideo={false} />
      <FaqPreview items={faqs} />
      <FinalCta />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Appointments", path: "/appointments/" }]), faqJsonLd(faqs)]} />
    </>
  );
}

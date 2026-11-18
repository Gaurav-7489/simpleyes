import type { Metadata } from "next";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { missions } from "@/content/home";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { appointmentWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Indian Embassy & Consulate Appointment Help | ${site.name}`,
  absoluteTitle: true,
  description:
    "Help booking your appointment at the Indian Embassy in Berlin, the Consulates in Frankfurt, Munich and Hamburg or the application centre, with a checklist for the day.",
  path: "/appointments/",
});

const steps = [
  { title: "Tell us your service and city", body: "Passport, e-OCI, visa or attestation, and where you live in Germany." },
  { title: "We prepare your application", body: "Forms, photo and documents checked before anything is booked." },
  { title: "We help you book the slot", body: "At the Embassy, Consulate or application centre that serves your area." },
  { title: "You go with a checklist", body: "Exactly what to bring on the day, so nothing is sent back." },
];

const faqs = [
  {
    question: "Can you book my consulate appointment?",
    answer:
      "Yes. We help you book your appointment at the Embassy, Consulate or application centre and prepare what you need to bring. The available slots are set by the mission.",
  },
  {
    question: "Do you attend the appointment for me?",
    answer: "No. You attend in person. We make sure your documents are complete and give you a checklist for the day.",
  },
  {
    question: "Can you get me an earlier slot?",
    answer: "No one can create slots. We help you find and book what the mission has available, and prepare you so you need only one visit.",
  },
];

/** Appointment booking: how we help book at the Embassy, Consulates or application centre. */
export default function AppointmentsPage() {
  const href = whatsappHrefForMessage(appointmentWhatsappMessage);
  return (
    <>
      <PageHero
        title="Appointment booking"
        lead="No slots in sight? We help you book your appointment at the Indian Embassy, Consulate or application centre, and make sure your documents are ready on the day."
        crumbs={[{ name: "Appointment booking", path: "/appointments/" }]}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="appointments-hero" data-topic="appointment" className="btn btn-dark">
          <span className="btn-face">
            <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Book with us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>
        <Link href="/contact/" className="btn btn-light" data-cta-location="appointments-hero">
          <span className="btn-face">Send an enquiry</span>
        </Link>
      </PageHero>

      <section aria-labelledby="appt-how" className="pb-[var(--section-y-compact)]">
        <div className="container-site">
          <h2 id="appt-how" className="svc2-h2">
            How it works
          </h2>
          <ol className="issue-cards mt-6">
            {steps.map((step, i) => (
              <li key={step.title} className="issue-card">
                <span className="issue-card-title">
                  {i + 1}. {step.title}
                </span>
                <span className="issue-card-body">{step.body}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="svc2-h2">What we book for</h2>
              <ul className="tick-list mt-5">
                {["Passport renewal, lost passport and PCC", "e-OCI and visa", "Attestation and affidavits", "Surrender certificate"].map((item) => (
                  <li key={item}>
                    <span className="tick" aria-hidden="true">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="svc2-h2">Where</h2>
              <ul className="tick-list mt-5">
                {missions.map((item) => (
                  <li key={item}>
                    <span className="tick" aria-hidden="true">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="svc2-note">The mission that serves you depends on where you live in Germany. We tell you which one.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="appt-faqs" className="pb-[var(--section-y-compact)]">
        <div className="container-site faq2-grid">
          <h2 id="appt-faqs" className="svc2-h2">
            Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-card" open>
                <summary>
                  <h3>{faq.question}</h3>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta compact />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Appointment booking", path: "/appointments/" }]), faqJsonLd(faqs)]} />
    </>
  );
}

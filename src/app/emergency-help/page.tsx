import type { Metadata } from "next";
import Link from "next/link";
import { getGuide } from "@/content/guides";
import { videos } from "@/content/videos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, videoJsonLd } from "@/lib/seo";
import { UrgentButton } from "@/components/redesign/AssistCards";
import { Eyebrow, GuideCard } from "@/components/redesign/bits";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { FaqPreview } from "@/components/redesign/HomeSections";
import { VideoPlayer } from "@/components/redesign/VideoPlayer";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Lost Indian Passport in Germany? Urgent Help | Simplyes",
  absoluteTitle: true,
  description:
    "Lost or stolen Indian passport in Germany, or urgent travel to India? WhatsApp us with URGENT: police report, affidavits, Emergency Certificate, urgent visas.",
  path: "/emergency-help/",
});

const situations = [
  {
    title: "Lost or stolen passport",
    body: "Report it to the police first. We prepare the affidavits and documents for your new passport.",
  },
  {
    title: "Emergency Certificate",
    body: "A one-way travel document for urgent travel to India when there is no time for a new passport.",
  },
  {
    title: "Urgent visa for family members",
    body: "A foreign spouse or relative needs to travel to India now, for a family emergency.",
  },
  {
    title: "Damaged passport before a trip",
    body: "Water damage, torn pages or a broken cover. We tell you whether it can still be used and what to do.",
  },
];

const faqs = [
  {
    question: "I lost my passport and need to fly to India. What now?",
    answer:
      "Report it to the police, then WhatsApp us with URGENT. We help with the Emergency Certificate and the documents for your new passport.",
  },
  {
    question: "What is an Emergency Certificate?",
    answer: "A one-way travel document to India, issued by the mission when you cannot wait for a new passport.",
  },
  {
    question: "Can you speed up my application?",
    answer: "No. Processing is with the mission. We make sure your application is complete and correct the first time, which avoids delays.",
  },
  {
    question: "Are you part of the Embassy or a Consulate?",
    answer: "No. Simplyes is an independent service. Decisions on every application remain with the authorities.",
  },
];

export default function EmergencyHelpPage() {
  const lost = getGuide("lost-indian-passport-in-germany");
  return (
    <>
      <RdPageHero
        crumbs={[{ name: "Emergency help", path: "/emergency-help/" }]}
        eyebrow="Emergency assistance"
        title="Lost your passport or need to travel to India urgently?"
        lead="Message us first. We tell you the correct route and prepare your papers. Start your WhatsApp message with URGENT."
      >
        <UrgentButton location="emergency-hero" />
        <Link href="/contact/" className="btn btn-light" data-cta-location="emergency-hero">
          <span className="btn-face">Get Assistance</span>
        </Link>
      </RdPageHero>

      <section aria-labelledby="emergency-situations" className="rd-section-compact">
        <div className="container-site">
          <h2 id="emergency-situations" className="rd-h3">
            We help with
          </h2>
          <ul className="help-grid help-grid-4">
            {situations.map((s) => (
              <li key={s.title} className="help-card" data-tone="urgent">
                <h3 className="help-card-title">{s.title}</h3>
                <p className="help-card-body">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="emergency-steps" className="rd-section rd-band">
        <div className="container-site rd-why-grid">
          <div>
            <Eyebrow>Lost passport, step by step</Eyebrow>
            <h2 id="emergency-steps" className="rd-h2 mt-5">
              Police report first, then the right travel document
            </h2>
            <ol className="num-list mt-8">
              {lost?.steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}.</strong> {step.body}
                </li>
              ))}
            </ol>
            {lost && (
              <div className="mt-8 max-w-[22rem]">
                <GuideCard guide={lost} />
              </div>
            )}
          </div>
          <div>
            <VideoPlayer video={videos["lost-passport"]} />
          </div>
        </div>
      </section>

      <FaqPreview items={faqs} />
      <FinalCta title="Urgent? Message us first." lead="Start your WhatsApp message with URGENT and tell us your city and travel date." />
      <JsonLd
        data={[breadcrumbJsonLd([{ name: "Emergency help", path: "/emergency-help/" }]), faqJsonLd(faqs), ...videoJsonLd([videos["lost-passport"]])]}
      />
    </>
  );
}

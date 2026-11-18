import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { getVideo } from "@/content/videos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { urgentWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { VideoTile } from "@/components/video/VideoTile";

export const metadata: Metadata = pageMetadata({
  title: `Lost Indian Passport & Emergency Help | ${site.name}`,
  absoluteTitle: true,
  description:
    "Lost or stolen Indian passport, an Emergency Certificate for urgent travel to India or an urgent visa for family: WhatsApp SimplYes and start with URGENT.",
  path: "/emergency/",
});

const situations = [
  {
    title: "Lost or stolen passport",
    body: "Report it to the police first. We prepare the Annexure F and L affidavits and the documents for your new passport.",
  },
  { title: "Emergency Certificate", body: "A one-way travel document for urgent travel to India when you have no valid passport." },
  { title: "Urgent visa for family", body: "A family emergency in India and a spouse or child who needs a visa quickly." },
  { title: "Damaged passport", body: "Pages torn or water-damaged before a trip. We tell you whether it can still be used and what to apply for." },
];

const faqs = [
  {
    question: "I lost my passport and need to fly to India. What now?",
    answer:
      "Report it to the police, then WhatsApp us with URGENT. We help with the Emergency Certificate and the documents for your new passport.",
  },
  {
    question: "Can you guarantee I travel on a certain date?",
    answer: "No. Decisions and processing times stay with the mission. We make sure your application is complete so nothing slows it down.",
  },
];

/** Emergency help: the urgent WhatsApp route and what we do in each situation. */
export default function EmergencyPage() {
  const href = whatsappHrefForMessage(urgentWhatsappMessage);
  const video = getVideo("K_c2qhg5PSo")!;
  return (
    <>
      <PageHero
        title="Emergency help"
        lead="Lost passport, a family emergency or urgent travel to India? Message us first. We tell you the correct route and prepare your papers."
        crumbs={[{ name: "Emergency help", path: "/emergency/" }]}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="emergency-hero" data-topic="urgent" className="btn btn-urgent">
          <span className="btn-face">
            Message URGENT on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>
        <Link href="/services/passport-services/" className="btn btn-light" data-cta-location="emergency-hero">
          <span className="btn-face">Passport Services</span>
        </Link>
      </PageHero>

      <section aria-labelledby="emergency-situations" className="pb-[var(--section-y-compact)]">
        <div className="container-site">
          <h2 id="emergency-situations" className="svc2-h2">
            We help with
          </h2>
          <ul className="issue-cards mt-6">
            {situations.map((s) => (
              <li key={s.title} className="issue-card" data-urgent="">
                <span className="issue-card-title">{s.title}</span>
                <span className="issue-card-body">{s.body}</span>
              </li>
            ))}
          </ul>
          <p className="svc2-note">
            Start your WhatsApp message with URGENT and your city. Please don&apos;t send passport numbers or document
            copies until we have agreed what is needed.
          </p>

          <div className="mt-12 max-w-[760px]">
            <h2 className="svc2-h2">Watch: {video.title}</h2>
            <div className="mt-6">
              <VideoTile video={video} size="feature" location="emergency-video" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="emergency-faqs" className="pb-[var(--section-y-compact)]">
        <div className="container-site faq2-grid">
          <h2 id="emergency-faqs" className="svc2-h2">
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
      <JsonLd data={[breadcrumbJsonLd([{ name: "Emergency help", path: "/emergency/" }]), faqJsonLd(faqs)]} />
    </>
  );
}

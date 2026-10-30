import type { Metadata } from "next";
import { journeySteps } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { StepCard } from "@/components/home/Process";
import { CardFrame } from "@/components/ui/CardFrame";
import { WhatsAppButton } from "@/components/ui/Button";
import { PrivacyCard } from "@/components/PrivacyCard";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "How It Works — from your question to a prepared application",
  description: `How ${site.name} works: choose a service, explain your requirement on WhatsApp, receive personalised guidance, prepare your documents, with human follow-up.`,
  path: "/how-it-works/",
});

/** The enquiry flow, delivered through WhatsApp at launch (no form, booking or payment UI). */
const enquiryFlow = [
  "Select a service",
  "Explain your requirement",
  "Request a consultation on WhatsApp",
  "Receive next-step guidance",
  "Review the service fee before proceeding",
  "Confirm, and we follow up",
];

const details = [
  {
    title: "Fees",
    body: "Our service fee, if any, is agreed before work starts. Official fees, application-centre charges, courier, notary or translation costs are separate.",
  },
  {
    title: "What stays official",
    body: "Applications, appointments, fees, processing and decisions remain with the authorities and their official application centres.",
  },
  {
    title: "What is not automated",
    body: "There is no online booking, upload portal, payment page or case tracking. Everything happens in conversation with our team.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        badge="How it works"
        title="From your question to a well-prepared application"
        lead={`${site.name} keeps it straightforward: you tell us what you need, we explain what applies and help you prepare, and you continue through the official channel ready.`}
        crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}
      >
        <WhatsAppButton>Tell Us What You Need</WhatsAppButton>
      </PageHero>

      <section aria-labelledby="steps-title" className="pb-[var(--section-y)]">
        <div className="container-site">
          <h2 id="steps-title" className="sr-only">
            The five steps
          </h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {journeySteps.map((step, index) => (
              <li key={step.number}>
                <StepCard step={step} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="flow-title" className="section bg-canvas">
        <div className="container-site flex flex-col items-center gap-8">
          <h2 id="flow-title" className="type-h2 mx-auto max-w-[20ch] text-center" data-reveal>
            Your enquiry, step by step
          </h2>
          <ol className="flex max-w-[900px] flex-wrap justify-center gap-3" data-reveal>
            {enquiryFlow.map((item, i) => (
              <li
                key={item}
                className="inline-flex items-center gap-3 rounded-full bg-canvas-alt py-1.5 pl-1.5 pr-4 text-sm text-ink shadow-[0_0_0_1px_rgb(0_0_0/0.05),var(--shadow-card)]"
              >
                <span className="orb size-8 font-display text-xs font-medium" aria-hidden="true">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
          <p className="max-w-[60ch] text-center text-sm text-ink-2" data-reveal>
            At launch, enquiries and consultations happen on WhatsApp. There is no form, booking or payment page.
          </p>
        </div>
      </section>

      <section aria-labelledby="boundaries-title" className="section bg-canvas-alt">
        <div className="container-site">
          <h2 id="boundaries-title" className="type-h2 mx-auto max-w-[18ch] text-center" data-reveal>
            What to expect
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {details.map((d, i) => (
              <div key={d.title} data-reveal style={revealDelay(i * 90)}>
                <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-3">
                  <h3 className="type-card-title">{d.title}</h3>
                  <p className="type-body">{d.body}</p>
                </CardFrame>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-[920px]" data-reveal>
            <PrivacyCard />
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works/" }])} />
    </>
  );
}

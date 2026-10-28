import type { Metadata } from "next";
import { processSteps } from "@/content/home";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { StepCard } from "@/components/home/Process";
import { CardFrame } from "@/components/ui/CardFrame";
import { WhatsAppButton } from "@/components/ui/Button";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "How It Works — from your question to a clear next step",
  description:
    "How Simplyes helps Indians in Germany with consular and administrative processes: tell us what you need, understand the requirements, prepare your documents, and proceed through the official channels.",
  path: "/how-it-works/",
});

const details = [
  {
    title: "What you share",
    body: "A short description of your process and any instructions you already have. Sensitive documents are only discussed once we know what is actually needed.",
  },
  {
    title: "What we do",
    body: "Explain the relevant requirements in plain language, help you check documents and prepare forms, photos and signatures, and clarify the next step.",
  },
  {
    title: "What stays official",
    body: "Applications, appointments, fees, processing and decisions remain with the authorities and their designated service providers.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        badge="How it works"
        title="Simple steps, clear guidance"
        lead="Simplyes keeps the process straightforward: you tell us what you need, we help you understand the requirements and prepare, and you continue through the appropriate official channels with clarity."
        crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}
      >
        <WhatsAppButton topic="general">Tell Us What You Need</WhatsAppButton>
      </PageHero>

      <section aria-labelledby="steps-title" className="pb-[var(--section-y)]">
        <div className="container-site">
          <h2 id="steps-title" className="sr-only">
            The four steps
          </h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.number}>
                <StepCard step={step} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="boundaries-title" className="section bg-canvas-alt">
        <div className="container-site">
          <h2 id="boundaries-title" className="type-h2 mx-auto max-w-[18ch] text-center" data-reveal>
            What to expect along the way
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {details.map((d) => (
              <div key={d.title} data-reveal>
                <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-3">
                  <h3 className="type-card-title">{d.title}</h3>
                  <p className="type-body">{d.body}</p>
                </CardFrame>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works/" }])} />
    </>
  );
}

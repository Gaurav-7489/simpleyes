import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, CircleX, MessagesSquare } from "lucide-react";
import { doesDoesNot, journeySteps } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `How It Works — Five Clear Steps | ${site.name}`,
  absoluteTitle: true,
  description:
    "How SimplYes works in five steps — and the clear boundary between our documentation assistance and official processing by the authorities.",
  path: "/how-it-works/",
});

/** §09 — five steps, the role boundary, does / does not, and how to get started — in the owners' short layout. */
export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        badge="How it works"
        title="How It Works"
        lead="A simple and guided process. Official processing, appointments and final decisions always remain with the relevant authorities."
        crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}
      />

      <section aria-labelledby="steps-title" className="pb-[var(--section-y-compact)]">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 id="steps-title" className="sr-only">
              The five steps
            </h2>
            <ol className="step-list">
              {journeySteps.map((step, i) => (
                <li key={step.title} className="step-row">
                  <span className="stepper-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.0625rem] font-medium leading-snug text-ink">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-snug text-ink-2">{step.body}</p>
                  </div>
                  <span className="step-who">{step.who}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 rounded-[12px] border border-dashed border-line px-4 py-3 text-sm text-ink-2">
              <span className="font-medium text-accent-900">Steps 1–5: documentation assistance by {site.name}.</span>{" "}
              Official processing, appointments and final decisions: the relevant authority.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="card !p-5">
              <h2 className="type-card-title">What {site.name} does</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {doesDoesNot.does.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-600" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card !p-5">
              <h2 className="type-card-title">What {site.name} does not do</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {doesDoesNot.doesNot.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                    <CircleX aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card card-mint !p-5">
              <h2 className="type-card-title flex items-center gap-2">
                <MessagesSquare aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                What to expect
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-[0.9375rem] leading-snug text-ink-2">
                <li>
                  <strong className="font-medium text-ink">Transparency:</strong> clear scope; any service fee explained before
                  paid assistance begins.
                </li>
                <li>
                  <strong className="font-medium text-ink">Communication:</strong> start by form, WhatsApp or email; how we
                  stay in touch is agreed with you.
                </li>
                <li>
                  <strong className="font-medium text-ink">Getting started:</strong>{" "}
                  <Link href="/contact/" className="text-accent-700 underline underline-offset-4">
                    send an enquiry
                  </Link>{" "}
                  — no documents needed at this stage.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCta compact />
      <JsonLd data={breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works/" }])} />
    </>
  );
}

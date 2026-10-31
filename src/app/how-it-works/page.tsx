import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, CircleX, MessagesSquare } from "lucide-react";
import { doesDoesNot, journeySteps } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `How It Works — Five Clear Steps | ${site.name}`,
  absoluteTitle: true,
  description:
    "How SimplYes works in five steps — and the clear boundary between our documentation assistance and official processing by the authorities.",
  path: "/how-it-works/",
});

/** §09 — five steps, the role boundary, does / does not, and how to get started. */
export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        badge="How it works"
        title="Five clear steps, from question to next steps"
        lead="Official processing, appointments and final decisions always remain with the relevant authorities. Here is exactly what we do along the way."
        crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}
      >
        <ButtonLink href="/contact/" location="how-hero">
          Get Assistance
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="steps-title" className="pb-[var(--section-y)]">
        <div className="container-site">
          <h2 id="steps-title" className="sr-only">
            The five steps
          </h2>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {journeySteps.map((step, i) => (
              <li
                key={step.title}
                className={`card flex flex-col gap-3 ${i === journeySteps.length - 1 ? "card-mint" : ""}`}
                data-reveal
                style={revealDelay(i * 60)}
              >
                <span className="stepper-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="type-card-title">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="type-body flex-1">{step.body}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-3">{step.who}</p>
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-[3fr_1fr]">
            <p className="rounded-[12px] bg-accent-50 px-4 py-3 font-medium text-accent-900 ring-1 ring-accent-100">
              Documentation assistance — {site.name}&apos; role (steps 1–5)
            </p>
            <p className="rounded-[12px] border border-dashed border-line px-4 py-3 text-ink-2">
              Official processing — the relevant authority
            </p>
          </div>
          <p className="mt-3 text-sm text-ink-2">
            Official processing, appointments and final decisions always remain with the relevant authorities.
          </p>
        </div>
      </section>

      <section aria-label="What SimplYes does and does not do" className="section bg-white">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="card flex flex-col gap-4" data-reveal>
            <h2 className="type-card-title">What {site.name} does</h2>
            <ul className="flex flex-col gap-3">
              {doesDoesNot.does.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card flex flex-col gap-4" data-reveal style={revealDelay(60)}>
            <h2 className="type-card-title">What {site.name} does not do</h2>
            <ul className="flex flex-col gap-3">
              {doesDoesNot.doesNot.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                  <CircleX aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card flex flex-col gap-4" data-reveal style={revealDelay(120)}>
            <h2 className="type-card-title flex items-center gap-2">
              <MessagesSquare aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
              What to expect
            </h2>
            <ul className="flex flex-col gap-3 type-body">
              <li>
                <strong className="font-medium text-ink">Transparency:</strong> clear scope, and any service fee explained
                before paid assistance begins.
              </li>
              <li>
                <strong className="font-medium text-ink">Communication:</strong> you can start through the enquiry form,
                WhatsApp or email; how we stay in touch afterwards is agreed with you.
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
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works/" }])} />
    </>
  );
}

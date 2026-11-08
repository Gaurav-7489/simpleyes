import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building, CircleCheck, CircleX, MessagesSquare } from "lucide-react";
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

const whoStyle: Record<string, string> = {
  Customer: "bg-canvas-alt text-ink-2 ring-line",
  SimplYes: "bg-accent-50 text-accent-700 ring-accent-100",
  "Customer + SimplYes": "bg-white text-ink ring-line-strong",
};

/** Five steps with who acts at each, the role boundary, and what SimplYes does / does not do. */
export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        badge="How it works"
        title="Five clear steps, from first question to next steps"
        lead="A simple, guided process. Official processing, appointments and final decisions always remain with the relevant authorities — here is exactly what we do along the way."
        crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}
      >
        <ButtonLink href="/contact/" location="how-hero">
          Get Assistance
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="steps-title" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start" data-reveal>
            <h2 id="steps-title" className="type-h2">
              The journey
            </h2>
            <p className="type-lead">
              Each step shows who acts. You stay in control of your application; {site.name} helps you understand and prepare.
            </p>
            <ul className="flex flex-wrap gap-2 text-sm" aria-label="Legend">
              {Object.entries(whoStyle).map(([who, cls]) => (
                <li key={who} className={`rounded-full px-3 py-1.5 ring-1 ${cls}`}>
                  {who}
                </li>
              ))}
            </ul>
          </div>

          <ol className="timeline">
            {journeySteps.map((step, i) => (
              <li key={step.title} className="timeline-item" data-reveal style={revealDelay(i * 60)}>
                <span className={`step-num ${i === journeySteps.length - 1 ? "step-num-strong" : ""}`} aria-hidden="true">
                  {i + 1}
                </span>
                <div className="card !p-5 sm:!p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="type-card-title">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${whoStyle[step.who] ?? whoStyle.Customer}`}>
                      {step.who}
                    </span>
                  </div>
                  <p className="type-body mt-2">{step.body}</p>
                </div>
              </li>
            ))}
            <li className="timeline-item" data-reveal>
              <span className="step-num !bg-white !text-ink-3" aria-hidden="true">
                <Building className="size-5" strokeWidth={1.6} />
              </span>
              <div className="rounded-[var(--radius-md)] border border-dashed border-line-strong px-5 py-4 sm:px-6">
                <h3 className="type-card-title text-ink-2">Official processing — the relevant authority</h3>
                <p className="type-body mt-1">Appointments, submission handling and decisions are made by the authority, not by {site.name}.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section aria-label={`What ${site.name} does and does not do`} className="section section-tint">
        <div className="container-site grid gap-4 lg:grid-cols-3">
          <div className="card flex flex-col gap-4" data-reveal>
            <h2 className="type-card-title">What {site.name} does</h2>
            <ul className="flex flex-col gap-3">
              {doesDoesNot.does.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9875rem] leading-snug text-ink-2">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-green-700" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card flex flex-col gap-4" data-reveal style={revealDelay(60)}>
            <h2 className="type-card-title">What {site.name} does not do</h2>
            <ul className="flex flex-col gap-3">
              {doesDoesNot.doesNot.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9875rem] leading-snug text-ink-2">
                  <CircleX aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-ink-3" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card card-mint flex flex-col gap-4" data-reveal style={revealDelay(120)}>
            <h2 className="type-card-title flex items-center gap-2">
              <MessagesSquare aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
              What to expect
            </h2>
            <ul className="type-body flex flex-col gap-3">
              <li>
                <strong className="font-medium text-ink">Transparency:</strong> clear scope, and any service fee explained before paid
                assistance begins.
              </li>
              <li>
                <strong className="font-medium text-ink">Communication:</strong> you can start through the enquiry form, WhatsApp or email;
                how we stay in touch afterwards is agreed with you.
              </li>
              <li>
                <strong className="font-medium text-ink">Getting started:</strong>{" "}
                <Link href="/contact/" className="text-link">
                  send an enquiry
                </Link>{" "}
                — no documents needed at this stage.
              </li>
            </ul>
            <Link href="/pricing/" className="link-tertiary mt-auto">
              How fees work
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works/" }])} />
    </>
  );
}

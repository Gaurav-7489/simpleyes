import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { homeSteps } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/style";

/**
 * §07 section 5 — four-step summary as framed step cards (Agencee style) joined by a
 * line with a slow travelling pulse; stacks vertically on phones.
 */
export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="section">
      <div className="container-site">
        <SectionHeading
          index="04"
          id="process-title"
          badge="How it works"
          title="Four simple steps"
          lead="Official decisions always stay with the authorities — we help you get there prepared."
        />
        <ol className="steps mt-12 lg:mt-16">
          <span aria-hidden="true" className="steps-line">
            <span className="steps-pulse" />
          </span>
          {homeSteps.map((step, i) => (
            <li key={step.title} className="step-card soft-frame" data-reveal style={revealDelay(i * 140)}>
              <span className="orb-glass size-12 font-display text-base font-semibold" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-card-title mt-6">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="type-body mt-2">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Link href="/how-it-works/" className="link-tertiary">
            See how it works
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}

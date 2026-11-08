import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { homeSteps } from "@/content/home";
import { revealDelay } from "@/lib/style";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Four-step summary of the approved journey; the full five steps live on /how-it-works/. */
export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="section">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="process-title"
            badge="How it works"
            title="A simple, guided process"
            lead="Official decisions always stay with the authorities — we help you arrive prepared."
            align="left"
          />
          <Link href="/how-it-works/" className="link-tertiary shrink-0" data-reveal>
            See the full journey
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
        <ol className="steps steps-row mt-10 lg:mt-14">
          {homeSteps.map((step, i) => (
            <li key={step.title} className="step" data-reveal style={revealDelay(i * 70)}>
              <span className={`step-num ${i === homeSteps.length - 1 ? "step-num-strong" : ""}`} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="type-card-title">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="type-body mt-1.5">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

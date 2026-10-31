import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { homeSteps } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** §07 section 5 — four-step summary: horizontal numbered stepper on desktop, vertical on phones. */
export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="section">
      <div className="container-site">
        <SectionHeading
          id="process-title"
          badge="How it works"
          title="Four simple steps"
          lead="Official decisions always stay with the authorities — we help you get there prepared."
        />
        <ol className="stepper mt-10 lg:mt-14">
          {homeSteps.map((step, i) => (
            <li key={step.title} className="stepper-item" data-reveal>
              <span className="stepper-num" aria-hidden="true">
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
        <div className="mt-8 flex justify-center">
          <Link href="/how-it-works/" className="link-tertiary">
            See how it works
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Workflow } from "lucide-react";
import { homeSteps } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { revealDelay } from "@/lib/style";

/** Agencee "Process": sticky intro + quote on the left, 2×2 numbered step cards on the right. */
export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="section bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="flex flex-col justify-between gap-10 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:min-h-[480px] lg:self-start">
          <div className="flex flex-col items-start gap-5">
            <div data-reveal>
              <Badge icon={<Workflow className="size-3.5" strokeWidth={2} />}>How it works</Badge>
            </div>
            <h2 id="process-title" className="type-h2 max-w-[14ch]" data-reveal style={revealDelay(100)}>
              Four simple steps
            </h2>
            <p className="type-lead max-w-[38ch]" data-reveal style={revealDelay(200)}>
              A straightforward way to understand your requirements and prepare.
            </p>
            <div data-reveal style={revealDelay(300)}>
              <ButtonLink href="/how-it-works/" location="process">
                See How It Works
              </ButtonLink>
            </div>
          </div>
          <blockquote className="type-quote max-w-[24ch] text-ink" data-reveal style={revealDelay(400)}>
            “We explain the requirements and help you prepare —{" "}
            <span className="text-ink-3">official decisions stay with the authorities.</span>”
          </blockquote>
        </div>

        <ol className="grid gap-7 sm:grid-cols-2">
          {homeSteps.map((step, i) => (
            <li key={step.title} className="step-card soft-frame" data-reveal style={revealDelay(i * 140)}>
              <div className="flex items-center justify-between">
                <span className="orb-glass size-12 font-display text-base font-semibold" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className={`size-1.5 rounded-full ${d === i % 3 ? "bg-accent-500" : "bg-ink/10"}`} />
                  ))}
                </span>
              </div>
              <hr aria-hidden="true" className="divider-dashed my-6" />
              <h3 className="type-card-title">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="type-body mt-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

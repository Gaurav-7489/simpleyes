import { CircleCheck, Landmark, Scale } from "lucide-react";
import { boundaries } from "@/content/home";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardFrame } from "@/components/ui/CardFrame";
import { WhatsAppButton } from "@/components/ui/Button";
import { revealDelay } from "@/lib/style";

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3.5 px-1 pb-2 pt-6 sm:px-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-snug text-ink-2">
          <CircleCheck aria-hidden="true" className="mt-px size-4 shrink-0 text-ink-3" strokeWidth={1.6} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Adapted from the reference "Comparison" section: instead of "us vs others",
 * it clearly separates what SimplYes does from what the authorities do.
 */
export function Transparency({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="transparency" aria-labelledby="transparency-title" className="section bg-canvas-alt">
      <div className="container-site">
        <SectionHeading
          as={headingLevel}
          id="transparency-title"
          badge="Transparency"
          title={
            <>
              Independent support. <span className="text-ink-3">Clear boundaries.</span>
            </>
          }
          lead={`${site.name} is a private documentation-assistance service. Official applications, decisions, approvals and processing are handled by the relevant authorities and their official application centres. We help you understand requirements and prepare for your next steps.`}
        />

        <div className="relative mx-auto mt-12 grid max-w-[920px] items-start gap-6 md:grid-cols-2 md:gap-14 lg:mt-16">
          <span
            aria-hidden="true"
            className="orb absolute left-1/2 top-[38px] z-10 hidden size-14 -translate-x-1/2 md:grid"
          >
            <Scale className="size-5" strokeWidth={1.6} />
          </span>

          <div data-reveal>
            <CardFrame cardClassName="!p-2">
              <div className="flex min-h-[84px] items-center justify-between gap-3 rounded-[8px] bg-white px-4 py-3 shadow-[var(--shadow-card)] sm:px-5">
                <h3 className="font-display text-[1.625rem] tracking-[-0.02em] sm:text-3xl">
                  {site.wordmark}
                  <span className="text-accent-600">.</span>
                  <span className="sr-only"> helps you</span>
                </h3>
                <WhatsAppButton size="sm" icon="none">
                  Ask Us
                </WhatsAppButton>
              </div>
              <p className="px-1 pt-5 text-xs font-medium uppercase tracking-[0.04em] text-accent-700 sm:px-3">
                We help you
              </p>
              <List items={boundaries.simplyes} />
            </CardFrame>
          </div>

          <div data-reveal style={revealDelay(90)}>
            <CardFrame cardClassName="!p-2">
              <div className="flex min-h-[84px] items-center justify-center gap-3 rounded-[8px] bg-white px-4 py-3 shadow-[var(--shadow-card)]">
                <Landmark aria-hidden="true" className="size-5 text-ink-2" strokeWidth={1.6} />
                <h3 className="font-display text-[1.625rem] tracking-[-0.02em] sm:text-3xl">Authorities</h3>
              </div>
              <p className="px-1 pt-5 text-xs font-medium uppercase tracking-[0.04em] text-ink-2 sm:px-3">
                Authorities and their official centres
              </p>
              <List items={boundaries.authorities} />
            </CardFrame>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[62ch] text-center text-sm text-ink-2" data-reveal>
          For official requirements, fees and announcements, always refer to the{" "}
          <a
            href={site.official.embassy.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 underline underline-offset-4"
          >
            {site.official.embassy.label}
            <span className="sr-only"> (official website, opens in a new tab)</span>
          </a>{" "}
          and the official channels it lists.
        </p>
      </div>
    </section>
  );
}

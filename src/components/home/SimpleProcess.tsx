import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileSearch, MousePointerClick, Send } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Choose", body: "Pick your service and problem." },
  { icon: Send, title: "Send", body: "Add a few details and send your enquiry." },
  { icon: FileSearch, title: "Understand", body: "We explain what applies to you." },
  { icon: ClipboardCheck, title: "Prepare", body: "We help you get your documents ready." },
];

/** §07 section 5 — the process in four steps. Official decisions always stay with the authorities. */
export function SimpleProcess() {
  return (
    <section aria-labelledby="process-title" className="section-home">
      <div className="container-site">
        <h2 id="process-title" className="type-h2">
          Simple process
        </h2>
        <ol className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {steps.map(({ icon: StepIcon, title, body }, i) => (
            <li key={title} className="process-tile">
              <span className="process-num" aria-hidden="true">
                {i + 1}
              </span>
              <StepIcon aria-hidden="true" className="size-7 text-accent-600" strokeWidth={1.6} />
              <h3 className="font-display text-[1.0625rem] font-medium text-ink">{title}</h3>
              <p className="text-sm leading-snug text-ink-2">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-2">
          Official processing and decisions always stay with the authorities.
          <Link href="/how-it-works/" className="link-tertiary">
            See how it works
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </p>
      </div>
    </section>
  );
}

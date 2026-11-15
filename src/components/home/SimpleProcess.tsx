import Link from "next/link";
import { journeySteps } from "@/content/home";
import { ProcessRail } from "@/components/ProcessRail";

/** Homepage preview of the five-step journey; the full version lives on /how-it-works/. */
export function SimpleProcess() {
  return (
    <section aria-labelledby="process-title" className="section process-preview">
      <div className="container-site">
        <div className="section-head">
          <h2 id="process-title" className="type-h2 max-w-[18ch]">
            Five clear steps, from first question to next step
          </h2>
          <p className="type-lead max-w-[34rem]">
            No documents needed to start. Official processing, appointments and decisions always stay with the
            authorities.
          </p>
        </div>
        <ProcessRail steps={journeySteps} />
        <p className="mt-10">
          <Link href="/how-it-works/" className="link-tertiary">
            See how it works in detail
          </Link>
        </p>
      </div>
    </section>
  );
}

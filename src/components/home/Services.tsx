import Link from "next/link";
import { ServiceList } from "@/components/ServiceList";

/** Homepage services: the six services beside what comes with every one of them. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section services2 scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <div className="section-head">
          <div>
            <p className="eyebrow">Six services, named the way the consulates name them</p>
            <h2 id="services-title" className="type-h2 mt-4">
              Choose your service
            </h2>
          </div>
          <p className="max-w-[22rem] text-[0.9375rem] leading-relaxed text-ink-2">
            Not sure which one fits?{" "}
            <Link href="/contact/" className="link-inline">
              Describe your situation
            </Link>{" "}
            and we tell you.
          </p>
        </div>
        <ServiceList />
      </div>
    </section>
  );
}

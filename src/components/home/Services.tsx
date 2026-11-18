import Link from "next/link";
import { Check } from "lucide-react";
import { mainlyForPhrase, services } from "@/content/services";
import { includedWithEveryService } from "@/content/home";

/** Homepage services: the six services as a quiet list, beside what comes with every one of them. */
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

        <div className="services2-grid">
          <ul className="svc-rows">
            {services.map((s) => (
              <li key={s.slug}>
                <h3>
                  <Link href={`/services/${s.slug}/`} className="svc-row-title">
                    {s.title}
                  </Link>
                </h3>
                <p className="svc-row-summary">{s.summary}</p>
                <p className="svc-row-for">Mainly for {mainlyForPhrase(s)}</p>
              </li>
            ))}
          </ul>

          <aside aria-labelledby="included-title" className="included-card">
            <p id="included-title" className="eyebrow">
              Included with every service
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {includedWithEveryService.map((item) => (
                <li key={item.title} className="included-item">
                  <span className="tick" data-urgent={item.urgent ? "" : undefined} aria-hidden="true">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="included-title">{item.title}</span>
                    <span className="included-body">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

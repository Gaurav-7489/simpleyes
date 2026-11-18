import Link from "next/link";
import { Check } from "lucide-react";
import { mainlyForPhrase, services } from "@/content/services";
import { includedWithEveryService } from "@/content/home";

/** The six services as a quiet list, beside what comes with every one of them (homepage and /services/). */
export function ServiceList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="services2-grid">
      <ul className="svc-rows">
        {services.map((s) => (
          <li key={s.slug}>
            <Heading className="flex items-center gap-2.5">
              <Link href={`/services/${s.slug}/`} className="svc-row-title">
                {s.title}
              </Link>
              {s.isNew && <span className="badge-new">New</span>}
            </Heading>
            <p className="svc-row-summary">{s.summary}</p>
            <p className="svc-row-for">Mainly for {mainlyForPhrase(s)}</p>
          </li>
        ))}
      </ul>

      <aside aria-label="Included with every service" className="included-card">
        <p className="eyebrow">Included with every service</p>
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
  );
}

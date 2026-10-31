import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { revealDelay } from "@/lib/style";

/** §07 section 3 — all eight services as cards: 4 × 2 on desktop, one column on phones. */
export function Services({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <SectionHeading
          as={headingLevel}
          id="services-title"
          badge="Services"
          title="Eight ways we can help"
          lead="Choose the service that matches your situation. Each page explains who it's for, how we help and what stays with the authorities."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {services.map((service, i) => (
            <li key={service.slug} className="min-w-0" data-reveal style={revealDelay((i % 4) * 60)}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

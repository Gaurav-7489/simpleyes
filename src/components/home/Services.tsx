import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIndex } from "@/components/ServiceIndex";

/** §07 section 3 — all eight services as an editorial index with a live preview (one column on phones). */
export function Services({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <SectionHeading
          as={headingLevel}
          id="services-title"
          index="02"
          badge="Services"
          align="left"
          title="Eight ways we can help"
          lead="Choose the service that matches your situation. Each page explains who it's for, how we help and what stays with the authorities."
        />
        <div className="mt-10 lg:mt-14" data-reveal>
          <ServiceIndex services={services} />
        </div>
      </div>
    </section>
  );
}

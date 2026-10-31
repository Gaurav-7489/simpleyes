import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceMosaic } from "@/components/ServiceMosaic";

/** All eight services as a visual mosaic — the homepage's main route into the site. */
export function Services({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <SectionHeading as={headingLevel} id="services-title" index="01" badge="Services" title="What do you need help with?" />
        <div className="mt-10 lg:mt-14">
          <ServiceMosaic services={services} />
        </div>
      </div>
    </section>
  );
}

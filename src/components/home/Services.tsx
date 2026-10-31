import { LayoutGrid } from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceShowcase } from "@/components/home/ServiceShowcase";

/** All eight services in an Agencee-style showcase — the homepage's main route into the site. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          icon={<LayoutGrid className="size-3.5" strokeWidth={2} />}
          badge="Services"
          title="Eight ways we can help"
          lead="Pick your situation — each service has its own page with everything you need."
        />
        <div className="mt-12 lg:mt-16" data-reveal>
          <ServiceShowcase services={services} />
        </div>
      </div>
    </section>
  );
}

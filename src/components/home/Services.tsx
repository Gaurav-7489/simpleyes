import { services } from "@/content/services";
import { ServiceTiles } from "@/components/ServiceTiles";

/** §07 section 3 — choose your service: the eight services as tiles. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-home scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <h2 id="services-title" className="type-h2">
          Choose your service
        </h2>
        <p className="type-lead mt-2">Pick one to see the problems we help with.</p>
        <div className="mt-6 lg:mt-8">
          <ServiceTiles services={services} />
        </div>
      </div>
    </section>
  );
}

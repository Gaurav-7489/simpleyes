import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { ServiceTile } from "@/components/ServiceTile";

/** "How can we help?" — all eight services as compact tiles, overlapping the hero on desktop. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative z-10 scroll-mt-[var(--header-h)] pt-6 lg:-mt-12 lg:pt-0">
      <div className="container-site">
        <div className="hero-services p-3 sm:p-4 lg:mx-8">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 px-2 pb-3 pt-1 sm:px-3">
            <h2 id="services-title" className="type-card-title">
              How can we help?
            </h2>
            <Link href="/services/" className="link-tertiary text-[0.9375rem]">
              View all services
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5 xl:grid-cols-8">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceTile service={service} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

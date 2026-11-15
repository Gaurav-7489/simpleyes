import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { IconTile } from "@/components/ui/Icon";

/** The eight services as tiles (icon, name, one-line summary). Used on the homepage and the Services page. */
export function ServiceTiles({ services, headingLevel = "h3" }: { services: Service[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="service-tiles grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {services.map((service) => (
        <li key={service.slug}>
          <Link href={`/services/${service.slug}/`} className="service-tile" data-cta-location="services-grid">
            <IconTile name={service.icon} />
            <Heading className="font-display text-[1rem] font-medium leading-tight text-ink sm:text-[1.0625rem]">{service.title}</Heading>
            <p className="text-[0.8125rem] leading-snug text-ink-2 sm:text-sm">{service.summary}</p>
            <span className="service-tile-more" aria-hidden="true">
              View Service
              <ArrowRight className="size-3.5" strokeWidth={1.75} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

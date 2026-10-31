import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { IconTile } from "@/components/ui/Icon";

/**
 * §14 service card: icon, name, one-line summary, "View Service". The whole card
 * is one link (single tab stop); equal heights in a row.
 */
export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/services/${service.slug}/`}
      data-tilt=""
      className="card card-link group flex h-full flex-col gap-4 transition-[border-color,box-shadow] duration-200 hover:border-accent-300 hover:shadow-[0_18px_36px_-22px_rgb(19_33_29/0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <IconTile name={service.icon} />
        <span className="font-display text-sm font-medium text-ink-3" aria-hidden="true">
          {service.number}
        </span>
      </div>
      <Heading className="type-card-title">{service.title}</Heading>
      <p className="type-body flex-1">{service.summary}</p>
      <span className="link-tertiary mt-1">
        View Service
        <ArrowRight aria-hidden="true" className="btn-icon size-4" strokeWidth={1.75} />
      </span>
    </Link>
  );
}

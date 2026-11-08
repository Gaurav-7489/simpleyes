import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { IconTile } from "@/components/ui/Icon";

/** Service card: icon, name, one useful sentence and an arrow. The whole card is one link (single tab stop). */
export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/services/${service.slug}/`} className="svc-card card-link group">
      <IconTile name={service.icon} />
      <Heading className="type-card-title">{service.title}</Heading>
      <p className="type-body flex-1">{service.summary}</p>
      <span className="mt-1 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-sm text-ink-3">{service.mainlyFor}</span>
        <span className="svc-card-arrow" aria-hidden="true">
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </span>
      </span>
    </Link>
  );
}

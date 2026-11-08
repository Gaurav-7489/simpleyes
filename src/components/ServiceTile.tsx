import Link from "next/link";
import { serviceLabel, type Service } from "@/content/services";
import { IconTile } from "@/components/ui/Icon";

/**
 * Compact service tile (icon + short label) for the homepage service grid. The whole tile is one link and
 * its accessible name is always the full service title.
 */
export function ServiceTile({ service }: { service: Service }) {
  const { short, rest } = serviceLabel(service);
  return (
    <Link href={`/services/${service.slug}/`} className="svc-tile max-sm:min-h-[64px] max-sm:flex-row max-sm:justify-start max-sm:gap-2.5 max-sm:px-2.5 max-sm:py-2.5 max-sm:text-left max-sm:after:hidden">
      <IconTile name={service.icon} size="sm" className="sm:size-11 sm:rounded-[14px]" />
      <span className="min-w-0 max-sm:text-[0.875rem] max-sm:leading-tight">
        {short}
        {rest && <span className="sr-only">{rest}</span>}
      </span>
    </Link>
  );
}

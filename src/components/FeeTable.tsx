import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceFee } from "@/content/home";
import { enquiryHref, getService } from "@/content/services";
import { IconTile } from "@/components/ui/Icon";

const euro = new Intl.NumberFormat("en-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/**
 * §11 build note: fee table with "From / Quote" states, driven entirely by
 * `pricing.serviceFees`. Renders nothing while that list is empty, so prices
 * can be added later as content without a redesign — and never as placeholders.
 */
export function FeeTable({ fees }: { fees: ServiceFee[] }) {
  const rows = fees
    .map((entry) => ({ entry, service: getService(entry.slug) }))
    .filter((row): row is { entry: ServiceFee; service: NonNullable<ReturnType<typeof getService>> } => Boolean(row.service));
  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="service-fees" className="section">
      <div className="container-site">
        <h2 id="service-fees" className="type-h2 text-center">
          SimplYes service fees
        </h2>
        <p className="type-body mx-auto mt-3 max-w-[640px] text-center">
          Our own fee for each service. Official, consular and third-party costs are always separate.
        </p>
        <ul className="mx-auto mt-10 grid max-w-[960px] gap-3">
          {rows.map(({ entry, service }) => (
            <li key={service.slug} className="card flex flex-wrap items-center gap-4">
              <IconTile name={service.icon} size="sm" />
              <div className="min-w-0 flex-1">
                <Link href={`/services/${service.slug}/`} className="type-card-title underline-offset-4 hover:underline">
                  {service.title}
                </Link>
                {entry.fee.note && <p className="mt-1 text-sm text-ink-2">{entry.fee.note}</p>}
              </div>
              <p className="text-right">
                {entry.fee.kind === "from" ? (
                  <>
                    <span className="block text-sm text-ink-3">From</span>
                    <span className="font-display text-[1.375rem] font-medium text-ink">{euro.format(entry.fee.amountEur)}</span>
                  </>
                ) : (
                  <Link href={enquiryHref(service, "pricing")} className="link-tertiary">
                    On quotation
                    <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { revealDelay } from "@/lib/style";

/**
 * Visual service mosaic: eight tiles in mixed sizes (one featured, one wide, six
 * compact) — icon, name, a few words. Every tile is one link straight to its page.
 */
export function ServiceMosaic({ services, headingLevel = "h3" }: { services: Service[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="service-mosaic">
      {services.map((service, i) => {
        const variant = i === 0 ? "feature" : i === 1 ? "wide" : "compact";
        return (
          <li key={service.slug} className={`mosaic-${variant}`} data-reveal style={revealDelay((i % 4) * 110)}>
            <Link href={`/services/${service.slug}/`} className="mosaic-tile group">
              {/* Decorative background layer: clips the watermark and the hover light sweep. */}
              <span aria-hidden="true" className="mosaic-bg">
                <span className="mosaic-watermark">
                  <Icon name={service.icon} className="size-full" />
                </span>
              </span>
              <span className="flex items-start justify-between gap-3">
                <span className="mosaic-orb" aria-hidden="true">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <span className="mosaic-arrow" aria-hidden="true">
                  <ArrowUpRight className="size-5" strokeWidth={1.75} />
                </span>
              </span>
              <span className="mt-auto flex flex-col gap-1.5">
                <span className="mosaic-num" aria-hidden="true">
                  {service.number}
                </span>
                <Heading className="mosaic-title">{service.title}</Heading>
                <span className="mosaic-tagline">{service.tagline}</span>
                {variant === "feature" && service.slug === "passport-services" && (
                  <span className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
                    {["Renewal", "Reissue", "Lost or damaged", "Corrections"].map((chip) => (
                      <span key={chip} className="mosaic-chip">
                        {chip}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { CardFrame } from "@/components/ui/CardFrame";
import { ServiceArt } from "@/components/illustrations/ServiceArt";

/**
 * Reference service card: framed card, illustration panel, title, copy and a
 * small light "Learn more" pill. The whole card is one link (single tab stop).
 */
export function ServiceCard({
  service,
  headingLevel = "h3",
  artUid,
}: {
  service: Service;
  headingLevel?: "h2" | "h3";
  artUid?: string;
}) {
  const Heading = headingLevel;
  return (
    <CardFrame hover className="h-full" cardClassName="flex flex-col gap-6">
      <Link
        href={`/services/${service.slug}/`}
        className="card-link group flex h-full flex-col gap-6 rounded-[8px] focus-visible:outline-offset-[6px]"
      >
        <div className="card-art aspect-[16/10] w-full sm:aspect-auto sm:h-[clamp(200px,22vw,290px)]">
          <ServiceArt
            kind={service.illustration}
            uid={artUid}
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <Heading className="type-card-title">{service.title}</Heading>
          <p className="type-body max-w-[52ch]">{service.summary}</p>
          <span className="btn btn-light btn-sm mt-auto self-start" aria-hidden="true">
            <span className="btn-face">
              Learn More
              <ArrowRight className="btn-icon size-4" strokeWidth={1.75} />
            </span>
          </span>
        </div>
      </Link>
    </CardFrame>
  );
}

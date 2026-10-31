import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { audiences } from "@/content/home";
import { enquiryHref, getService } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconTile } from "@/components/ui/Icon";
import { revealDelay } from "@/lib/style";

/** §07 section 6 — Who we help: five group tiles, each routing to the relevant service page(s). */
export function WhoWeHelp() {
  return (
    <section aria-labelledby="who-title" className="section bg-white">
      <div className="container-site">
        <SectionHeading
          id="who-title"
          badge="Who we help"
          title="Built for the way you live in Germany"
          lead="Different groups have different documentation needs. Find yours."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {audiences.map((group, i) => {
            const isCorporate = group.icon === "corporate";
            return (
              <li key={group.title} className="card flex flex-col gap-3" data-reveal style={revealDelay(i * 60)}>
                <IconTile name={group.icon} />
                <h3 className="type-card-title">{group.title}</h3>
                <p className="type-body flex-1">{group.body}</p>
                <ul className="flex flex-col gap-1">
                  {group.links.map((slug) => {
                    const service = getService(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/services/${slug}/`} className="link-tertiary text-sm">
                          {service.title}
                          <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                        </Link>
                      </li>
                    );
                  })}
                  {isCorporate && (
                    <li>
                      <Link href={enquiryHref(getService("corporate-services"), "corporate")} className="link-tertiary text-sm">
                        Corporate enquiry
                        <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

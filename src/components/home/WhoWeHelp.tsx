import { audiences } from "@/content/home";
import { enquiryHref, getService } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AudienceTabs, type AudiencePanel } from "@/components/home/AudienceTabs";

/** §07 section 6 — Who we help: five groups as an interactive tab switcher, each routing to its services. */
export function WhoWeHelp() {
  const groups: AudiencePanel[] = audiences.map((group) => ({
    icon: group.icon,
    title: group.title,
    body: group.body,
    links: [
      ...group.links.flatMap((slug) => {
        const service = getService(slug);
        return service ? [{ href: `/services/${slug}/`, label: service.title }] : [];
      }),
      ...(group.icon === "corporate"
        ? [{ href: enquiryHref(getService("corporate-services"), "corporate"), label: "Corporate enquiry" }]
        : []),
    ],
  }));

  return (
    <section aria-labelledby="who-title" className="section bg-white">
      <div className="container-site">
        <SectionHeading
          id="who-title"
          index="05"
          badge="Who we help"
          align="left"
          title="Built for the way you live in Germany"
          lead="Different groups have different documentation needs. Choose yours."
        />
        <div className="mt-10 lg:mt-14" data-reveal>
          <AudienceTabs groups={groups} />
        </div>
      </div>
    </section>
  );
}

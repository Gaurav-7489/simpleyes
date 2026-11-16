import type { Metadata } from "next";
import Link from "next/link";
import { missionPath, missions } from "@/content/missions";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Indian Embassy & Consulates in Germany | Simplyes",
  absoluteTitle: true,
  description:
    "Embassy of India in Berlin and Consulates General of India in Frankfurt, Munich and Hamburg: which states each serves, and help with your application.",
  path: "/missions/",
});

export default function MissionsPage() {
  return (
    <>
      <RdPageHero
        crumbs={[{ name: "Indian missions", path: "/missions/" }]}
        eyebrow="Embassy and Consulates"
        title="The Indian Embassy and Consulates in Germany"
        lead="You apply at the mission responsible for the federal state you live in. Find yours, and see how we help you prepare."
      />
      <section aria-label="Indian missions in Germany" className="rd-section-compact">
        <div className="container-site">
          <ul className="mission-grid">
            {missions.map((mission) => (
              <li key={mission.slug}>
                <Link href={missionPath(mission)} className="mission-card">
                  <span className="mission-card-name">{mission.name}</span>
                  <span className="mission-card-states">{mission.states.join(", ")}</span>
                  <span className="rd-link mt-auto pt-4">Passport, e-OCI and visa help →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="rd-note mt-8">{site.footerDisclosure}</p>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Indian missions", path: "/missions/" }])]} />
    </>
  );
}

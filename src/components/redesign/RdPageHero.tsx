import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/PageHero";
import { Eyebrow } from "./bits";

type Crumb = { name: string; path: string };

/** Inner-page hero of the redesign: breadcrumb, eyebrow, H1, lead and actions. */
export function RdPageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="rd-page-hero" aria-labelledby="page-title">
      <div className="container-site">
        <Breadcrumb crumbs={crumbs} />
        {eyebrow && <Eyebrow className="mt-7">{eyebrow}</Eyebrow>}
        <h1 id="page-title" className="rd-page-title hero-intro">
          {title}
        </h1>
        {lead && <p className="rd-page-lead hero-intro">{lead}</p>}
        {children && <div className="hero-intro mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

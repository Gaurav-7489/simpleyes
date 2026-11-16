import Link from "next/link";
import type { ReactNode } from "react";
import { revealDelay } from "@/lib/style";
import { DocumentStage } from "@/components/scene/DocumentStage";
import type { SceneKey } from "@/components/scene/scenes";
import { ScrollDepth } from "@/components/motion/ScrollDepth";

type Crumb = { name: string; path: string };

/** Inner-page hero: breadcrumb, a large editorial title and lead, and (optionally) the page's document scene. */
export function PageHero({
  title,
  lead,
  crumbs,
  scene,
  children,
}: {
  /** Kept for compatibility; the editorial layout shows no label above the title. */
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  /** Decorative 3D composition beside the title (wide screens) or under it (phones). */
  scene?: SceneKey;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero" data-has-scene={scene ? "" : undefined}>
      <div className="container-site page-hero-grid">
        <div className="page-hero-copy">
          <Breadcrumb crumbs={crumbs} />
          <h1 className="type-page-title hero-intro mt-6 max-w-[16ch]" style={revealDelay(40)}>
            {title}
          </h1>
          {lead && (
            <p className="type-lead hero-intro mt-5 max-w-[40rem]" style={revealDelay(100)}>
              {lead}
            </p>
          )}
          {children && (
            <div className="hero-intro mt-8 flex flex-wrap items-center gap-3" style={revealDelay(160)}>
              {children}
            </div>
          )}
        </div>
        {scene && (
          <div className="page-hero-stage" aria-hidden="true">
            <ScrollDepth mode="drift">
              <DocumentStage scene={scene} intro tilt ratio="1 / 0.8" />
            </ScrollDepth>
          </div>
        )}
      </div>
    </section>
  );
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb hero-intro">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path}>
              <span aria-hidden="true" className="breadcrumb-sep">/</span>
              {last ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

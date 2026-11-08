import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { revealDelay } from "@/lib/style";

/**
 * Inner-page hero: breadcrumb, small label, H1, lead and actions on the left; an optional `aside`
 * (icon, contact card…) on the right from 1024px. Calm gradient backdrop and a soft brand wave.
 */
export function PageHero({
  badge,
  title,
  lead,
  crumbs,
  children,
  aside,
  narrow = false,
}: {
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  /** Narrower measure for legal / reading pages. */
  narrow?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-[clamp(40px,5vw,72px)] pt-[calc(var(--header-h)+28px)] lg:pt-[calc(var(--header-h)+44px)]">
      <div aria-hidden="true" className="page-hero-bg" />
      <svg aria-hidden="true" viewBox="0 0 900 220" className="page-hero-wave" preserveAspectRatio="none">
        <path d="M0 170c170-60 330-50 470-14s290 36 430-46v110H0Z" fill="#e4f3eb" opacity="0.7" />
        <path d="M120 190c160-40 300-28 420-2s230 22 360-28" fill="none" stroke="#b8e05a" strokeWidth="2" opacity="0.6" />
      </svg>
      <div className={`container-site grid items-center gap-10 ${aside ? "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]" : ""}`}>
        <div className={`flex flex-col items-start ${narrow ? "max-w-[760px]" : "max-w-[820px]"}`}>
          <Breadcrumbs crumbs={crumbs} className="hero-in mb-6" />
          {badge && (
            <div className="hero-in" style={revealDelay(30)}>
              <Badge>{badge}</Badge>
            </div>
          )}
          <h1 className="type-page hero-rise mt-4" style={revealDelay(50)}>
            {title}
          </h1>
          {lead && (
            <p className="type-lead hero-in mt-5 max-w-[46rem]" style={revealDelay(120)}>
              {lead}
            </p>
          )}
          {children && (
            <div className="hero-in mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap" style={revealDelay(180)}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="hero-visual-in hidden lg:block" style={revealDelay(120)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

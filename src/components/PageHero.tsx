import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/style";

type Crumb = { name: string; path: string };

/** Sub-page hero (owners' mockup): left-aligned breadcrumb, label, heading and lead on mint, with a green wave. */
export function PageHero({
  badge,
  title,
  lead,
  crumbs,
  children,
}: {
  badge: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="hero-mint relative isolate overflow-hidden pb-[clamp(40px,5vw,72px)] pt-[clamp(100px,10vw,140px)]">
      <PageWave />
      <div className="container-site flex flex-col items-start text-left">
        <nav aria-label="Breadcrumb" className="hero-intro mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-ink-2">
            <li>
              <Link href="/" className="inline-flex min-h-8 items-center rounded px-1 underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-3.5 text-ink-3" />
                  {last ? (
                    <span aria-current="page" className="px-1 text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="inline-flex min-h-8 items-center rounded px-1 underline-offset-4 hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="hero-intro">
          <Badge>{badge}</Badge>
        </div>
        <h1
          className="type-hero hero-intro mt-4 max-w-[22ch]"
          style={revealDelay(60)}
        >
          {title}
        </h1>
        {lead && (
          <p className="type-lead hero-intro mt-5 max-w-[44rem] sm:text-[1.0625rem]" style={revealDelay(120)}>
            {lead}
          </p>
        )}
        {children && (
          <div className="hero-intro mt-8 flex flex-wrap items-center gap-3" style={revealDelay(180)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** Decorative green waves in the top-right corner of sub-page heroes. */
function PageWave() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 420 260"
      preserveAspectRatio="xMaxYMin meet"
      className="pointer-events-none absolute right-0 top-0 -z-10 h-[clamp(180px,30vw,320px)] w-auto opacity-90"
    >
      <defs>
        <linearGradient id="pw-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2f4e6" />
          <stop offset="1" stopColor="#c3e8cf" />
        </linearGradient>
        <linearGradient id="pw-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#a6dc5c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#00a26c" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M120 0h300v230c-60-10-90-60-120-110S220 20 120 0z" fill="url(#pw-a)" />
      <path d="M230 0h190v150c-40-6-64-40-84-76S280 8 230 0z" fill="url(#pw-b)" />
    </svg>
  );
}

import Link from "next/link";
import { site } from "@/content/site";

/**
 * Stand-in for the official logo, drawn after the owners' UI mockup (Nov 2026): a lime → green check
 * mark and the "SimplYes." wordmark. Replace with the supplied SVG once the owners provide the logo
 * asset (§16, Appendix A) — never treat this drawing as the final mark.
 */
export function Wordmark({
  className,
  asLink = true,
  idSuffix = "main",
}: {
  className?: string;
  asLink?: boolean;
  /** Keeps the SVG gradient id unique when the mark appears more than once on a page. */
  idSuffix?: string;
}) {
  const gradientId = `wm-check-${idSuffix}`;
  const mark = (
    <span className="inline-flex items-center gap-2">
      <svg aria-hidden="true" viewBox="0 0 32 24" className="h-[22px] w-[29px] shrink-0">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#a6dc5c" />
            <stop offset="0.6" stopColor="#00a26c" />
            <stop offset="1" stopColor="#00905a" />
          </linearGradient>
        </defs>
        <path d="M2.5 12.5 11 21 29.5 2.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.03em] text-ink">
        {site.name}
        <span className="text-accent-600">.</span>
      </span>
    </span>
  );

  if (!asLink) {
    return <span className={`inline-flex items-center ${className ?? ""}`}>{mark}</span>;
  }

  return (
    <Link href="/" aria-label={`${site.name} — home`} className={`inline-flex min-h-11 items-center rounded-md ${className ?? ""}`}>
      {mark}
    </Link>
  );
}

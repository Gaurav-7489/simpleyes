import Link from "next/link";
import { site } from "@/content/site";

/**
 * Typographic stand-in for the official "simplyes." wordmark (lime → teal → green).
 * Replace with the supplied SVG once the owners provide the logo asset (§16, Appendix A).
 */
export function Wordmark({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const mark = (
    <span className="wordmark font-display text-[1.5rem] font-semibold leading-none tracking-[-0.03em]">
      {site.wordmark}.
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

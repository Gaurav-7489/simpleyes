import Link from "next/link";
import { site } from "@/content/site";

/**
 * Stand-in for the official logo, drawn after the owners' redesign (Nov 2026): the lower-case "simplyes." wordmark
 * in a teal → lime gradient. Replace with the supplied SVG once the owners provide the logo asset.
 */
export function Wordmark({
  className,
  asLink = true,
  tone = "dark",
}: {
  className?: string;
  asLink?: boolean;
  /** "light" for use on the dark folder band (footer). */
  tone?: "dark" | "light";
  /** Kept for compatibility with callers; no longer needed. */
  idSuffix?: string;
}) {
  const mark = (
    <span className="wordmark" data-tone={tone}>
      {site.wordmark}
      <span>.</span>
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

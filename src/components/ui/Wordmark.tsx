import Link from "next/link";
import { site } from "@/content/site";

/**
 * The "simplyes." wordmark as drawn in the November 2026 redesign: lower-case, "si" in lime, the rest in
 * the brand green gradient, and a lime full stop. Text, not an image, so it stays sharp and costs nothing.
 */
export function Wordmark({
  className,
  asLink = true,
  tone = "dark",
  size = "md",
}: {
  className?: string;
  asLink?: boolean;
  /** "light" for use on the dark folder band (footer). */
  tone?: "dark" | "light";
  size?: "md" | "lg";
  /** Kept for compatibility with earlier callers; no longer needed. */
  idSuffix?: string;
}) {
  const mark = (
    <span className="wordmark" data-tone={tone} data-size={size} aria-hidden={asLink ? true : undefined}>
      <span className="wordmark-si">si</span>
      <span className="wordmark-rest">mplyes</span>
      <span className="wordmark-dot">.</span>
    </span>
  );

  if (!asLink) {
    return (
      <span className={`inline-flex items-center ${className ?? ""}`} role="img" aria-label={site.name}>
        {mark}
      </span>
    );
  }

  return (
    <Link href="/" aria-label={`${site.name} home`} className={`inline-flex min-h-11 items-center rounded-md ${className ?? ""}`}>
      {mark}
    </Link>
  );
}

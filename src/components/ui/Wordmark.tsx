import Link from "next/link";
import { site } from "@/content/site";

/**
 * The Simplyes logo: lower-case "simplyes." in Outfit semibold, "si" in lime, then "mplyes." running from teal to
 * green to a lime full stop (colours sampled from the owners' logo). The same drawing is used for the favicon, the
 * app icons and the link-preview image (scripts/render-brand.mjs), so the logo is identical everywhere.
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
      <span className="wordmark-si">si</span>
      <span className="wordmark-rest">mplyes.</span>
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

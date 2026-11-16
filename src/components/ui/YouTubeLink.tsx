import type { ReactNode } from "react";
import { site } from "@/content/site";

/** Play-button mark (generic, drawn here; no third-party logo file). */
export function YouTubeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="#E62117" />
      <path d="M10 8.75v6.5L15.5 12z" fill="#fff" />
    </svg>
  );
}

/**
 * Link to the official Simplyes YouTube channel. Opens in a new tab. It is a plain link rather than an embedded
 * player, so no YouTube scripts or cookies load on simplyes.de.
 */
export function YouTubeLink({
  location,
  className,
  children = "Watch our videos on YouTube",
}: {
  location: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={site.youtube.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="youtube"
      data-cta-location={location}
      className={className}
    >
      <YouTubeIcon className="size-5 shrink-0" />
      <span>{children}</span>
      <span className="sr-only"> (opens the Simplyes YouTube channel in a new tab)</span>
    </a>
  );
}

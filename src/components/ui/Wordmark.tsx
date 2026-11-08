import Link from "next/link";
import { site } from "@/content/site";

/** Original tick mark (lime → green), drawn for the Concept 2 wordmark. */
function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 28" aria-hidden="true" className={className}>
      <path
        d="M2.6 15.4c1.6-1.6 4-1.6 5.6 0l4.1 4.1L25.7 3.2c1.5-1.8 4.2-2 5.9-.4-.1 0-12.6 15.3-15.9 22.4-.9 1.9-3.5 2.2-4.9.6L2.4 21c-1.5-1.6-1.4-4.1.2-5.6Z"
        fill="#2fa35e"
      />
      <path d="M25.7 3.2c1.5-1.8 4.2-2 5.9-.4-3.5 4.2-8.6 10.8-12.2 16.4l-4.3-4.6Z" fill="#9fd456" opacity="0.85" />
    </svg>
  );
}

/**
 * Typographic wordmark following the approved Concept 2 (tick + "SimplYes.").
 * A stand-in until the owners supply the official logo file (see docs/LAUNCH-BLOCKERS.md).
 */
export function Wordmark({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const mark = (
    <span className="inline-flex items-center gap-2">
      <Tick className="h-[22px] w-[25px] shrink-0" />
      <span className="font-display text-[1.375rem] font-semibold leading-none tracking-[-0.03em] text-ink">
        {site.name}
        <span className="wordmark-check">.</span>
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

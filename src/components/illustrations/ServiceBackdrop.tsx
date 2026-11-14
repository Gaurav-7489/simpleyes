import type { JSX } from "react";

/**
 * A light, repeating motif behind each service hero, unique per service, fading out
 * towards the text so copy stays readable. Decorative only.
 */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const star = "M0 -9 L2.6 -2.8 L9 -2.8 L3.8 1.2 L5.6 7.6 L0 3.8 L-5.6 7.6 L-3.8 1.2 L-9 -2.8 L-2.6 -2.8 Z";

const motifs: Record<string, () => JSX.Element> = {
  // Travel stamps and a dashed route
  "passport-services": () => (
    <>
      <circle cx="24" cy="24" r="14" {...S} />
      <circle cx="24" cy="24" r="9" {...S} strokeDasharray="2 3" />
      <path d="M44 30 q20 -18 40 0" {...S} strokeDasharray="3 5" />
      <g transform="translate(72 74)">
        <rect x="-14" y="-10" width="28" height="20" rx="4" {...S} />
        <path d="M-8 -2 h16 M-8 4 h10" {...S} />
      </g>
    </>
  ),
  // Small cards
  "oci-services": () => (
    <>
      <rect x="10" y="12" width="34" height="24" rx="5" {...S} />
      <circle cx="20" cy="24" r="4" {...S} />
      <path d="M28 21 h10 M28 27 h7" {...S} />
      <rect x="56" y="58" width="24" height="32" rx="4" {...S} />
      <path d="M62 70 h12" {...S} />
    </>
  ),
  // Stars and seal rings
  "attestation-legalisation": () => (
    <>
      <path d={star} transform="translate(22 22)" {...S} />
      <circle cx="72" cy="70" r="14" {...S} />
      <circle cx="72" cy="70" r="9" {...S} />
    </>
  ),
  // Ruled lines and signatures
  "affidavits-declarations": () => (
    <>
      <path d="M8 22 h40 M8 32 h30" {...S} />
      <path d="M52 76 c6 -10 10 4 16 -3 s9 -7 13 2" {...S} />
      <path d="M52 84 h34" {...S} />
    </>
  ),
  // Planes on dashed routes
  "visa-documentation-support": () => (
    <>
      <path d="M8 40 q22 -26 44 -8" {...S} strokeDasharray="3 5" />
      <g transform="translate(70 66) rotate(-20)">
        <path d="M-10 1 L10 -1 M1 -1 L-4 -10 M1 -1 L-4 9 M-7 0.5 L-10 -4" {...S} />
      </g>
    </>
  ),
  // Hearts and homes
  "family-documentation": () => (
    <>
      <path d="M24 30 c-5 -8 -16 -4 -12 5 c2 5 12 11 12 11 s10 -6 12 -11 c4 -9 -7 -13 -12 -5 z" {...S} />
      <path d="M58 76 L72 64 L86 76 V90 H58 Z" {...S} />
    </>
  ),
  // Mortarboards and books
  "student-services": () => (
    <>
      <path d="M26 14 L44 21 L26 28 L8 21 Z M16 25 v7 q10 6 20 0 v-7 M44 21 v9" {...S} />
      <path d="M56 66 h28 v8 h-28 z M60 74 h24 v8 h-24 z" {...S} />
    </>
  ),
  // Buildings and briefcases
  "corporate-services": () => (
    <>
      <path d="M10 44 V16 h14 v28 M24 44 V8 h14 v36 M6 44 h36" {...S} />
      <path d="M14 22 h4 M14 30 h4 M28 16 h4 M28 24 h4 M28 32 h4" {...S} />
      <rect x="58" y="66" width="28" height="20" rx="4" {...S} />
      <path d="M66 66 v-4 h12 v4" {...S} />
    </>
  ),
};

export function ServiceBackdrop({ slug }: { slug: string }) {
  const Motif = motifs[slug] ?? motifs["passport-services"]!;
  const id = `bd-${slug}`;
  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 -z-10 size-full text-accent-700 opacity-50 lg:opacity-100">
      <defs>
        <pattern id={`${id}-p`} width="96" height="96" patternUnits="userSpaceOnUse">
          <Motif />
        </pattern>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-m`}>
          <rect width="100%" height="100%" fill={`url(#${id}-g)`} />
        </mask>
        <mask id={`${id}-mv`}>
          <rect width="100%" height="100%" fill={`url(#${id}-v)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mv)`}>
        <rect width="100%" height="100%" fill={`url(#${id}-p)`} mask={`url(#${id}-m)`} opacity="0.13" />
      </g>
    </svg>
  );
}

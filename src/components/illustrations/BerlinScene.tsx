/**
 * Original illustration for the home hero: Berlin at golden hour — Brandenburg Gate, the TV tower,
 * trees and the river — with the brand's green waves (owners' UI mockup, Nov 2026).
 *
 * Deliberately NOT included (§07, §08, §16): passports, national emblems, government seals, flags or
 * anything that could read as official imagery. A European city scene is explicitly allowed (§16).
 * Pure SVG: no image files, no licensing questions, crisp at every size. Decorative (aria-hidden).
 */
export function BerlinScene({ className }: { className?: string }) {
  const columns = [214, 254, 304, 356, 406, 446];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 640 460"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id="bs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe4ee" />
          <stop offset="0.45" stopColor="#e9eedf" />
          <stop offset="0.72" stopColor="#fbe3bf" />
          <stop offset="1" stopColor="#f6c48a" />
        </linearGradient>
        <radialGradient id="bs-sun" cx="0.72" cy="0.62" r="0.5">
          <stop offset="0" stopColor="#fff4d6" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#ffd9a0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bs-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d6b47c" />
          <stop offset="0.45" stopColor="#f1d9a8" />
          <stop offset="1" stopColor="#c99f63" />
        </linearGradient>
        <linearGradient id="bs-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a3e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8a6a3e" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="bs-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3cf9c" />
          <stop offset="0.4" stopColor="#c9dcd2" />
          <stop offset="1" stopColor="#9fc8bb" />
        </linearGradient>
        <linearGradient id="bs-wave-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a6dc5c" />
          <stop offset="0.55" stopColor="#3cb878" />
          <stop offset="1" stopColor="#00905a" />
        </linearGradient>
        <linearGradient id="bs-wave-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2f4e6" />
          <stop offset="1" stopColor="#c3e8cf" />
        </linearGradient>
        <linearGradient id="bs-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cbf6e" />
          <stop offset="1" stopColor="#3f8a55" />
        </linearGradient>
      </defs>

      {/* Sky and low sun */}
      <rect width="640" height="460" fill="url(#bs-sky)" />
      <rect width="640" height="460" fill="url(#bs-sun)" />

      {/* Distant skyline */}
      <g fill="#cfd9d4" opacity="0.85">
        <rect x="20" y="268" width="46" height="70" rx="2" />
        <rect x="70" y="250" width="34" height="88" rx="2" />
        <rect x="486" y="258" width="40" height="80" rx="2" />
        <rect x="530" y="240" width="30" height="98" rx="2" />
        <rect x="566" y="270" width="56" height="68" rx="2" />
      </g>

      {/* TV tower (Fernsehturm) */}
      <g fill="#b9c8c2">
        <rect x="127" y="104" width="10" height="236" rx="3" />
        <rect x="130.5" y="40" width="3" height="70" />
        <circle cx="132" cy="128" r="17" />
        <rect x="122" y="146" width="20" height="5" rx="2" />
      </g>
      <circle cx="127" cy="123" r="5" fill="#ffffff" opacity="0.45" />

      {/* Trees behind the gate */}
      <g fill="url(#bs-tree)">
        <ellipse cx="60" cy="318" rx="56" ry="38" />
        <ellipse cx="128" cy="326" rx="44" ry="30" />
        <ellipse cx="560" cy="316" rx="60" ry="40" />
        <ellipse cx="508" cy="328" rx="40" ry="26" />
      </g>

      {/* Brandenburg Gate */}
      <g>
        {/* Side wings */}
        <rect x="150" y="262" width="52" height="78" fill="url(#bs-stone)" />
        <rect x="458" y="262" width="52" height="78" fill="url(#bs-stone)" />
        <rect x="146" y="254" width="60" height="10" fill="#e6c891" />
        <rect x="454" y="254" width="60" height="10" fill="#e6c891" />
        <g fill="#8a6a3e" opacity="0.35">
          <rect x="164" y="282" width="10" height="44" rx="1" />
          <rect x="180" y="282" width="10" height="44" rx="1" />
          <rect x="472" y="282" width="10" height="44" rx="1" />
          <rect x="488" y="282" width="10" height="44" rx="1" />
        </g>

        {/* Quadriga (stylised bronze silhouette): four horses, the chariot and the figure */}
        <g fill="#41705a">
          <rect x="292" y="152" width="76" height="10" rx="2" />
          {[
            [296, false],
            [308, false],
            [342, true],
            [354, true],
          ].map(([x, flip]) => (
            <path
              key={String(x)}
              transform={`translate(${x} 128)${flip ? " scale(-1 1) translate(-12 0)" : ""}`}
              d="M3 24 4 14C4 9 6 5 9 3L10 0 11.5 3C13 4 14 6 13.5 8L11.5 8.5C10 8.5 9 10 9 12L10 24Z"
            />
          ))}
          <rect x="318" y="134" width="24" height="18" rx="3" />
          <path d="M327 134c0-9 1-15 3-20h2c2 5 3 11 3 20z" />
          <circle cx="331" cy="110" r="3.6" />
          <path d="M342 92h2.5v42H342z" />
          <path d="M337 92h12l-2 3h-8z" />
        </g>

        {/* Attic and entablature */}
        <rect x="196" y="162" width="268" height="30" fill="url(#bs-stone)" />
        <rect x="190" y="190" width="280" height="10" fill="#e8cc96" />
        <rect x="196" y="162" width="268" height="5" fill="#fff1d2" opacity="0.6" />
        <g fill="#8a6a3e" opacity="0.28">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={206 + i * 22} y="172" width="10" height="12" rx="1" />
          ))}
        </g>

        {/* Columns */}
        {columns.map((x) => (
          <g key={x}>
            <rect x={x} y="200" width="16" height="122" fill="url(#bs-stone)" />
            <rect x={x - 3} y="200" width="22" height="6" fill="#e8cc96" />
            <rect x={x - 3} y="316" width="22" height="7" fill="#d9b77e" />
          </g>
        ))}

        {/* Shadow inside the passages */}
        <g fill="url(#bs-shade)">
          <rect x="230" y="206" width="24" height="116" />
          <rect x="270" y="206" width="34" height="116" />
          <rect x="320" y="206" width="36" height="116" />
          <rect x="372" y="206" width="34" height="116" />
          <rect x="422" y="206" width="24" height="116" />
        </g>

        {/* Base */}
        <rect x="186" y="322" width="288" height="18" fill="#d8b67d" />
      </g>

      {/* Promenade and river with a soft reflection */}
      <rect x="0" y="338" width="640" height="10" fill="#e9d2a8" />
      <rect x="0" y="346" width="640" height="114" fill="url(#bs-water)" />
      <g opacity="0.22" fill="#c99f63">
        <rect x="196" y="352" width="268" height="10" />
        {columns.map((x) => (
          <rect key={x} x={x} y="362" width="16" height="44" />
        ))}
      </g>
      <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round">
        <path d="M60 372h70M420 368h90M250 392h60M520 404h60M90 414h50" />
      </g>

      {/* Brand waves */}
      <path d="M0 404c90-30 170-34 260-12s180 40 260 18 92-40 120-46V460H0z" fill="url(#bs-wave-b)" opacity="0.92" />
      <path d="M0 430c110-34 210-30 300-6s170 30 250 6 70-24 90-28V460H0z" fill="url(#bs-wave-a)" opacity="0.9" />
    </svg>
  );
}

/**
 * Original illustration for the homepage hero (Concept 2): the Brandenburg Gate at sunset with the Berlin TV
 * tower, a soft curved mask, a mint brand wave and an unmarked document booklet.
 *
 * Deliberately contains no government emblem, flag, seal, text or personal data, so it cannot be read as an
 * official endorsement. Drawn in SVG: no licence dependencies, ~6 KB, sharp at every size, no layout shift.
 */
export function HeroVisual({ className }: { className?: string }) {
  const columns = [182, 230, 278, 344, 392, 440];
  const passages: [number, number][] = [
    [200, 230],
    [248, 278],
    [296, 344],
    [362, 392],
    [410, 440],
  ];

  return (
    <svg
      viewBox="0 0 640 520"
      role="img"
      aria-label="Illustration of the Brandenburg Gate in Berlin at sunset, with a document booklet in the foreground"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <clipPath id="hv-mask">
          <path d="M0 520V178C0 74 82 0 196 0h444v520Z" />
        </clipPath>
        <linearGradient id="hv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe5e6" />
          <stop offset="0.45" stopColor="#eee6d3" />
          <stop offset="0.8" stopColor="#f9d9ae" />
          <stop offset="1" stopColor="#f6c995" />
        </linearGradient>
        <radialGradient id="hv-sun" cx="0.5" cy="0.66" r="0.42">
          <stop offset="0" stopColor="#fff2d6" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffdca8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffdca8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f1dfbf" />
          <stop offset="0.55" stopColor="#e3c79a" />
          <stop offset="1" stopColor="#c9a676" />
        </linearGradient>
        <linearGradient id="hv-stone-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4e4c6" />
          <stop offset="1" stopColor="#ddc093" />
        </linearGradient>
        <linearGradient id="hv-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6b8" />
          <stop offset="1" stopColor="#f4bf83" />
        </linearGradient>
        <linearGradient id="hv-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8dcc2" />
          <stop offset="1" stopColor="#dfe8dc" />
        </linearGradient>
        <linearGradient id="hv-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e3f3ea" />
          <stop offset="0.6" stopColor="#cfece0" />
          <stop offset="1" stopColor="#bfe6d4" />
        </linearGradient>
        <linearGradient id="hv-lime" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8e05a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#b8e05a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2fa35e" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="hv-book" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3d63" />
          <stop offset="1" stopColor="#17233f" />
        </linearGradient>
        <linearGradient id="hv-patina" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4f8a74" />
          <stop offset="1" stopColor="#2e5c4d" />
        </linearGradient>
        <filter id="hv-soft" x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <g clipPath="url(#hv-mask)">
        {/* Sky and low sun */}
        <rect width="640" height="520" fill="url(#hv-sky)" />
        <rect width="640" height="520" fill="url(#hv-sun)" />

        {/* Distant city with the TV tower */}
        <g fill="#b7c8c6" opacity="0.75">
          <rect x="93" y="118" width="3" height="40" />
          <rect x="90.5" y="150" width="8" height="210" rx="3" />
          <circle cx="94.5" cy="196" r="13" />
          <rect x="88" y="208" width="13" height="5" rx="2" />
          <path d="M0 360v-48h40v-22h34v30h48v-18h36v58Z" />
          <path d="M486 360v-40h30v-26h40v34h34v-16h50v48Z" />
        </g>

        {/* Trees */}
        <g opacity="0.9">
          <ellipse cx="60" cy="378" rx="86" ry="44" fill="#9dbfa5" />
          <ellipse cx="150" cy="392" rx="64" ry="34" fill="#87b093" />
          <ellipse cx="590" cy="380" rx="90" ry="46" fill="#9dbfa5" />
          <ellipse cx="500" cy="394" rx="62" ry="32" fill="#87b093" />
        </g>

        {/* Ground and avenue */}
        <rect y="398" width="640" height="122" fill="url(#hv-ground)" />
        <path d="M296 400h48l120 120H176Z" fill="#f1e6cf" opacity="0.8" />

        {/* Brandenburg Gate */}
        <g>
          {/* Side pavilions */}
          <rect x="120" y="292" width="50" height="108" fill="url(#hv-stone)" />
          <rect x="116" y="284" width="58" height="10" fill="url(#hv-stone-top)" />
          <rect x="470" y="292" width="50" height="108" fill="url(#hv-stone)" />
          <rect x="466" y="284" width="58" height="10" fill="url(#hv-stone-top)" />
          <rect x="134" y="320" width="22" height="80" rx="11" fill="#b9966a" opacity="0.55" />
          <rect x="484" y="320" width="22" height="80" rx="11" fill="#b9966a" opacity="0.55" />

          {/* Light through the passages */}
          {passages.map(([x1, x2]) => (
            <rect key={x1} x={x1} y="232" width={x2 - x1} height="150" fill="url(#hv-light)" />
          ))}
          <rect x="170" y="232" width="300" height="150" fill="#9c7a52" opacity="0.18" />

          {/* Columns with simple fluting */}
          {columns.map((x) => (
            <g key={x}>
              <rect x={x - 2} y="376" width="22" height="8" fill="#d7b98a" />
              <rect x={x} y="232" width="18" height="146" fill="url(#hv-stone)" />
              <path d={`M${x + 6} 236v138M${x + 12} 236v138`} stroke="#c7a575" strokeWidth="1" opacity="0.7" />
              <rect x={x - 2} y="228" width="22" height="6" fill="#ead3ab" />
            </g>
          ))}

          {/* Plinth */}
          <rect x="164" y="382" width="312" height="18" fill="#d2b282" />
          <rect x="164" y="382" width="312" height="4" fill="#e7cfa5" />

          {/* Entablature with triglyphs */}
          <rect x="166" y="206" width="308" height="24" fill="url(#hv-stone-top)" />
          <g fill="#c9a676" opacity="0.75">
            {Array.from({ length: 19 }, (_, i) => (
              <rect key={i} x={172 + i * 16} y="212" width="6" height="14" rx="1" />
            ))}
          </g>
          <rect x="160" y="200" width="320" height="8" rx="1" fill="#f3e2c3" />

          {/* Attic */}
          <rect x="204" y="178" width="232" height="22" fill="url(#hv-stone-top)" />
          <rect x="216" y="184" width="208" height="10" rx="2" fill="#d5b688" opacity="0.7" />
          <rect x="198" y="174" width="244" height="6" fill="#f3e2c3" />
          <rect x="262" y="164" width="116" height="12" fill="url(#hv-stone-top)" />

          {/* Quadriga (stylised, patina green): four horses seen from the front, chariot and figure */}
          <g fill="url(#hv-patina)">
            {[280, 298, 324, 342].map((x) => (
              <path
                key={x}
                transform={`translate(${x} 124)`}
                d="M2 40v-9C0 27 0 21 3 18l2-12C5.4 2 9 0 11 3l2 4-1 9c4 3 6 8 6 15v9h-3v-8h-3v8H9v-8H6v8Z"
              />
            ))}
            <rect x="314" y="146" width="12" height="18" rx="2" />
            <path d="M317 146l1.5-20h4l1.5 20Z" />
            <circle cx="320.5" cy="121" r="4" />
            <path d="M323 125l9-30" stroke="#2e5c4d" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <circle cx="332.5" cy="93" r="4.5" fill="none" stroke="#2e5c4d" strokeWidth="1.8" />
            <rect x="276" y="162" width="88" height="4" rx="1" />
          </g>
        </g>

        {/* Mint brand wave */}
        <path d="M0 452c118-30 214-12 320 6s240 14 320-30v92H0Z" fill="url(#hv-wave)" />
        <path d="M0 470c130-24 236-6 342 10s210 10 298-24" fill="none" stroke="url(#hv-lime)" strokeWidth="3" strokeLinecap="round" />
        <path d="M0 492c140-18 260 4 360 14s200 2 280-20v34H0Z" fill="#f2faf5" opacity="0.9" />

        {/* Document booklet (no marks) */}
        <ellipse cx="166" cy="496" rx="60" ry="9" fill="#13211d" opacity="0.18" filter="url(#hv-soft)" />
        <g transform="translate(112 366) rotate(-8) scale(0.78)">
          <rect width="128" height="172" rx="12" fill="url(#hv-book)" />
          <rect width="12" height="172" rx="6" fill="#0f1a31" opacity="0.6" />
          <rect x="24" y="18" width="88" height="136" rx="6" fill="none" stroke="#c9a65a" strokeOpacity="0.45" strokeWidth="1.5" />
          <rect x="0" y="0" width="128" height="40" rx="12" fill="#fff" opacity="0.06" />
        </g>
      </g>
    </svg>
  );
}

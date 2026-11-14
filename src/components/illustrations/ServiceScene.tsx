import type { JSX } from "react";
import type { SceneKind } from "@/content/services";

/**
 * Original hero illustrations, one per service (owners' references, redrawn as simple SVG).
 * Decorative only. No national emblems, seals or official marks.
 */

const INK = "#13211d";
const LINE = "#d7dad8";
const PAPER = "#ffffff";
const GREEN = "#00905a";
const DARK = "#005c45";
const TINT = "#e2f4e6";
const LIME = "#a6dc5c";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#003a2c" floodOpacity="0.16" />
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.08" />
      </filter>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={GREEN} stopOpacity="0.2" />
        <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

const Lines = ({ x, y, w, n, gap = 14 }: { x: number; y: number; w: number; n: number; gap?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * 0.6 : w} height="5" rx="2.5" fill={LINE} />
    ))}
  </>
);

const CheckBadge = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="20" fill={GREEN} />
    <path d="M-8 1 L-2 7 L9 -6" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

function Oci({ id }: { id: string }) {
  return (
    <>
      <g transform="rotate(-8 190 190)" filter={`url(#${id}-sh)`}>
        <rect x="80" y="130" width="210" height="132" rx="14" fill={PAPER} />
        <rect x="80" y="130" width="210" height="30" rx="14" fill={TINT} />
        <rect x="80" y="146" width="210" height="14" fill={TINT} />
        <rect x="98" y="176" width="58" height="68" rx="8" fill={TINT} />
        <circle cx="127" cy="200" r="13" fill="#c98b5e" />
        <path d="M105 244 q22 -30 44 0 z" fill={DARK} />
        <Lines x={170} y={182} w={100} n={4} />
      </g>
      <g transform="rotate(7 320 180)" filter={`url(#${id}-sh)`}>
        <rect x="246" y="58" width="156" height="222" rx="14" fill="#1f5f8f" />
        <rect x="246" y="58" width="16" height="222" rx="8" fill="#174a70" />
        <rect x="270" y="74" width="120" height="190" rx="8" fill="none" stroke="#e3c983" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="330" y="168" textAnchor="middle" fontSize="44" fontWeight="700" fill="#e3c983" fontFamily="inherit" letterSpacing="4">
          OCI
        </text>
        <path d="M286 196 q22 -12 44 0 t44 0" fill="none" stroke="#e3c983" strokeOpacity="0.7" strokeWidth="2" />
        <path d="M286 208 q22 -12 44 0 t44 0" fill="none" stroke="#e3c983" strokeOpacity="0.45" strokeWidth="2" />
      </g>
      <CheckBadge x={392} y={292} />
    </>
  );
}

function burst(r1: number, r2: number, n: number) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI * i) / n;
    pts.push(`${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function star(r: number) {
  return burst(r, r * 0.45, 5);
}

function Attestation({ id }: { id: string }) {
  const RED = "#d33b3b";
  return (
    <>
      <g filter={`url(#${id}-sh)`}>
        <rect x="104" y="40" width="220" height="280" rx="12" fill={PAPER} />
      </g>
      <rect x="128" y="66" width="110" height="10" rx="5" fill={INK} opacity="0.85" />
      <Lines x={128} y={94} w={172} n={6} gap={18} />
      <path d="M134 290 c14 -22 24 10 38 -6 s20 -16 30 4" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="128" y="300" width="96" height="2" fill={LINE} />
      <g transform="translate(318 214) rotate(-14)" opacity="0.94">
        <polygon points={burst(78, 70, 28)} fill="none" stroke={RED} strokeWidth="5" strokeLinejoin="round" />
        <circle r="60" fill="#fff" fillOpacity="0.55" stroke={RED} strokeWidth="3" />
        <rect x="-84" y="-19" width="168" height="38" rx="5" fill={RED} />
        <text y="10" textAnchor="middle" fontSize="27" fontWeight="800" fill="#fff" fontFamily="inherit" letterSpacing="1.5">
          ATTESTED
        </text>
        {[-34, 0, 34].map((x, i) => (
          <polygon key={`t${x}`} points={star(i === 1 ? 9 : 7)} transform={`translate(${x} ${i === 1 ? -40 : -34})`} fill={RED} />
        ))}
        {[-34, 0, 34].map((x, i) => (
          <polygon key={`b${x}`} points={star(i === 1 ? 9 : 7)} transform={`translate(${x} ${i === 1 ? 40 : 34})`} fill={RED} />
        ))}
      </g>
    </>
  );
}

function Affidavit({ id }: { id: string }) {
  return (
    <>
      <g transform="rotate(8 300 180)" filter={`url(#${id}-sh)`}>
        <rect x="214" y="58" width="168" height="230" rx="12" fill="#2fae6b" />
      </g>
      <g transform="rotate(-5 210 180)" filter={`url(#${id}-sh)`}>
        <rect x="118" y="60" width="176" height="236" rx="12" fill="#3f86c9" />
        <rect x="118" y="118" width="176" height="52" fill="#2f6aa3" />
        <text x="206" y="142" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="inherit">
          Affidavits &amp;
        </text>
        <text x="206" y="162" textAnchor="middle" fontSize="16" fontWeight="600" fill="#fff" fillOpacity="0.9" fontFamily="inherit">
          Declarations
        </text>
        <rect x="140" y="196" width="132" height="5" rx="2.5" fill="#fff" fillOpacity="0.45" />
        <rect x="140" y="212" width="104" height="5" rx="2.5" fill="#fff" fillOpacity="0.45" />
      </g>
      <path d="M150 318 c16 -26 28 12 44 -8 s22 -18 34 6 s20 -8 30 -4" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <g transform="translate(318 300) rotate(-38)" filter={`url(#${id}-sh)`}>
        <rect x="-8" y="-86" width="16" height="96" rx="6" fill={INK} />
        <rect x="-8" y="-86" width="16" height="22" rx="6" fill={GREEN} />
        <path d="M-8 10 L0 30 L8 10 z" fill="#c9a24b" />
      </g>
    </>
  );
}

function Visa({ id }: { id: string }) {
  return (
    <>
      <path d="M78 236 Q236 20 404 168" fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="7 9" strokeLinecap="round" />
      <circle cx="78" cy="236" r="9" fill={GREEN} />
      <circle cx="78" cy="236" r="16" fill={GREEN} fillOpacity="0.18" />
      <circle cx="404" cy="168" r="9" fill={DARK} />
      <circle cx="404" cy="168" r="16" fill={DARK} fillOpacity="0.18" />
      <g transform="translate(250 92) rotate(16)">
        <circle r="28" fill={PAPER} filter={`url(#${id}-sh)`} />
        <path
          d="M-16 2 L16 -2 M2 -2 L-6 -16 M2 -2 L-6 14 M-12 1 L-16 -7"
          fill="none"
          stroke={GREEN}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g filter={`url(#${id}-sh)`}>
        <rect x="150" y="196" width="230" height="122" rx="16" fill={PAPER} />
      </g>
      <rect x="150" y="196" width="70" height="122" rx="16" fill={TINT} />
      <rect x="204" y="196" width="16" height="122" fill={TINT} />
      <circle cx="185" cy="236" r="16" fill={GREEN} />
      <path d="M178 237 l5 5 l10 -11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="168" y="268" width="34" height="5" rx="2.5" fill={GREEN} fillOpacity="0.5" />
      <rect x="168" y="282" width="26" height="5" rx="2.5" fill={GREEN} fillOpacity="0.35" />
      <Lines x={236} y={222} w={124} n={4} gap={18} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="64" y="268" width="66" height="62" rx="10" fill={DARK} />
      </g>
      <rect x="84" y="254" width="26" height="16" rx="6" fill="none" stroke={DARK} strokeWidth="5" />
      <rect x="64" y="292" width="66" height="5" fill={LIME} />
    </>
  );
}

const Person = ({ x, y, s, skin, shirt }: { x: number; y: number; s: number; skin: string; shirt: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-40 100 Q-40 34 0 34 Q40 34 40 100 Z" fill={shirt} />
    <circle cx="0" cy="0" r="24" fill={skin} />
    <path d="M-24 -4 Q-22 -28 0 -28 Q24 -28 24 -4 Q14 -16 0 -16 Q-14 -16 -24 -4 Z" fill={INK} opacity="0.85" />
  </g>
);

function Family({ id }: { id: string }) {
  return (
    <>
      <path d="M110 170 L240 70 L370 170 V318 H110 Z" fill={TINT} />
      <path d="M96 176 L240 62 L384 176" fill="none" stroke={GREEN} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <Person x={176} y={190} s={1.05} skin="#c98b5e" shirt={DARK} />
      <Person x={304} y={190} s={1.05} skin="#e0a87a" shirt={GREEN} />
      <Person x={240} y={232} s={0.72} skin="#f2c8a0" shirt={LIME} />
      <path d="M240 128 c-8 -12 -26 -6 -20 8 c4 8 20 18 20 18 s16 -10 20 -18 c6 -14 -12 -20 -20 -8 z" fill="#ef6b6b" />
      <g transform="translate(372 250) rotate(6)" filter={`url(#${id}-sh)`}>
        <rect x="-36" y="-44" width="72" height="88" rx="10" fill={PAPER} />
        <rect x="-24" y="-30" width="34" height="6" rx="3" fill={INK} opacity="0.8" />
        <Lines x={-24} y={-14} w={48} n={3} gap={12} />
        <circle cx="16" cy="28" r="9" fill={GREEN} />
      </g>
    </>
  );
}

function Student({ id }: { id: string }) {
  return (
    <>
      <g filter={`url(#${id}-sh)`}>
        <rect x="70" y="276" width="120" height="22" rx="4" fill="#3f86c9" />
        <rect x="80" y="254" width="104" height="22" rx="4" fill={GREEN} />
        <rect x="74" y="232" width="112" height="22" rx="4" fill="#f0b84a" />
      </g>
      <path d="M182 322 Q182 196 250 196 Q318 196 318 322 Z" fill="#1d2b27" />
      <path d="M232 196 L250 236 L268 196 Z" fill="#fff" />
      <circle cx="250" cy="160" r="34" fill="#e0a87a" />
      <polygon points="250,96 316,120 250,144 184,120" fill="#1d2b27" />
      <rect x="226" y="124" width="48" height="16" rx="4" fill="#1d2b27" />
      <path d="M316 120 V156" stroke="#f0b84a" strokeWidth="4" strokeLinecap="round" />
      <circle cx="316" cy="160" r="6" fill="#f0b84a" />
      <path d="M300 230 L340 166" stroke="#1d2b27" strokeWidth="22" strokeLinecap="round" />
      <circle cx="342" cy="162" r="13" fill="#e0a87a" />
      <g transform="translate(350 132) rotate(-28)">
        <rect x="-12" y="-46" width="24" height="84" rx="10" fill="#ef6b6b" />
        <rect x="-14" y="-6" width="28" height="10" fill={LIME} />
      </g>
      <g transform="translate(388 268) rotate(5)" filter={`url(#${id}-sh)`}>
        <rect x="-44" y="-36" width="88" height="66" rx="8" fill={PAPER} />
        <Lines x={-30} y={-22} w={60} n={3} gap={12} />
        <circle cx="22" cy="16" r="9" fill={GREEN} />
      </g>
    </>
  );
}

function Corporate({ id }: { id: string }) {
  const windows = (x: number, y: number, cols: number, rows: number) =>
    Array.from({ length: cols * rows }, (_, i) => (
      <rect key={i} x={x + (i % cols) * 22} y={y + Math.floor(i / cols) * 24} width="12" height="14" rx="2" fill="#fff" fillOpacity="0.75" />
    ));
  return (
    <>
      <rect x="84" y="120" width="96" height="200" rx="8" fill={GREEN} />
      {windows(100, 138, 3, 7)}
      <rect x="196" y="64" width="110" height="256" rx="8" fill={DARK} />
      {windows(214, 84, 4, 9)}
      <rect x="322" y="150" width="84" height="170" rx="8" fill="#2fae6b" />
      {windows(336, 168, 3, 6)}
      <g transform="translate(166 254) rotate(-6)" filter={`url(#${id}-sh)`}>
        <path d="M0 -84 V-46" stroke={LIME} strokeWidth="5" />
        <rect x="-44" y="-50" width="88" height="112" rx="12" fill={PAPER} />
        <rect x="-44" y="-50" width="88" height="24" rx="12" fill={LIME} />
        <rect x="-44" y="-36" width="88" height="10" fill={LIME} />
        <circle cx="0" cy="2" r="16" fill="#c98b5e" />
        <rect x="-26" y="28" width="52" height="5" rx="2.5" fill={LINE} />
        <rect x="-18" y="40" width="36" height="5" rx="2.5" fill={LINE} />
      </g>
      <g transform="translate(300 262) rotate(7)" filter={`url(#${id}-sh)`}>
        <path d="M0 -84 V-46" stroke={TINT} strokeWidth="5" />
        <rect x="-44" y="-50" width="88" height="112" rx="12" fill={PAPER} />
        <rect x="-44" y="-50" width="88" height="24" rx="12" fill={GREEN} />
        <rect x="-44" y="-36" width="88" height="10" fill={GREEN} />
        <circle cx="0" cy="2" r="16" fill="#e0a87a" />
        <rect x="-26" y="28" width="52" height="5" rx="2.5" fill={LINE} />
        <rect x="-18" y="40" width="36" height="5" rx="2.5" fill={LINE} />
      </g>
    </>
  );
}

const scenes: Record<SceneKind, (p: { id: string }) => JSX.Element> = {
  oci: Oci,
  attestation: Attestation,
  affidavit: Affidavit,
  visa: Visa,
  family: Family,
  student: Student,
  corporate: Corporate,
};

export function ServiceScene({ kind, uid, className }: { kind: SceneKind; uid: string; className?: string }) {
  const Scene = scenes[kind];
  const id = `sc-${uid}`;
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 480 360" preserveAspectRatio="xMidYMid meet" className={className}>
      <Defs id={id} />
      <ellipse cx="240" cy="190" rx="220" ry="160" fill={`url(#${id}-glow)`} />
      <Scene id={id} />
    </svg>
  );
}

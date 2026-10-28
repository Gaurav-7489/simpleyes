import type { JSX } from "react";
import type { IllustrationKind } from "@/content/services";

/**
 * Original, lightweight SVG illustrations in the reference's soft
 * neumorphic style. Purely decorative: hidden from assistive tech.
 * No government crests, seals or official-looking marks are used.
 */

const INK = "#1a1a1a";
const LINE = "#d7dad8";
const PAPER = "#fbfbfb";
const GREEN = "#6f9a3c";
const GREEN_DARK = "#3e6a00";
const GREEN_TINT = "#e2ecd3";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.10" />
        <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#000" floodOpacity="0.08" />
      </filter>
      <radialGradient id={`${id}-orb`} cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#9cc06c" />
        <stop offset="60%" stopColor={GREEN} />
        <stop offset="100%" stopColor={GREEN_DARK} />
      </radialGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={GREEN} stopOpacity="0.22" />
        <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Check({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" fill={`url(#${id}-orb)`} />
      <path d="M-4 0.5 L-1 3.5 L4.5 -3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Documents({ id }: { id: string }) {
  return (
    <>
      <ellipse cx="200" cy="140" rx="150" ry="110" fill={`url(#${id}-glow)`} />
      <rect x="118" y="44" width="150" height="190" rx="10" fill="#f1f2f1" transform="rotate(-7 193 139)" filter={`url(#${id}-sh)`} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="130" y="34" width="150" height="192" rx="10" fill={PAPER} />
      </g>
      <rect x="148" y="56" width="70" height="8" rx="4" fill={INK} opacity="0.85" />
      <rect x="148" y="72" width="104" height="5" rx="2.5" fill={LINE} />
      {[100, 132, 164, 196].map((y, i) => (
        <g key={y}>
          {i < 3 ? (
            <Check x={158} y={y} id={id} />
          ) : (
            <circle cx="158" cy={y} r="8.5" fill="none" stroke={LINE} strokeWidth="1.6" strokeDasharray="3 3" />
          )}
          <rect x="176" y={y - 6} width={i % 2 ? 72 : 88} height="5" rx="2.5" fill={i < 3 ? "#bfc3c0" : LINE} />
          <rect x="176" y={y + 2} width={i % 2 ? 50 : 60} height="4" rx="2" fill={LINE} />
        </g>
      ))}
      <path d="M268 30 v40 a10 10 0 0 1 -20 0 v-34" fill="none" stroke="#9aa19c" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Form({ id }: { id: string }) {
  return (
    <>
      <ellipse cx="200" cy="140" rx="150" ry="110" fill={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="86" y="36" width="228" height="196" rx="12" fill={PAPER} />
      </g>
      <rect x="106" y="56" width="80" height="8" rx="4" fill={INK} opacity="0.85" />
      {[
        { y: 82, w: 188, active: false, filled: true },
        { y: 124, w: 188, active: true, filled: false },
        { y: 166, w: 88, active: false, filled: true },
      ].map((f) => (
        <g key={f.y}>
          <rect x="106" y={f.y} width="52" height="5" rx="2.5" fill="#b9bdba" />
          <rect
            x="106"
            y={f.y + 12}
            width={f.w}
            height="24"
            rx="7"
            fill={f.active ? "#fff" : "#f2f3f2"}
            stroke={f.active ? GREEN : LINE}
            strokeWidth={f.active ? 1.6 : 1}
          />
          {f.filled && <rect x="116" y={f.y + 22} width={f.w * 0.42} height="5" rx="2.5" fill="#a9aeab" />}
          {f.active && <rect x="117" y={f.y + 17} width="1.6" height="14" rx="0.8" fill={GREEN_DARK} />}
        </g>
      ))}
      <rect x="204" y="178" width="90" height="24" rx="7" fill="#f2f3f2" stroke={LINE} />
      <rect x="214" y="188" width="40" height="5" rx="2.5" fill="#a9aeab" />
      <rect x="226" y="210" width="68" height="14" rx="7" fill={`url(#${id}-orb)`} />
    </>
  );
}

function Photo({ id }: { id: string }) {
  return (
    <>
      <ellipse cx="200" cy="140" rx="150" ry="110" fill={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="104" y="42" width="120" height="152" rx="10" fill={PAPER} />
      </g>
      <rect x="116" y="54" width="96" height="116" rx="6" fill={GREEN_TINT} />
      <circle cx="164" cy="98" r="20" fill="#c4d8a6" />
      <path d="M128 170 c4 -26 20 -38 36 -38 s32 12 36 38 z" fill="#c4d8a6" />
      {/* crop marks */}
      {[
        "M112 50 h10 M112 50 v10",
        "M216 50 h-10 M216 50 v10",
        "M112 174 h10 M112 174 v-10",
        "M216 174 h-10 M216 174 v-10",
      ].map((d) => (
        <path key={d} d={d} stroke={GREEN_DARK} strokeWidth="1.8" strokeLinecap="round" />
      ))}
      {/* dimension guides (illustrative only) */}
      <path d="M116 206 h96" stroke="#9aa19c" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M236 54 v116" stroke="#9aa19c" strokeWidth="1.2" strokeDasharray="3 3" />
      <g filter={`url(#${id}-sh)`}>
        <rect x="236" y="150" width="104" height="62" rx="10" fill={PAPER} />
      </g>
      <path
        d="M250 188 c8 -14 14 -16 16 -8 s-6 14 2 10 s10 -18 16 -12 s2 14 10 6 s8 -6 16 -2"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="250" y="198" width="76" height="1.5" fill={LINE} />
    </>
  );
}

function Appointment({ id }: { id: string }) {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  return (
    <>
      <ellipse cx="200" cy="140" rx="150" ry="110" fill={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="92" y="40" width="186" height="186" rx="12" fill={PAPER} />
      </g>
      <rect x="92" y="40" width="186" height="38" rx="12" fill="#f0f1f0" />
      <rect x="108" y="55" width="62" height="8" rx="4" fill={INK} opacity="0.85" />
      <rect x="126" y="32" width="6" height="18" rx="3" fill="#9aa19c" />
      <rect x="238" y="32" width="6" height="18" rx="3" fill="#9aa19c" />
      {cells.map((i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 108 + col * 32;
        const y = 92 + row * 32;
        const active = i === 12;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="24"
            height="24"
            rx="7"
            fill={active ? `url(#${id}-orb)` : i % 7 === 3 ? "#e9ebea" : "#f3f4f3"}
            stroke={active ? "none" : "#e3e5e4"}
          />
        );
      })}
      <g filter={`url(#${id}-sh)`}>
        <circle cx="292" cy="190" r="34" fill={PAPER} />
      </g>
      <circle cx="292" cy="190" r="26" fill="none" stroke={LINE} strokeWidth="1.5" />
      <path d="M292 172 v18 l12 8" fill="none" stroke={GREEN_DARK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Process({ id }: { id: string }) {
  const nodes = [
    { x: 92, y: 172 },
    { x: 162, y: 108 },
    { x: 238, y: 150 },
    { x: 308, y: 82 },
  ];
  return (
    <>
      <ellipse cx="200" cy="140" rx="160" ry="110" fill={`url(#${id}-glow)`} />
      <path
        d="M92 172 C120 172 132 108 162 108 S208 150 238 150 S280 82 308 82"
        fill="none"
        stroke="#c9cdca"
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      <path d="M92 172 C120 172 132 108 162 108 S208 150 238 150" fill="none" stroke={GREEN} strokeWidth="2.4" />
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <circle r="26" fill={PAPER} filter={`url(#${id}-sh)`} />
          <circle r={i === 2 ? 15 : 12} fill={i <= 2 ? `url(#${id}-orb)` : "#e9ebea"} />
          <text
            y="4"
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="600"
            fill={i <= 2 ? "#fff" : "#7c837e"}
          >
            {`0${i + 1}`}
          </text>
        </g>
      ))}
    </>
  );
}

function Personal({ id }: { id: string }) {
  return (
    <>
      <ellipse cx="200" cy="140" rx="150" ry="110" fill={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="84" y="56" width="176" height="62" rx="16" fill={PAPER} />
      </g>
      <rect x="102" y="74" width="120" height="6" rx="3" fill="#b9bdba" />
      <rect x="102" y="88" width="86" height="6" rx="3" fill={LINE} />
      <g filter={`url(#${id}-sh)`}>
        <rect x="140" y="134" width="176" height="62" rx="16" fill={`url(#${id}-orb)`} />
      </g>
      <rect x="158" y="152" width="124" height="6" rx="3" fill="#fff" opacity="0.9" />
      <rect x="158" y="166" width="90" height="6" rx="3" fill="#fff" opacity="0.6" />
      <g filter={`url(#${id}-sh)`}>
        <circle cx="94" cy="190" r="24" fill={PAPER} />
      </g>
      <circle cx="94" cy="184" r="7" fill="#c4d8a6" />
      <path d="M81 200 c3 -8 8 -11 13 -11 s10 3 13 11" fill="#c4d8a6" />
      <g transform="translate(330 104)">
        <circle r="13" fill={PAPER} filter={`url(#${id}-sh)`} />
        <circle cx="-5" r="2" fill="#9aa19c" />
        <circle r="2" fill="#9aa19c" />
        <circle cx="5" r="2" fill="#9aa19c" />
      </g>
    </>
  );
}

const map: Record<IllustrationKind, (props: { id: string }) => JSX.Element> = {
  documents: Documents,
  form: Form,
  photo: Photo,
  appointment: Appointment,
  process: Process,
  personal: Personal,
};

export function ServiceArt({
  kind,
  className,
  uid = "",
}: {
  kind: IllustrationKind;
  className?: string;
  /** Suffix to keep SVG ids unique if the same art appears twice on a page. */
  uid?: string;
}) {
  const Art = map[kind];
  const id = `art-${kind}${uid}`;
  return (
    <svg
      viewBox="0 0 400 260"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs id={id} />
      <Art id={id} />
    </svg>
  );
}

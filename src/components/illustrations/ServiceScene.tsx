/**
 * Original illustration per service (one consistent style: mint backdrop, white paper, green accents).
 * Pure SVG — no licensing questions, no image weight, no layout shift. Deliberately no seals, emblems, flags or
 * anything that could look official (§16). Each scene has a short description for screen readers.
 */
export type SceneKind = "oci" | "attestation" | "affidavit" | "visa" | "family" | "student" | "corporate";

const G = { dark: "#005c45", mid: "#00905a", light: "#8ed3a8", mint: "#e2f4e6", line: "#d6e2db", paper: "#ffffff", ink: "#13211d" };

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3faf5" />
          <stop offset="1" stopColor="#dff1e6" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#003a2c" floodOpacity="0.16" />
        </filter>
      </defs>
      <rect width="480" height="360" fill={`url(#${id}-bg)`} />
      <circle cx="240" cy="190" r="132" fill="#ffffff" opacity="0.55" />
      <path d="M0 312c80-24 160-26 240-8s160 22 240 0v56H0z" fill={G.light} opacity="0.35" />
    </>
  );
}

function Lines({ x, y, widths, gap = 14 }: { x: number; y: number; widths: number[]; gap?: number }) {
  return (
    <g fill={G.line}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height="6" rx="3" />
      ))}
    </g>
  );
}

function Scene({ kind, id }: { kind: SceneKind; id: string }) {
  const shadow = `url(#${id}-shadow)`;
  switch (kind) {
    case "oci":
      return (
        <g filter={shadow}>
          <rect x="120" y="104" width="240" height="152" rx="16" fill={G.paper} />
          <rect x="120" y="104" width="240" height="34" rx="16" fill={G.mid} />
          <rect x="120" y="122" width="240" height="16" fill={G.mid} />
          <rect x="140" y="114" width="44" height="14" rx="7" fill="#ffffff" opacity="0.9" />
          <text x="162" y="125" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill={G.dark}>
            OCI
          </text>
          <rect x="142" y="154" width="62" height="76" rx="10" fill={G.mint} />
          <circle cx="173" cy="182" r="14" fill={G.light} />
          <path d="M151 222c4-16 14-22 22-22s18 6 22 22z" fill={G.light} />
          <Lines x={222} y={160} widths={[110, 84, 96, 64]} />
          <circle cx="340" cy="240" r="20" fill={G.dark} />
          <path d="m331 240 6 6 12-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "attestation":
      return (
        <>
          <g filter={shadow}>
            <rect x="132" y="82" width="200" height="236" rx="14" fill={G.paper} />
            <rect x="160" y="108" width="144" height="10" rx="5" fill={G.dark} opacity="0.85" />
            <Lines x={160} y={136} widths={[144, 120, 136, 96, 128]} />
            <rect x="160" y="226" width="80" height="6" rx="3" fill={G.line} />
          </g>
          <g filter={shadow}>
            <circle cx="290" cy="262" r="30" fill={G.mid} />
            <circle cx="290" cy="262" r="20" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 4" />
            <path d="m276 290-8 30 14-8 8 14 6-32zM304 290l8 30-14-8-8 14-6-32z" fill={G.dark} />
          </g>
          <g transform="rotate(-18 368 150)" filter={shadow}>
            <rect x="356" y="96" width="24" height="62" rx="10" fill={G.dark} />
            <rect x="338" y="156" width="60" height="18" rx="6" fill={G.mid} />
            <rect x="334" y="172" width="68" height="8" rx="3" fill={G.light} />
          </g>
        </>
      );
    case "affidavit":
      return (
        <>
          <g filter={shadow}>
            <rect x="136" y="70" width="196" height="246" rx="14" fill={G.paper} />
            <rect x="160" y="96" width="110" height="10" rx="5" fill={G.dark} opacity="0.85" />
            <Lines x={160} y={124} widths={[148, 132, 148, 110, 140, 90]} />
            <path d="M162 262c14-18 22 6 34-6s14-20 26-4 18 4 26-2" fill="none" stroke={G.dark} strokeWidth="3.5" strokeLinecap="round" />
            <rect x="160" y="276" width="124" height="3" rx="1.5" fill={G.line} />
          </g>
          <g transform="rotate(38 330 228)" filter={shadow}>
            <rect x="320" y="150" width="20" height="120" rx="8" fill={G.mid} />
            <rect x="320" y="150" width="20" height="26" rx="8" fill={G.dark} />
            <path d="M320 268h20l-10 26z" fill="#f1d9a8" />
            <path d="M327 286h6l-3 8z" fill={G.ink} />
          </g>
        </>
      );
    case "visa":
      return (
        <>
          <path d="M96 252C150 150 250 110 372 112" fill="none" stroke={G.mid} strokeWidth="3" strokeDasharray="6 9" strokeLinecap="round" />
          <g filter={shadow}>
            <rect x="104" y="170" width="170" height="120" rx="12" fill={G.mint} />
            <rect x="104" y="158" width="76" height="26" rx="10" fill={G.light} />
            <rect x="120" y="188" width="140" height="92" rx="10" fill={G.paper} />
            <Lines x={136} y={206} widths={[96, 108, 80, 100]} />
          </g>
          <g transform="translate(330 70) rotate(18)" filter={shadow}>
            <path
              d="M40 4c6 0 10 4 10 10v30l40 26v14l-40-12v24l12 10v10l-22-7-22 7v-10l12-10V72L-10 84V70l40-26V14c0-6 4-10 10-10z"
              fill={G.dark}
            />
          </g>
          <circle cx="96" cy="252" r="8" fill={G.dark} />
        </>
      );
    case "family":
      return (
        <>
          <g filter={shadow}>
            <rect x="262" y="104" width="128" height="164" rx="14" fill={G.paper} />
            <rect x="282" y="126" width="64" height="9" rx="4.5" fill={G.dark} opacity="0.85" />
            <Lines x={282} y={150} widths={[86, 72, 86, 60, 78]} gap={16} />
            <circle cx="366" cy="246" r="12" fill={G.mid} />
            <path d="m360 246 4 4 8-9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g filter={shadow}>
            <circle cx="132" cy="150" r="26" fill={G.light} />
            <path d="M88 268c0-48 18-76 44-76s44 28 44 76z" fill={G.mid} />
            <circle cx="210" cy="158" r="24" fill="#a6dc5c" />
            <path d="M170 268c0-44 16-70 40-70s40 26 40 70z" fill={G.dark} />
            <circle cx="172" cy="214" r="16" fill="#f1d9a8" />
            <path d="M146 270c0-28 10-44 26-44s26 16 26 44z" fill={G.light} />
          </g>
        </>
      );
    case "student":
      return (
        <>
          <g filter={shadow}>
            <rect x="214" y="144" width="176" height="128" rx="12" fill={G.paper} />
            <rect x="234" y="164" width="96" height="10" rx="5" fill={G.dark} opacity="0.85" />
            <Lines x={234} y={190} widths={[136, 116, 128]} gap={16} />
            <circle cx="360" cy="246" r="14" fill={G.mid} />
            <path d="m354 260-4 18 10-6 10 6-4-18" fill={G.dark} />
          </g>
          <g filter={shadow}>
            <path d="M96 136 176 102l80 34-80 34z" fill={G.dark} />
            <path d="M126 150v32c0 10 22 20 50 20s50-10 50-20v-32l-50 20z" fill={G.mid} />
            <path d="M246 140v44" stroke={G.dark} strokeWidth="4" strokeLinecap="round" />
            <circle cx="246" cy="190" r="7" fill="#a6dc5c" />
          </g>
          <g transform="rotate(-10 150 250)" filter={shadow}>
            <rect x="96" y="232" width="118" height="32" rx="16" fill="#f7fbf8" />
            <rect x="96" y="232" width="28" height="32" rx="14" fill={G.mint} />
            <rect x="140" y="244" width="58" height="8" rx="4" fill={G.mid} />
          </g>
        </>
      );
    case "corporate":
      return (
        <>
          <g filter={shadow}>
            <rect x="104" y="96" width="120" height="196" rx="10" fill={G.paper} />
            <g fill={G.mint}>
              {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={122 + c * 30} y={116 + r * 30} width="20" height="18" rx="3" />),
              )}
            </g>
            <rect x="148" y="252" width="32" height="40" rx="4" fill={G.mid} />
          </g>
          <g filter={shadow}>
            <rect x="250" y="168" width="140" height="104" rx="14" fill={G.dark} />
            <rect x="296" y="150" width="48" height="24" rx="8" fill="none" stroke={G.dark} strokeWidth="8" />
            <rect x="250" y="206" width="140" height="10" fill={G.mid} />
            <rect x="310" y="200" width="20" height="22" rx="4" fill="#a6dc5c" />
          </g>
          <g filter={shadow}>
            <rect x="300" y="236" width="104" height="70" rx="10" fill={G.paper} />
            <Lines x={316} y={252} widths={[72, 56, 66]} gap={14} />
          </g>
        </>
      );
  }
}

export function ServiceScene({ kind, uid, label, className }: { kind: SceneKind; uid: string; label: string; className?: string }) {
  const id = `ss-${uid}`;
  return (
    <svg role="img" aria-label={label} focusable="false" viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className={className}>
      <Backdrop id={id} />
      <Scene kind={kind} id={id} />
    </svg>
  );
}

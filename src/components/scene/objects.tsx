import type { ReactNode } from "react";

/**
 * Document objects for the Living Document System. Each renders plain, decorative HTML styled by
 * src/styles/scene.css. All artwork is original and abstract: no emblems, seals, country names,
 * personal data or official layouts.
 */
export type ObjectKind =
  | "sheet"
  | "vellum"
  | "booklet"
  | "spread"
  | "card"
  | "envelope"
  | "folder"
  | "stamp"
  | "pen"
  | "scroll"
  | "check"
  | "tag";

export type SheetVariant = "lines" | "checklist" | "form" | "certificate" | "declaration" | "notes" | "blank";

/** Width percentages for decorative text lines — fixed, so server and client render identically. */
const L = [92, 78, 86, 64, 88, 72, 58, 81];

function Lines({ count, start = 0, tone }: { count: number; start?: number; tone?: "g" | "lime" }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`ln${tone ? ` ln-${tone}` : ""}`} style={{ width: `${L[(i + start) % L.length]}%` }} />
      ))}
    </>
  );
}

function Checks({ count, on }: { count: number; on: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="mark-row">
          <span className="mark-box" data-on={i < on ? "" : undefined} />
          <div className="ln" style={{ width: `${L[(i + 2) % L.length]}%` }} />
        </div>
      ))}
    </>
  );
}

function sheetContent(variant: SheetVariant, checked: number): ReactNode {
  switch (variant) {
    case "checklist":
      return (
        <>
          <div className="ln ln-h" style={{ width: "54%" }} />
          <Checks count={6} on={checked} />
        </>
      );
    case "form":
      return (
        <>
          <div style={{ display: "flex", gap: "1.4em", alignItems: "flex-start" }}>
            <div className="mark-photo" />
            <div style={{ flex: 1 }}>
              <div className="ln ln-h" style={{ width: "80%" }} />
              <Lines count={3} />
            </div>
          </div>
          <div className="ln-gap" />
          <Lines count={5} start={3} />
        </>
      );
    case "certificate":
      return (
        <>
          <div className="ln ln-h" style={{ width: "62%", margin: "0 auto" }} />
          <div className="ln ln-g" style={{ width: "40%", margin: "1.2em auto 0" }} />
          <div style={{ marginTop: "1.6em" }}>
            {[84, 70, 78].map((w) => (
              <div key={w} className="ln" style={{ width: `${w}%`, marginInline: "auto" }} />
            ))}
          </div>
          <span className="mark-ribbon" />
        </>
      );
    case "declaration":
      return (
        <>
          <div className="ln ln-h" style={{ width: "48%" }} />
          <Lines count={8} start={1} />
          <div className="mark-sign" />
        </>
      );
    case "notes":
      return <Lines count={5} start={4} tone="g" />;
    case "blank":
      return null;
    default:
      return (
        <>
          <div className="ln ln-h" style={{ width: "58%" }} />
          <Lines count={7} />
        </>
      );
  }
}

export type ObjectProps = {
  kind: ObjectKind;
  variant?: SheetVariant;
  /** Visual tone, e.g. "mint" paper or folder, "landscape" or "note" sheet. */
  tone?: string;
  /** Checklist: how many boxes are ticked. */
  checked?: number;
  /** Abstract review mark printed on a sheet. */
  imprint?: boolean;
};

export function DocumentObject({ kind, variant = "lines", tone, checked = 3, imprint }: ObjectProps) {
  switch (kind) {
    case "sheet":
      return (
        <div className="o-sheet" data-variant={variant} data-tone={tone}>
          {sheetContent(variant, checked)}
          {imprint && <span className="mark-imprint" style={{ right: "12%", bottom: "9%" }} />}
        </div>
      );
    case "vellum":
      return (
        <div className="o-vellum">
          {variant === "checklist" ? (
            <>
              <div className="ln ln-g" style={{ width: "50%", height: "1em" }} />
              <Checks count={5} on={checked} />
            </>
          ) : (
            <Lines count={7} start={2} />
          )}
        </div>
      );
    case "booklet":
      return (
        <div className="o-booklet">
          <div className="o-booklet-pages" />
          <div className="o-booklet-cover">
            <span className="o-booklet-mark" />
            <div className="o-booklet-lines">
              <div className="ln" style={{ width: "100%" }} />
              <div className="ln" style={{ width: "64%" }} />
            </div>
          </div>
        </div>
      );
    case "spread":
      return (
        <div className="o-spread">
          <span className="o-spread-cover" />
          <div className="o-spread-page">
            <div className="ln ln-g" style={{ width: "46%" }} />
            <div style={{ display: "flex", gap: "1.2em", marginTop: "1.4em" }}>
              <div className="mark-photo" style={{ width: "5em" }} />
              <div style={{ flex: 1 }}>
                <Lines count={4} />
              </div>
            </div>
            <Lines count={2} start={4} />
          </div>
          <div className="o-spread-page">
            <Lines count={3} start={2} />
            <div className="ln-gap" />
            <Lines count={3} start={5} />
          </div>
        </div>
      );
    case "card":
      return (
        <div className="o-card">
          <div className="o-card-band" />
          <div className="o-card-body">
            <div className="mark-photo" style={{ flex: "none" }} />
            <div>
              <div className="ln ln-h" style={{ width: "72%" }} />
              <Lines count={3} start={1} />
            </div>
          </div>
          <span className="o-card-chip" />
        </div>
      );
    case "envelope":
      return (
        <div className="o-envelope">
          <span className="o-envelope-flap" />
          <span className="o-envelope-seal" />
        </div>
      );
    case "folder":
      return (
        <div className="o-folder" data-tone={tone}>
          <div className="o-folder-back" />
          <div className="o-folder-paper">
            <Lines count={3} />
          </div>
          <div className="o-folder-paper">
            <div className="ln ln-h" style={{ width: "50%" }} />
            <Lines count={2} start={3} />
          </div>
          <div className="o-folder-front" />
        </div>
      );
    case "stamp":
      return (
        <div className="o-stamp">
          <span className="o-stamp-base" />
          <span className="o-stamp-neck" />
          <span className="o-stamp-knob" />
        </div>
      );
    case "pen":
      return <div className="o-pen" />;
    case "scroll":
      return <div className="o-scroll" />;
    case "check":
      return <div className="o-check" />;
    case "tag":
      return (
        <div className="o-tag">
          <div className="ln ln-g" style={{ width: "70%" }} />
          <div className="ln" style={{ width: "48%" }} />
        </div>
      );
  }
}

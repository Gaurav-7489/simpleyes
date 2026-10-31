import type { ReactNode } from "react";

/**
 * Editorial section label: optional section number, a short brand-gradient rule
 * and sentence-case text. Replaces the generic uppercase "• LABEL" pill.
 */
export function Badge({ children, className, index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <p className={`eyebrow ${className ?? ""}`}>
      {index && <span className="eyebrow-index">{index}</span>}
      <span aria-hidden="true" className="eyebrow-rule" />
      <span>{children}</span>
    </p>
  );
}

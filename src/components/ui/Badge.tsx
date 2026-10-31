import type { ReactNode } from "react";

/**
 * Agencee-style section label: a soft glass pill with a small icon (or dot)
 * and uppercase text, as used above every section heading in the reference.
 */
export function Badge({
  children,
  className,
  icon,
  index,
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  /** Optional section number, shown before the label. */
  index?: string;
}) {
  return (
    <p className={`apill ${className ?? ""}`}>
      {icon ? (
        <span aria-hidden="true" className="apill-icon">
          {icon}
        </span>
      ) : (
        <span aria-hidden="true" className="apill-dot" />
      )}
      {index && <span className="apill-index">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

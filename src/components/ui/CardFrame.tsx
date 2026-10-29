import type { ReactNode } from "react";

/**
 * The reference's signature three-layer card: a soft outer frame (20px),
 * an inset well (14px) and the raised card itself (8px).
 */
export function CardFrame({
  children,
  className,
  cardClassName,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
  hover?: boolean;
}) {
  return (
    <div className={`frame ${hover ? "card-hover" : ""} ${className ?? ""}`} data-tilt={hover ? "" : undefined}>
      <div className="frame-inner">
        <div className={`card ${cardClassName ?? ""}`}>{children}</div>
      </div>
    </div>
  );
}

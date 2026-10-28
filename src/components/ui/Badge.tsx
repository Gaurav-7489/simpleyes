import type { ReactNode } from "react";

/** Uppercase section label pill, as used above every reference section heading. */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`badge ${className ?? ""}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-600" />
      {children}
    </p>
  );
}

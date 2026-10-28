import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

/** Visible marker for legal content that still needs business-owner / legal review. */
export function PendingReview({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-[14px] border border-dashed border-[#c99a2e]/50 bg-[#fbf6ea] px-4 py-3 text-sm leading-relaxed text-[#5c4510]"
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
      <div>{children}</div>
    </div>
  );
}

/** Inline placeholder for a missing, required legal detail. Never filled with guesses. */
export function Missing({ label }: { label: string }) {
  return <span className="rounded bg-[#fbf6ea] px-1.5 py-0.5 text-[#5c4510]">[{label} — to be provided]</span>;
}

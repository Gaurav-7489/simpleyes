import Link from "next/link";
import { site } from "@/content/site";

/** Original SimplYes wordmark: a soft brand orb + lower-case name with a green full stop. */
export function Wordmark({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const mark = (
    <>
      <span
        aria-hidden="true"
        className="inline-block size-[18px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #ffffff 0%, #cfe0b6 30%, #6f9a3c 70%, #3e6a00 100%)",
          boxShadow: "0 2px 6px -1px rgb(62 106 0 / 0.45)",
        }}
      />
      <span className="font-display text-[1.375rem] font-medium leading-none tracking-[-0.03em] text-ink">
        {site.wordmark}
        <span className="text-accent-600">.</span>
      </span>
    </>
  );

  if (!asLink) {
    return <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>{mark}</span>;
  }

  return (
    <Link href="/" aria-label={`${site.name} — home`} className={`inline-flex min-h-11 items-center gap-2 rounded-md ${className ?? ""}`}>
      {mark}
    </Link>
  );
}

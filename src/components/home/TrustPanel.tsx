import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { independenceStatement } from "@/content/home";
import { Badge } from "@/components/ui/Badge";

/** §07 section 8 — Trust & independence: calm mint panel, shield icon, approved statement, disclaimer link. */
export function TrustPanel() {
  return (
    <section aria-labelledby="trust-title" className="section !pt-0">
      <div className="container-site">
        <div
          className="flex flex-col gap-5 rounded-[24px] border border-accent-100 bg-accent-50 p-6 sm:flex-row sm:items-start sm:gap-7 sm:p-10"
          data-reveal
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-[16px] bg-white text-accent-700 ring-1 ring-accent-100">
            <ShieldCheck aria-hidden="true" className="size-7" strokeWidth={1.6} />
          </span>
          <div className="flex flex-col gap-3">
            <Badge index="07">Trust &amp; independence</Badge>
            <h2 id="trust-title" className="type-h2 !text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
              Independent and transparent
            </h2>
            <p className="max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink">{independenceStatement}</p>
            <Link href="/disclaimer/" className="link-tertiary">
              Read our disclaimer
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

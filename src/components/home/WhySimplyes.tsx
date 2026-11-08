import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeWhy } from "@/content/home";
import { revealDelay } from "@/lib/style";
import { IconTile } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Why SimplYes — four focused, verifiable points; no speed, approval or outcome claims. */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section section-tint">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            id="why-title"
            badge="Why SimplYes"
            title="Straightforward help, honestly scoped"
            lead="Documentation can be understandable. We explain what applies, help you prepare, and stay clear about what remains with the authorities."
            align="left"
          />
          <Link href="/about/" className="link-tertiary" data-reveal>
            About SimplYes
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {homeWhy.map((item, i) => (
            <li key={item.title} className="card flex gap-4 !bg-canvas !p-5 !shadow-none sm:flex-col sm:!p-7" data-reveal style={revealDelay((i % 2) * 70)}>
              <IconTile name={item.icon} />
              <div>
                <h3 className="type-card-title">{item.title}</h3>
                <p className="type-body mt-1.5">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

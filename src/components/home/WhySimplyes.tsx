import { whyItems } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { revealDelay } from "@/lib/style";

/** §07 section 4 — Why SimplYes? Benefits only, icon + short label grid. */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section bg-white">
      <div className="container-site">
        <SectionHeading
          id="why-title"
          badge="Why SimplYes"
          title="Support that keeps things simple"
          lead="Clear, honest help with documentation — for one person or a whole household."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {whyItems.map((item, i) => (
            <li
              key={item.title}
              className="card flex flex-col gap-3"
              data-reveal
              style={revealDelay((i % 4) * 60)}
            >
              <IconTile name={item.icon} />
              <h3 className="type-card-title">{item.title}</h3>
              <p className="type-body">{item.body}</p>
            </li>
          ))}
          <li className="card card-mint flex flex-col items-start justify-between gap-4" data-reveal>
            <p className="type-card-title">Ready to start?</p>
            <ButtonLink href="/contact/" size="sm" location="why">
              Get Assistance
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

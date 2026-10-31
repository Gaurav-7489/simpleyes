import { approach } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { ServiceArt } from "@/components/illustrations/ServiceArt";

/** §07 section 7 — Our approach: five-point timeline beside an illustration. Human, structured, calm. */
export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="section">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <Badge>Our approach</Badge>
          <h2 id="approach-title" className="type-h2 mt-5 max-w-[18ch]">
            Calm, structured and human
          </h2>
          <ol className="stepper stepper-vertical mt-8">
            {approach.map((point, i) => (
              <li key={point} className="stepper-item">
                <span className="stepper-num" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="self-center text-[1.0625rem] font-medium text-ink">{point}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="card-art aspect-[4/3] w-full" data-reveal aria-hidden="true">
          <ServiceArt kind="process" className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  );
}

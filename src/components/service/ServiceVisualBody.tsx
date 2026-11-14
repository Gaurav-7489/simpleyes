import { CalendarClock, FilePen, TriangleAlert, UserPlus, type LucideIcon } from "lucide-react";
import type { Service, VisualIcon } from "@/content/services";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";

const icons: Record<VisualIcon, LucideIcon> = {
  calendar: CalendarClock,
  alert: TriangleAlert,
  edit: FilePen,
  new: UserPlus,
};

/**
 * Short, visual service page body: the situations as icon tiles, then one call to action.
 * Used when a service defines `visual`; the FAQs and the closing CTA follow from the page.
 */
export function ServiceVisualBody({ service, ctaHref, ctaLabel }: { service: Service; ctaHref: string; ctaLabel: string }) {
  const v = service.visual!;
  return (
    <section aria-labelledby="situations" className="section !pt-0">
      <div className="container-site">
        <h2 id="situations" className="type-h2 text-center" data-reveal>
          Which one is you?
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-4">
          {v.situations.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.label} className="visual-tile" data-reveal style={revealDelay(i * 60)}>
                <span className="visual-icon">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <span className="font-display text-[clamp(1rem,0.92rem+0.4vw,1.25rem)] font-medium leading-snug text-ink">
                  {s.label}
                </span>
                <span className="text-sm text-ink-3">{s.hint}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 flex justify-center" data-reveal>
          <ButtonLink href={ctaHref} location="service-mid">
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

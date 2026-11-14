import {
  BookUser,
  Building2,
  CalendarClock,
  Camera,
  CircleCheck,
  CircleX,
  FilePen,
  FolderCheck,
  House,
  Mail,
  MessageCircle,
  Route,
  TriangleAlert,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import type { Service, VisualIcon } from "@/content/services";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";

const icons: Record<VisualIcon, LucideIcon> = {
  calendar: CalendarClock,
  alert: TriangleAlert,
  edit: FilePen,
  new: UserPlus,
  chat: MessageCircle,
  route: Route,
  folder: FolderCheck,
  building: Building2,
  passport: BookUser,
  home: House,
  camera: Camera,
  mail: Mail,
  check: CircleCheck,
  cross: CircleX,
};

function VIcon({ name, className }: { name: VisualIcon; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className ?? "size-6"} strokeWidth={1.75} />;
}

/**
 * Short, visual service page body: situations, steps, what to have ready and the scope — a few
 * words per item with an icon, instead of paragraphs. Used when a service defines `visual`.
 */
export function ServiceVisualBody({ service, ctaHref, ctaLabel }: { service: Service; ctaHref: string; ctaLabel: string }) {
  const v = service.visual!;
  return (
    <>
      {/* Which situation applies */}
      <section aria-labelledby="situations" className="section !pt-0">
        <div className="container-site">
          <h2 id="situations" className="type-h2 text-center" data-reveal>
            Which one is you?
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-4">
            {v.situations.map((s, i) => (
              <li key={s.label} className="visual-tile" data-reveal style={revealDelay(i * 60)}>
                <span className="visual-icon">
                  <VIcon name={s.icon} />
                </span>
                <span className="font-display text-[clamp(1rem,0.92rem+0.4vw,1.25rem)] font-medium leading-snug text-ink">
                  {s.label}
                </span>
                <span className="text-sm text-ink-3">{s.hint}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="service-process" className="section bg-white">
        <div className="container-site">
          <h2 id="service-process" className="type-h2 text-center" data-reveal>
            How it works
          </h2>
          <ol className="visual-steps mt-10 lg:mt-12" data-reveal>
            {v.steps.map((step, i) => (
              <li key={step.label}>
                <span className="visual-step-icon">
                  <VIcon name={step.icon} />
                  <span className="visual-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                </span>
                <span className="text-[0.9375rem] font-medium leading-snug text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center" data-reveal>
            <ButtonLink href={ctaHref} location="service-mid">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* What to have ready · What we do and don't */}
      <section aria-label="Preparation and scope" className="section">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card flex flex-col gap-5" data-reveal>
            <h2 id="what-to-prepare" className="type-card-title">
              Have ready
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              {v.ready.map((r) => (
                <li key={r.label} className="flex flex-col items-start gap-3 rounded-[16px] bg-canvas-alt p-4">
                  <span className="visual-icon visual-icon-sm">
                    <VIcon name={r.icon} className="size-5" />
                  </span>
                  <span className="text-[0.9375rem] font-medium leading-snug text-ink">{r.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto text-sm leading-relaxed text-ink-3">
              Please don&apos;t send passport numbers or documents with your enquiry. Indicative only, subject to
              verification against current official requirements.
            </p>
          </div>

          <div className="card grid gap-6 sm:grid-cols-2" data-reveal style={revealDelay(90)}>
            <div>
              <h2 id="whats-included" className="type-card-title">
                We help with
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {v.weDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                    <VIcon name="check" className="mt-0.5 size-5 shrink-0 text-accent-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 id="outside-scope" className="type-card-title">
                We don&apos;t
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {v.weDont.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                    <VIcon name="cross" className="mt-0.5 size-5 shrink-0 text-ink-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm leading-relaxed text-ink-3 sm:col-span-2">
              {site.name} is independent — not an embassy, consulate or government authority.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

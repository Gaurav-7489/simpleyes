import type { ReactNode } from "react";
import { CircleCheck, Info, MessageCircleQuestion } from "lucide-react";


const icons = {
  check: { Icon: CircleCheck, className: "text-accent-700" },
  info: { Icon: Info, className: "text-ink-3" },
  question: { Icon: MessageCircleQuestion, className: "text-accent-700" },
} as const;

/** Titled list card used for the sections of a service page. */
export function ServiceSection({
  id,
  title,
  items,
  icon = "check",
  className,
  children,
}: {
  id: string;
  title: string;
  items: readonly string[];
  icon?: keyof typeof icons;
  className?: string;
  children?: ReactNode;
}) {
  const { Icon, className: iconClass } = icons[icon];
  return (
    <div className={`card flex flex-col gap-4 ${className ?? "h-full"}`}>
      <h2 id={id} className="type-card-title">
        {title}
      </h2>
      <ul className="flex max-w-[60ch] flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
            <Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${iconClass}`} strokeWidth={1.75} />
            {item}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

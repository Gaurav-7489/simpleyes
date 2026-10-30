import type { ReactNode } from "react";
import { CircleCheck, Info, MessageCircleQuestion } from "lucide-react";
import { CardFrame } from "@/components/ui/CardFrame";

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
    <CardFrame className={className ?? "h-full"} cardClassName="flex h-full flex-col gap-4">
      <h2 id={id} className="type-card-title">
        {title}
      </h2>
      <ul className="flex max-w-[52ch] flex-col gap-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
            <Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${iconClass}`} strokeWidth={1.75} />
            {item}
          </li>
        ))}
      </ul>
      {children}
    </CardFrame>
  );
}

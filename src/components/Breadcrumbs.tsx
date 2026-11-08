import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail (matches the BreadcrumbList JSON-LD on each page). */
export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-ink-3">
        <li>
          <Link href="/" className="inline-flex min-h-8 items-center rounded px-1 transition-colors hover:text-ink hover:underline underline-offset-4">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              <ChevronRight aria-hidden="true" className="size-3.5 text-ink-3/70" />
              {last ? (
                <span aria-current="page" className="px-1 text-ink-2">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="inline-flex min-h-8 items-center rounded px-1 transition-colors hover:text-ink hover:underline underline-offset-4">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

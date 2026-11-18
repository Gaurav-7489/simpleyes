"use client";

import { usePathname } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { site } from "@/content/site";
import { urgentWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";

const DEFAULT_QUESTION = "Lost your passport or need to travel urgently?";

/** Thin dark strip above the header: the emergency route, on every page. Service pages may ask their own question. */
export function UrgentBar({ questions }: { questions: Record<string, string> }) {
  const pathname = usePathname() ?? "/";
  const slug = /^\/services\/([^/]+)\/?$/.exec(pathname)?.[1];
  const question = (slug && questions[slug]) || DEFAULT_QUESTION;
  return (
    <div className="urgent-bar">
      <p className="container-site flex items-center justify-center gap-2">
        <AlertCircle aria-hidden="true" className="hidden size-3.5 shrink-0 sm:block" strokeWidth={2} />
        <span>
          <span className="hidden sm:inline">{question} </span>
          <span className="sm:hidden">Urgent? </span>
          WhatsApp{" "}
          <a
            href={whatsappHrefForMessage(urgentWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-cta-location="urgent-bar"
            data-topic="urgent"
          >
            {site.whatsapp.display}
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>{" "}
          and start with URGENT.
        </span>
      </p>
    </div>
  );
}

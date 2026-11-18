import { AlertCircle } from "lucide-react";
import { site } from "@/content/site";
import { urgentWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";

/** Thin dark strip above the header: the emergency route, on every page. */
export function UrgentBar() {
  return (
    <div className="urgent-bar">
      <p className="container-site flex items-center justify-center gap-2">
        <AlertCircle aria-hidden="true" className="hidden size-3.5 shrink-0 sm:block" strokeWidth={2} />
        <span>
          <span className="hidden sm:inline">Lost your passport or need to travel urgently? </span>
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

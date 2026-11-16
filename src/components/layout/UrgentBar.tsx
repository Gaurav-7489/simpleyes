import { CircleAlert } from "lucide-react";
import { site } from "@/content/site";
import { whatsappHrefForMessage } from "@/lib/whatsapp";

export const urgentWhatsappMessage = "URGENT: Hello Simplyes, I need urgent help with my Indian passport or travel to India.";

/** The thin emergency strip above the header on every page. */
export function UrgentBar() {
  return (
    <div className="urgent-bar">
      <p className="container-site urgent-bar-inner">
        <span className="urgent-bar-q">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
          Lost your passport or need to travel urgently?
        </span>{" "}
        <span>
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

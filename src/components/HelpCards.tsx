import Link from "next/link";
import { AlertCircle, CalendarCheck, Check } from "lucide-react";
import { urgentWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";

/** The two routes people most often arrive with: an appointment to book, or an emergency. */
export function HelpCards({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="help-cards">
      <div className="help-card">
        <div className="help-card-head">
          <span className="help-card-icon">
            <CalendarCheck aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <Heading className="help-card-title">Appointment booking</Heading>
        </div>
        <p className="help-card-body">
          No slots in sight? We help you book your appointment at the Indian Embassy, Consulate or application centre,
          and make sure your documents are ready on the day.
        </p>
        <ul className="tick-list mt-5">
          {["Passport, e-OCI, visa and attestation", "Berlin, Frankfurt, Munich and Hamburg", "A checklist of what to bring"].map((item) => (
            <li key={item}>
              <span className="tick" aria-hidden="true">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <Link href="/appointments/" className="btn btn-dark mt-6 self-start" data-cta-location="help-cards">
          <span className="btn-face">Book with us</span>
        </Link>
      </div>

      <div className="help-card" data-urgent="">
        <div className="help-card-head">
          <span className="help-card-icon">
            <AlertCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <Heading className="help-card-title">Emergency assistance</Heading>
        </div>
        <p className="help-card-body">
          Lost passport, a family emergency or urgent travel to India? Message us first. We tell you the correct route
          and prepare your papers.
        </p>
        <ul className="dot-list mt-5">
          <li>Lost or stolen passport: police report and affidavits</li>
          <li>Emergency Certificate for urgent travel to India</li>
          <li>Urgent visa for family members</li>
        </ul>
        <a
          href={whatsappHrefForMessage(urgentWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp"
          data-cta-location="help-cards"
          data-topic="urgent"
          className="btn btn-urgent mt-6 self-start"
        >
          <span className="btn-face">
            Message URGENT<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </span>
        </a>
      </div>
    </div>
  );
}

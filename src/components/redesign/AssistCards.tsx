import Link from "next/link";
import { CalendarDays, CircleAlert } from "lucide-react";
import { whatsappHrefForMessage } from "@/lib/whatsapp";
import { urgentWhatsappMessage } from "@/components/layout/UrgentBar";
import { CheckRows } from "./bits";

export const urgentHref = whatsappHrefForMessage(urgentWhatsappMessage);
export const appointmentWhatsappMessage = "Hello Simplyes, I would like help booking my appointment at the Indian Embassy or Consulate.";

/** "Message URGENT" button (rust). */
export function UrgentButton({ className, location, label = "Message URGENT" }: { className?: string; location: string; label?: string }) {
  return (
    <a
      href={urgentHref}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-location={location}
      data-topic="urgent"
      className={`btn btn-urgent ${className ?? ""}`}
    >
      <span className="btn-face">
        {label}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </span>
    </a>
  );
}

/** Homepage pair: Appointment booking and Emergency assistance. */
export function AssistCards() {
  return (
    <section aria-label="Appointments and emergencies" className="assist-section">
      <div className="container-site assist-grid">
        <article className="assist-card">
          <div className="assist-card-head">
            <span className="assist-icon" aria-hidden="true">
              <CalendarDays className="size-5" strokeWidth={1.75} />
            </span>
            <h2 className="assist-title">Appointment booking</h2>
          </div>
          <p className="assist-lead">
            No slots in sight? We help you book your appointment at the Indian Embassy, Consulate or application centre, and
            make sure your documents are ready on the day.
          </p>
          <CheckRows
            className="mt-5"
            items={[
              { title: "Passport, e-OCI, visa and attestation" },
              { title: "Berlin, Frankfurt, Munich and Hamburg" },
              { title: "A checklist of what to bring" },
            ]}
          />
          <Link href="/appointments/" className="btn btn-dark btn-sm mt-6" data-cta-location="home-appointments">
            <span className="btn-face">Book with us</span>
          </Link>
        </article>

        <article className="assist-card" data-tone="urgent">
          <div className="assist-card-head">
            <span className="assist-icon" aria-hidden="true">
              <CircleAlert className="size-5" strokeWidth={1.75} />
            </span>
            <h2 className="assist-title">Emergency assistance</h2>
          </div>
          <p className="assist-lead">
            Lost passport, a family emergency or urgent travel to India? Message us first. We tell you the correct route and
            prepare your papers.
          </p>
          <ul className="dot-list mt-5">
            <li>Lost or stolen passport: police report and affidavits</li>
            <li>Emergency Certificate for urgent travel to India</li>
            <li>Urgent visa for family members</li>
          </ul>
          <UrgentButton className="btn-sm mt-6" location="home-emergency" />
        </article>
      </div>
    </section>
  );
}

/** Service-page sidebar: the same two offers, compact. */
export function AssistSidebar({ included }: { included: string[] }) {
  return (
    <aside className="service-aside" aria-label="Appointments, emergencies and what is included">
      <div className="side-card">
        <h2 className="side-card-title">Appointment booking</h2>
        <p className="side-card-text">
          We help you book your appointment at the Embassy, Consulate or application centre, with a checklist for the day.
        </p>
        <Link href="/appointments/" className="btn btn-dark btn-block mt-5" data-cta-location="service-aside">
          <span className="btn-face">Book with us</span>
        </Link>
      </div>
      <div className="side-card" data-tone="urgent">
        <h2 className="side-card-title">Emergency assistance</h2>
        <p className="side-card-text">
          Lost passport or urgent travel to India? Message us first. We help with the Emergency Certificate and your new
          passport.
        </p>
        <UrgentButton className="btn-block mt-5" location="service-aside" />
      </div>
      <div className="side-card">
        <p className="eyebrow">Also included</p>
        <CheckRows className="mt-3" items={included.map((title) => ({ title }))} />
        <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-3">
          Official fees are paid to the mission. Our service fee is agreed before we start.
        </p>
      </div>
    </aside>
  );
}

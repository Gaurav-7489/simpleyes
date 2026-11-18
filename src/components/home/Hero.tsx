import { CalendarDays, Check, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { whatsappHref } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Homepage hero: the promise on the left, and on the right an illustration of what a finished case looks like —
 * an application check with every line ticked, a booked appointment and a ready photo. The illustration is
 * decoration (aria-hidden); every fact in it is said in the copy.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero2">
      <div className="container-site hero2-grid">
        <div className="hero2-copy">
          <p className="eyebrow hero-intro">{site.tagline}</p>
          <h1 id="hero-title" className="hero2-title hero-intro" style={revealDelay(40)}>
            Indian passport, e&#8209;OCI and visa help in Germany, <span className="text-accent-700">made simpler.</span>
          </h1>
          <p className="hero2-lead hero-intro" style={revealDelay(100)}>
            We check your documents, fill in your forms, help book your appointment and support you in emergencies, so
            your application is right the first time.
          </p>
          <div className="hero-intro mt-8 flex flex-col gap-3 sm:flex-row" style={revealDelay(160)}>
            <ButtonLink href="/contact/" location="hero">
              Get Assistance
            </ButtonLink>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-cta-location="hero"
              data-topic="general"
              className="btn btn-light"
            >
              <span className="btn-face">
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                WhatsApp us
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </span>
            </a>
          </div>
          <p className="hero2-note hero-intro" style={revealDelay(220)}>
            Independent private service. Not an embassy, consulate or government authority.
          </p>
        </div>

        <div className="hero2-visual" aria-hidden="true">
          <div className="hv-booklet" />
          <div className="hv-card hero-intro" style={revealDelay(120)}>
            <p className="hv-kicker">Application check</p>
            <p className="hv-title">Passport renewal</p>
            <ul className="hv-rows">
              {["Online form", "Photo and signature", "Documents"].map((row) => (
                <li key={row}>
                  <span className="tick">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {row}
                </li>
              ))}
            </ul>
            <p className="hv-ready">Ready to submit</p>
          </div>
          <div className="hv-appt hero-intro" style={revealDelay(220)}>
            <span className="hv-appt-icon">
              <CalendarDays className="size-4" strokeWidth={1.75} />
            </span>
            <span>
              <span className="hv-appt-label">Appointment booked</span>
              <span className="hv-appt-date">Tue, 14 Nov · 10:30</span>
            </span>
          </div>
          <div className="hv-chip hero-intro" style={revealDelay(300)}>
            <span className="tick tick-round">
              <Check className="size-3" strokeWidth={3} />
            </span>
            Photo checked against the rules
          </div>
        </div>
      </div>
    </section>
  );
}

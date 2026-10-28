import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { revealDelay } from "@/lib/style";

/** Reference "Our services at a glance": asymmetric 2-up rows that alternate wide/narrow. */
export function Services() {
  const rows = [services.slice(0, 2), services.slice(2, 4), services.slice(4, 6)];
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-canvas">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          badge="Services"
          title="How we can help"
          lead="Practical assistance with Indian consular and administrative processes — from understanding requirements to preparing your next step."
        />

        <div className="mt-12 flex flex-col gap-6 lg:mt-16">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 gap-6 ${
                rowIndex % 2 === 0
                  ? "lg:grid-cols-[minmax(0,1.88fr)_minmax(0,1fr)]"
                  : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.88fr)]"
              }`}
            >
              {row.map((service, i) => (
                <div key={service.slug} className="min-w-0" data-reveal style={revealDelay(i * 90)}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center" data-reveal>
          <div className="cta-strip">
            <p className="text-sm text-ink-2">Not sure which service fits your situation?</p>
            <WhatsAppButton topic="general">Ask Us on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

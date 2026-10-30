import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { revealDelay } from "@/lib/style";

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** "Eight areas where we can help" — the count follows the published services. */
function servicesHeading(count: number) {
  return `${numberWords[count] ?? count} areas where we can help`;
}

/** Reference "Our services at a glance": asymmetric 2-up rows that alternate wide/narrow. */
export function Services() {
  const rows = Array.from({ length: Math.ceil(services.length / 2) }, (_, i) => services.slice(i * 2, i * 2 + 2));
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-canvas">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          badge="Services"
          title={servicesHeading(services.length)}
          lead="From passports and OCI to attestation, family and student paperwork — practical preparation support for Indian documentation needs in Germany."
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
            <p className="text-sm text-ink-2">Not sure which service fits?</p>
            <WhatsAppButton>Ask Us on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

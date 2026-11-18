import { HelpCards } from "@/components/HelpCards";

/** Directly under the hero: appointment booking and emergency assistance. */
export function QuickHelp() {
  return (
    <section aria-label="Appointment booking and emergency assistance" className="quick-help">
      <div className="container-site">
        <HelpCards />
      </div>
    </section>
  );
}

import Link from "next/link";
import { mainlyForPhrase, services } from "@/content/services";
import { ServiceIndex } from "@/components/home/ServiceIndex";

/** Homepage services: all eight approved services as an editorial index with a live 3D stage. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <div className="section-head">
          <h2 id="services-title" className="type-h2 max-w-[16ch]">
            Choose your service
          </h2>
          <p className="type-lead max-w-[36rem]">
            Eight kinds of paperwork. Open one and pick the problem you have.
          </p>
        </div>
        <ServiceIndex
          items={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary, mainlyFor: mainlyForPhrase(s), scene: s.scene.kind }))}
        />
        <p className="mt-8 text-[0.9375rem] text-ink-2">
          Not sure which one fits?{" "}
          <Link href="/contact/" className="link-tertiary">
            Describe your situation
          </Link>
        </p>
      </div>
    </section>
  );
}

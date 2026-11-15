import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { DocumentStage } from "@/components/scene/DocumentStage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404: a single blank sheet, out of place, and clear ways back. */
export default function NotFound() {
  return (
    <section className="page-hero" data-has-scene="">
      <div className="container-site page-hero-grid">
        <div className="page-hero-copy">
          <p className="font-display text-[1rem] text-accent-700">Error 404</p>
          <h1 className="type-page-title mt-5 max-w-[14ch]">This page doesn&apos;t exist</h1>
          <p className="type-lead mt-5 max-w-[36rem]">
            The link may be old, or the page may have moved. These will get you back on track.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Go to Homepage</ButtonLink>
            <ButtonLink href="/contact/" variant="light">
              Contact Us
            </ButtonLink>
          </div>
          <h2 className="mt-12 text-[0.9375rem] font-medium text-ink">Or go straight to a service</h2>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} className="link-tertiary">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="page-hero-stage" aria-hidden="true">
          <DocumentStage scene="lost" intro ratio="1 / 0.8" />
        </div>
      </div>
    </section>
  );
}

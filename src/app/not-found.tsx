import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-40">
      <div aria-hidden="true" className="hero-rings -z-10" />
            <div className="container-site flex flex-col items-center gap-6 text-center">
        <Badge>404</Badge>
        <h1 className="type-h2 max-w-[16ch]">This page doesn&apos;t exist</h1>
        <p className="type-lead max-w-[40ch]">
          The page may have moved. Head back to the homepage, browse our services, or contact us.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go to Homepage</ButtonLink>
          <ButtonLink href="/services/" variant="light" icon="none">
            Our Services
          </ButtonLink>
          <ButtonLink href="/contact/" variant="light" icon="none">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

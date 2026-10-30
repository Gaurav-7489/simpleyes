import type { Metadata } from "next";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-40">
      <div aria-hidden="true" className="hero-rings -z-10" />
      <div aria-hidden="true" className="hero-orb -z-10" />
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <Badge>404</Badge>
        <h1 className="type-h2 max-w-[16ch]">This page doesn&apos;t exist</h1>
        <p className="type-lead max-w-[40ch]">
          The page may have moved. Head back home, browse our services, or ask us directly.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="light">
            Back to Home
          </ButtonLink>
          <WhatsAppButton>Ask on WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

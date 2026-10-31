import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { WhySimplyes } from "@/components/home/WhySimplyes";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: `Documentation Assistance for Indians in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "SimplYes helps Indians in Germany understand and prepare passport, OCI, attestation, family and other documentation. Independent service — get assistance today.",
  path: "/",
});

/**
 * Agencee-structured homepage: hero → what we do → services showcase → process → benefits → FAQs → CTA.
 * Detail lives on the service pages, How It Works and About — nothing is repeated here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Services />
      <Process />
      <WhySimplyes />
      <FaqSection />
      <FinalCta variant="light" />
    </>
  );
}

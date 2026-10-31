import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Services } from "@/components/home/Services";
import { WhySimplyes } from "@/components/home/WhySimplyes";
import { Process } from "@/components/home/Process";
import { WhoWeHelp } from "@/components/home/WhoWeHelp";
import { Approach } from "@/components/home/Approach";
import { TrustPanel } from "@/components/home/TrustPanel";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: `Documentation Assistance for Indians in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "SimplYes helps Indians in Germany understand and prepare passport, OCI, attestation, family and other documentation. Independent service — get assistance today.",
  path: "/",
});

/** §07 — eleven sections in the confirmed order (the footer is the eleventh, in the layout). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Services />
      <WhySimplyes />
      <Process />
      <WhoWeHelp />
      <Approach />
      <TrustPanel />
      <FaqSection />
      <FinalCta />
    </>
  );
}

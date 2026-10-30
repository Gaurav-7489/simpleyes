import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Services } from "@/components/home/Services";
import { QuestionWall } from "@/components/home/QuestionWall";
import { Process } from "@/components/home/Process";
import { WhySimplyes } from "@/components/home/WhySimplyes";
import { Transparency } from "@/components/home/Transparency";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Indian documentation help in Germany`,
  absoluteTitle: true,
  description:
    "Independent help for Indians in Germany with passport, OCI, attestation, affidavit, family and student paperwork — clear guidance and real people on WhatsApp.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Services />
      <QuestionWall />
      <Process />
      <WhySimplyes />
      <Transparency />
      <FaqSection />
      <FinalCta />
    </>
  );
}

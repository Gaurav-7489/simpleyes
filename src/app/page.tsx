import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
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

/** Homepage sections in order (the footer closes the page, in the layout). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhySimplyes />
      <FaqSection />
      <FinalCta />
    </>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { WhySimplyes } from "@/components/home/WhySimplyes";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: `Documentation Support for Indians in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "Independent help for Indians in Germany to understand and prepare passport, OCI, attestation, visa, family and other documentation. Not a government service.",
  path: "/",
});

/** V2 homepage (Concept 2): hero → services → how it works → why → FAQs → final enquiry (footer in layout). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <WhySimplyes />
      <FaqSection />
      <FinalCta />
    </>
  );
}

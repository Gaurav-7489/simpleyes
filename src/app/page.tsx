import type { Metadata } from "next";
import { faqJsonLd, pageMetadata, videoJsonLd } from "@/lib/seo";
import { homeFaqs } from "@/content/home";
import { videos } from "@/content/videos";
import { AssistCards } from "@/components/redesign/AssistCards";
import { ChooseService, FaqPreview, FiveSteps, GuidesSection, HomeHero, WhySection } from "@/components/redesign/HomeSections";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Indian Passport, e-OCI & Visa Help in Germany | Simplyes",
  absoluteTitle: true,
  description:
    "Indian passport, e-OCI and visa help in Germany: document checks, form filling and appointments at the Embassy in Berlin and Consulates in Frankfurt, Munich, Hamburg.",
  path: "/",
});

/**
 * Homepage (redesign, Nov 2026): hero → appointment & emergency → choose your service → why Simplyes → five
 * steps with the video → guides and missions → FAQs → closing invitation.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AssistCards />
      <ChooseService />
      <WhySection />
      <FiveSteps />
      <GuidesSection />
      <FaqPreview />
      <FinalCta />
      <JsonLd data={[faqJsonLd(homeFaqs), ...videoJsonLd([videos["how-it-works"]])]} />
    </>
  );
}

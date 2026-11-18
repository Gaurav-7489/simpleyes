import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { QuickHelp } from "@/components/home/QuickHelp";
import { Services } from "@/components/home/Services";
import { WhySimplyes } from "@/components/home/WhySimplyes";
import { SimpleProcess } from "@/components/home/SimpleProcess";
import { GuidesSection } from "@/components/home/GuidesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: `Indian Passport, e-OCI & Visa Help in Germany | ${site.name}`,
  absoluteTitle: true,
  description:
    "We check your documents, fill in your forms, help book your Indian Embassy or Consulate appointment and support you in emergencies. Independent service.",
  path: "/",
});

/** Homepage (Nov 2026 redesign): Hero → appointment & emergency → services → why → five steps → guides → FAQs → contact. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickHelp />
      <Services />
      <WhySimplyes />
      <SimpleProcess />
      <GuidesSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}

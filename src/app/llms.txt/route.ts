import { allFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { doesDoesNot, independenceStatement, journeySteps } from "@/content/home";
import { absoluteUrl } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

export const dynamic = "force-static";

/** llms.txt generated from the content modules, so it can never drift from the site. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Tagline: ${site.tagline}`,
    `- Coverage: ${site.coverageStatement}`,
    `- Contact: enquiry form ${absoluteUrl("/contact/")} · WhatsApp ${site.whatsapp.display} (${whatsappHref().split("?")[0]})${site.contact.email ? ` · Email ${site.contact.email}` : ""}`,
    "- Language: English",
    "",
    independenceStatement,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}/`)}): ${s.summary}`),
    "",
    "## How it works",
    "",
    ...journeySteps.map((step, i) => `${i + 1}. ${step.title} (${step.who}): ${step.body}`),
    "",
    "## What SimplYes does not do",
    "",
    ...doesDoesNot.doesNot.map((item) => `- ${item}`),
    "- Fees: quotation-based service fees, explained before paid assistance begins; government/consular fees and third-party costs are separate.",
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): overview of services and how ${site.name} works`,
    `- [Services](${absoluteUrl("/services/")}): all service areas`,
    `- [How It Works](${absoluteUrl("/how-it-works/")})`,
    `- [About](${absoluteUrl("/about/")})`,
    `- [FAQs](${absoluteUrl("/faqs/")}): ${allFaqs.length} answers in six categories`,
    `- [Pricing](${absoluteUrl("/pricing/")}): how service fees work (quotation-based)`,
    `- [Contact](${absoluteUrl("/contact/")}): enquiry form, WhatsApp and corporate enquiries`,
    "",
    "## Official source",
    "",
    `- [${site.official.embassy.label}](${site.official.embassy.href}): official requirements and announcements`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

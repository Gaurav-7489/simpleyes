import { allFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { doesDoesNot, independenceStatement, pricing } from "@/content/home";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * llms-full.txt: the site's factual content as plain text for AI answer engines (GEO), generated from the same
 * content modules as the pages, so it never says more (or less) than the website.
 */
export function GET() {
  const list = (items: readonly string[]) => items.map((item) => `- ${item}`);
  const lines = [
    `# ${site.name} — full reference`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${absoluteUrl("/")} · Coverage: ${site.coverageStatement} · Last updated: ${site.contentUpdated}`,
    `Contact: ${absoluteUrl("/contact/")} · WhatsApp ${site.whatsapp.display}${site.contact.email ? ` · ${site.contact.email}` : ""}`,
    "",
    independenceStatement,
    "",
    `## What ${site.name} does`,
    "",
    ...list(doesDoesNot.does),
    "",
    `## What ${site.name} does not do`,
    "",
    ...list(doesDoesNot.doesNot),
    "",
    "## Fees",
    "",
    ...pricing.feeTypes.map((fee) => `- ${fee.title}: ${fee.body}`),
    "",
    ...services.flatMap((s) => [
      `## ${s.title}`,
      "",
      `${absoluteUrl(`/services/${s.slug}/`)}`,
      "",
      s.outcome,
      "",
      ...s.intro,
      "",
      "Problems we help with (each link opens the enquiry form with the problem preselected):",
      ...s.issues.map((issue) => `- ${issue.label}: ${absoluteUrl(`/contact/?service=${s.slug}&issue=${issue.id}`)}`),
      "",
      "Who it is for:",
      ...list(s.audience),
      "",
      `What ${site.name} can help with:`,
      ...list(s.helpsWith),
      "",
      "Possible document categories (indicative, subject to verification against official requirements):",
      ...list(s.documentCategories),
      "",
      "Outside the scope:",
      ...list(s.outsideScope),
      "",
      `${s.title} FAQs:`,
      ...s.faqs.flatMap((faq) => [`Q: ${faq.question}`, `A: ${faq.answer}`]),
      "",
    ]),
    "## Frequently asked questions",
    "",
    ...allFaqs.flatMap((faq) => [`Q: ${faq.question}`, `A: ${faq.answer}`, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";
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
    `- Contact: WhatsApp ${site.whatsapp.display} (${whatsappHref().split("?")[0]})`,
    "- Language: English",
    "",
    site.disclosure,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}/`)}): ${s.summary}`),
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): overview of services and how ${site.name} works`,
    `- [Services](${absoluteUrl("/services/")}): all service areas`,
    `- [How It Works](${absoluteUrl("/how-it-works/")})`,
    `- [About](${absoluteUrl("/about/")})`,
    `- [FAQs](${absoluteUrl("/faqs/")}): ${faqs.length} general answers plus questions by service`,
    `- [Contact](${absoluteUrl("/contact/")})`,
    "",
    "## Official source",
    "",
    `- [${site.official.embassy.label}](${site.official.embassy.href}): official requirements and announcements`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

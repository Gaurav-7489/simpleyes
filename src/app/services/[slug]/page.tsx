import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, Info } from "lucide-react";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CardFrame } from "@/components/ui/CardFrame";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} for Indians in Germany`,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        badge="Service"
        title={service.title}
        lead={service.definition}
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: service.title, path },
        ]}
      >
        <WhatsAppButton topic={service.whatsappTopic}>Ask About This Service</WhatsAppButton>
      </PageHero>

      <section aria-label={`${service.title} details`} className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div data-reveal>
            <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-6">
              <div className="card-art h-[clamp(220px,28vw,320px)]">
                <ServiceArt kind={service.illustration} className="absolute inset-0 h-full w-full" />
              </div>
              <div>
                <h2 className="type-card-title">How Simplyes helps</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {service.helpsWith.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                      <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardFrame>
          </div>

          <div className="flex flex-col gap-6" data-reveal>
            <CardFrame cardClassName="flex flex-col gap-4">
              <h2 className="type-card-title">Good to know</h2>
              <ul className="flex flex-col gap-3.5">
                {service.goodToKnow.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                    <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </CardFrame>

            <CardFrame cardClassName="flex flex-col gap-4">
              <h2 className="type-card-title">How to get started</h2>
              <ol className="flex flex-col gap-3 text-[0.9375rem] leading-snug text-ink-2">
                <li>
                  <span className="font-medium text-ink">1.</span> Message us on WhatsApp with a short description of
                  your process.
                </li>
                <li>
                  <span className="font-medium text-ink">2.</span> We&apos;ll ask a few questions and explain how we can
                  help — including any applicable fee.
                </li>
                <li>
                  <span className="font-medium text-ink">3.</span> Share only the information that&apos;s actually
                  needed, once we&apos;ve agreed on next steps.
                </li>
              </ol>
              <div className="flex flex-wrap gap-3 pt-2">
                <WhatsAppButton topic={service.whatsappTopic}>Start on WhatsApp</WhatsAppButton>
                <ButtonLink href="/how-it-works/" variant="light">
                  How It Works
                </ButtonLink>
              </div>
            </CardFrame>

            <p className="rounded-[14px] bg-canvas-alt px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-2">
              {site.shortDisclosure}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="other-services" className="section bg-canvas-alt">
        <div className="container-site">
          <h2 id="other-services" className="type-h2 text-center">
            Other services
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}/`}
                  className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-[14px] bg-canvas px-4 py-3 text-sm font-medium text-ink shadow-[0_0_0_1px_rgb(0_0_0/0.05),var(--shadow-card)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {other.title}
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={[
          serviceJsonLd({ name: service.title, description: service.definition, path }),
          breadcrumbJsonLd([
            { name: "Services", path: "/services/" },
            { name: service.title, path },
          ]),
        ]}
      />
    </>
  );
}

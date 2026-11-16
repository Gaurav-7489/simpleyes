import type { Metadata } from "next";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { videoList } from "@/content/videos";
import { breadcrumbJsonLd, pageMetadata, videoJsonLd } from "@/lib/seo";
import { Eyebrow, GuideCard, MissionChips } from "@/components/redesign/bits";
import { RdPageHero } from "@/components/redesign/RdPageHero";
import { VideoPlayer } from "@/components/redesign/VideoPlayer";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guides: Indian Passport, e-OCI & Visa | Simplyes",
  absoluteTitle: true,
  description:
    "Step-by-step guides and videos: renew your Indian passport in Germany, apply for e-OCI, surrender certificate, lost passport and the Indian visa for Germans.",
  path: "/guides/",
});

export default function GuidesPage() {
  return (
    <>
      <RdPageHero
        crumbs={[{ name: "Guides", path: "/guides/" }]}
        eyebrow="Step-by-step guides and videos"
        title="Answers to the questions everyone asks"
        lead="Short, plain-language guides to Indian passport, e-OCI and visa applications from Germany, with our videos."
      />

      <section aria-labelledby="all-guides" className="rd-section-compact">
        <div className="container-site">
          <h2 id="all-guides" className="sr-only">
            All guides
          </h2>
          <ul className="guide-grid guide-grid-3">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="videos" className="rd-section rd-band">
        <div className="container-site">
          <Eyebrow>Videos</Eyebrow>
          <h2 id="videos" className="rd-h2 mt-5">
            Watch on our YouTube channel
          </h2>
          <ul className="video-grid">
            {videoList.map((video) => (
              <li key={video.key}>
                <VideoPlayer video={video} />
                <p className="mt-3 text-[0.9375rem] leading-snug text-ink-2">{video.title}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <a href={site.youtube.url} target="_blank" rel="noopener noreferrer" className="rd-link" data-cta="youtube" data-cta-location="guides">
              All videos on YouTube {site.youtube.handle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <MissionChips />
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Guides", path: "/guides/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Simplyes guides",
            itemListElement: guides.map((guide, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/guides/${guide.slug}/`),
              name: guide.title,
            })),
          },
          ...videoJsonLd(videoList),
        ]}
      />
    </>
  );
}

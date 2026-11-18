import type { Metadata } from "next";
import { site } from "@/content/site";
import { videoGuides } from "@/content/videos";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { YouTubeLink } from "@/components/ui/YouTubeLink";
import { VideoTile } from "@/components/video/VideoTile";

export const metadata: Metadata = pageMetadata({
  title: `Video Guides: Indian Passport, e-OCI & Visa | ${site.name}`,
  absoluteTitle: true,
  description:
    "Step-by-step video guides for Indians in Germany: passport renewal, OCI card, Indian visa and e-Visa, lost passport, and passport photo and signature rules.",
  path: "/guides/",
});

/** All video guides from the SimplYes YouTube channel, in the owner-approved order, played in place. */
export default function GuidesPage() {
  return (
    <>
      <PageHero
        title="Step-by-step guides"
        lead="Short videos on the questions everyone asks. Each one plays here, on this page."
        crumbs={[{ name: "Guides", path: "/guides/" }]}
      />
      <section aria-label="Video guides" className="pb-[var(--section-y)]">
        <div className="container-site">
          <ul className="guides-grid">
            {videoGuides.map((video) => (
              <li key={video.id} id={video.id} className="guide-card scroll-mt-[calc(var(--header-h)+24px)]">
                <VideoTile video={video} location="guides-page" />
                <div className="guide-card-body">
                  <h2 className="guide-card-title">{video.title}</h2>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <YouTubeLink location="guides-page" className="link-tertiary">
              More on our YouTube channel
            </YouTubeLink>
          </p>
        </div>
      </section>
      <FinalCta compact />
      <JsonLd data={breadcrumbJsonLd([{ name: "Guides", path: "/guides/" }])} />
    </>
  );
}

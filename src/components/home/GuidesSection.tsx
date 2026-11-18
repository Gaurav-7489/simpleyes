import Link from "next/link";
import { getVideo, homeGuides } from "@/content/videos";
import { missions } from "@/content/home";
import { site } from "@/content/site";
import { VideoTile } from "@/components/video/VideoTile";

/** Step-by-step video guides, played in place, and the missions we help with. */
export function GuidesSection() {
  return (
    <section id="guides" aria-labelledby="guides-title" className="section guides2">
      <div className="container-site">
        <p className="eyebrow">Step-by-step guides and videos</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 id="guides-title" className="type-h2 max-w-[22ch]">
            Answers to the questions everyone asks
          </h2>
          <span className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
            <Link href="/guides/" className="link-inline">
              All guides →
            </Link>
            <a href={site.youtube.url} target="_blank" rel="noopener noreferrer" data-cta="youtube" data-cta-location="home-guides" className="link-inline">
              YouTube {site.youtube.handle} →<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        </div>
        <ul className="guide-cards mt-10">
          {homeGuides.map((guide) => {
            const video = getVideo(guide.id)!;
            return (
              <li key={guide.id} className="guide-card">
                <VideoTile video={video} location="home-guides" />
                <div className="guide-card-body">
                  <p className="guide-card-meta" data-urgent={guide.urgent ? "" : undefined}>
                    {guide.meta}
                  </p>
                  <h3 className="guide-card-title">{video.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="missions mt-10">
          <p id="missions-label">We help with applications at:</p>
          <ul aria-labelledby="missions-label">
            {missions.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

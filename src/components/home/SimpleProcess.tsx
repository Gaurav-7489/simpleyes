import { journeySteps } from "@/content/home";
import { getVideo, introVideoId } from "@/content/videos";
import { ProcessRail } from "@/components/ProcessRail";
import { VideoTile } from "@/components/video/VideoTile";

/** The five steps, then the short "Meet Simplyes" video. The full version lives on /how-it-works/. */
export function SimpleProcess() {
  const video = getVideo(introVideoId)!;
  return (
    <section aria-labelledby="process-title" className="section process2">
      <div className="container-site">
        <div className="section-head">
          <h2 id="process-title" className="type-h2 max-w-[18ch]">
            Five clear steps, from first message to submission
          </h2>
          <p className="max-w-[24rem] text-[0.9375rem] leading-relaxed text-ink-2">
            No documents needed to start. Official processing and decisions always stay with the authorities.
          </p>
        </div>
        <ProcessRail steps={journeySteps} />
        <div className="process2-video">
          <VideoTile video={video} size="feature" caption="Watch: how Simplyes works" location="home-process" />
        </div>
      </div>
    </section>
  );
}

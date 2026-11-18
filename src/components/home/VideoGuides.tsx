import { videoGuides } from "@/content/videos";
import { VideoGallery } from "@/components/home/VideoGallery";
import { YouTubeLink } from "@/components/ui/YouTubeLink";

/** Video guides from the SimplYes YouTube channel, played in place. */
export function VideoGuides() {
  return (
    <section id="video-guides" aria-labelledby="videos-title" className="section video-guides">
      <div className="container-site">
        <div className="section-head">
          <h2 id="videos-title" className="type-h2 max-w-[14ch]">
            Video guides
          </h2>
          <p className="type-lead max-w-[34rem]">Short walkthroughs of common passport, OCI and visa paperwork.</p>
        </div>
        <VideoGallery videos={videoGuides} />
        <p className="mt-10">
          <YouTubeLink location="video-guides" className="link-tertiary">
            More on our YouTube channel
          </YouTubeLink>
        </p>
      </div>
    </section>
  );
}

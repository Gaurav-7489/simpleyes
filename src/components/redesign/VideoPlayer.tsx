"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/content/site";
import type { Video } from "@/content/videos";

/**
 * Click-to-load YouTube player. Nothing is requested from YouTube until the visitor presses play: the poster
 * is drawn locally, and only then is the privacy-enhanced (youtube-nocookie.com) player embedded. A video
 * without an id yet opens the Simplyes channel instead.
 */
export function VideoPlayer({
  video,
  title,
  caption = "YouTube video, loads only when you press play",
  size = "md",
}: {
  video: Video;
  /** Text on the poster (defaults to the video's short title). */
  title?: string;
  caption?: string;
  size?: "md" | "lg";
}) {
  const [playing, setPlaying] = useState(false);
  const label = title ?? video.label;

  if (playing && video.youtubeId) {
    return (
      <div className="video-frame" data-size={size}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  const poster = (
    <>
      <span className="video-play" aria-hidden="true">
        <Play className="size-5 translate-x-[1px] fill-current" strokeWidth={0} />
      </span>
      <span className="video-title">{label}</span>
      <span className="video-caption">
        {video.youtubeId ? caption : "Watch on YouTube"} · {video.durationLabel}
      </span>
    </>
  );

  if (!video.youtubeId) {
    return (
      <a
        href={site.youtube.url}
        target="_blank"
        rel="noopener noreferrer"
        className="video-frame video-poster"
        data-size={size}
        data-cta="youtube"
        data-cta-location="video"
      >
        {poster}
        <span className="sr-only"> (opens the Simplyes YouTube channel in a new tab)</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className="video-frame video-poster"
      data-size={size}
      onClick={() => setPlaying(true)}
    >
      {poster}
      <span className="sr-only"> (plays the video here)</span>
    </button>
  );
}

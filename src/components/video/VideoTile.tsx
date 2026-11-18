"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoGuide } from "@/content/videos";
import { track } from "@/lib/analytics";

/** Fired when a video starts, so any other playing tile on the page closes (one video at a time). */
const PLAY_EVENT = "simplyes:video-play";

/**
 * YouTube's `hqdefault` thumbnail (480 × 360) exists for every video. The HD sizes do not: a missing one answers with
 * a 404, which would surface as a console error, so they are not used.
 */
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

type Props = {
  video: VideoGuide;
  /** "feature": one large player with its caption on the thumbnail. "card": a thumbnail for a grid or card. */
  size?: "feature" | "card";
  /** Caption on a feature thumbnail (defaults to the video title). */
  caption?: string;
  /** Where the tile sits, for analytics. */
  location: string;
};

/**
 * Click-to-play YouTube tile. Until a visitor presses play, only a lazy-loaded thumbnail is shown: no YouTube
 * player, script or cookie loads. Playing swaps the thumbnail for a privacy-enhanced (youtube-nocookie.com) embed
 * in place; starting another video on the page closes this one.
 */
export function VideoTile({ video, size = "card", caption, location }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== video.id) setPlaying(false);
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [video.id]);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const play = () => {
    setLoaded(false);
    setPlaying(true);
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video.id }));
    track("cta_click", { cta_label: `Video: ${video.title}`.slice(0, 60), page: window.location.pathname, location });
  };

  return (
    <div
      className="vg-frame"
      data-size={size}
      data-playing={playing ? "" : undefined}
      data-loaded={playing && loaded ? "" : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimiser; remote thumbnail */}
      <img
        src={thumb(video.id)}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="vg-thumb"
      />
      {playing ? (
        <iframe
          ref={frameRef}
          className="vg-player"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <button
          type="button"
          className="vg-play"
          onClick={play}
          // A feature tile's visible caption is its label (WCAG 2.5.3); a card's title sits outside the button.
          aria-label={size === "feature" ? undefined : `Play video: ${video.title}`}
        >
          <span aria-hidden="true" className="vg-play-mark">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M8.5 5.75v12.5L18.5 12z" fill="currentColor" />
            </svg>
          </span>
          {size === "feature" && (
            <span className="vg-caption">
              <span className="sr-only">Play video: {video.title}. </span>
              <span className="vg-caption-title">{caption ?? video.title}</span>
              <span className="vg-caption-note">YouTube video, loads when you press play</span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import type { VideoGuide } from "@/content/videos";
import { track } from "@/lib/analytics";

/**
 * Click-to-play YouTube gallery. Until a visitor presses play, only a lazy-loaded thumbnail is shown: no YouTube
 * player, script or cookie loads. Playing swaps that card's thumbnail for a privacy-enhanced
 * (youtube-nocookie.com) embed; starting another video closes the previous one.
 */
export function VideoGallery({ videos }: { videos: VideoGuide[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <ul className="vg-grid" data-cta-location="video-guides">
      {videos.map((video, i) => (
        <VideoCard
          key={video.id}
          video={video}
          featured={i === 0}
          playing={active === video.id}
          onPlay={() => {
            setActive(video.id);
            track("cta_click", { cta_label: `Video: ${video.title}`.slice(0, 60), page: window.location.pathname, location: "video-guides" });
          }}
        />
      ))}
    </ul>
  );
}

/** Thumbnail sizes to try, best first. Not every upload has the HD sizes; `hqdefault` always exists. */
const featuredSizes = ["maxresdefault", "sddefault", "hqdefault"];
const cardSizes = ["sddefault", "hqdefault"];
const thumb = (id: string, size: string) => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

function VideoCard({ video, featured, playing, onPlay }: { video: VideoGuide; featured: boolean; playing: boolean; onPlay: () => void }) {
  const sizes = featured ? featuredSizes : cardSizes;
  const [sizeIndex, setSizeIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // YouTube answers a missing size with a 120×90 placeholder (or an error): step down to the next size.
  const check = (img: HTMLImageElement) => {
    if (img.complete && img.naturalWidth <= 120) setSizeIndex((n) => Math.min(n + 1, sizes.length - 1));
  };
  const onImgLoad = (e: SyntheticEvent<HTMLImageElement>) => check(e.currentTarget);
  const onImgError = () => setSizeIndex((n) => Math.min(n + 1, sizes.length - 1));

  // The thumbnail may finish loading before hydration, when React's handlers are not attached yet.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) check(imgRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  return (
    <li className="vg-item" data-featured={featured ? "" : undefined}>
      <div className="vg-frame" data-playing={playing ? "" : undefined} data-loaded={playing && loaded ? "" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimiser; remote thumbnail */}
        <img
          ref={imgRef}
          src={thumb(video.id, sizes[sizeIndex]!)}
          alt=""
          width={featured ? 1280 : 640}
          height={featured ? 720 : 480}
          loading="lazy"
          decoding="async"
          className="vg-thumb"
          onLoad={onImgLoad}
          onError={onImgError}
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
          <button type="button" className="vg-play" onClick={() => { setLoaded(false); onPlay(); }} aria-label={`Play video: ${video.title}`}>
            <span aria-hidden="true" className="vg-play-mark">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M8.5 5.75v12.5L18.5 12z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <h3 className="vg-title">{video.title}</h3>
    </li>
  );
}

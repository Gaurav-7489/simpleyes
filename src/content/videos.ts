/**
 * The Simplyes YouTube videos (channel @simplyesde), shown on the homepage, the Guides page, guide pages and
 * service pages.
 *
 * `youtubeId` is the 11-character id from the video's link (youtube.com/watch?v=<id> or youtu.be/<id>).
 * While it is null the player shows its poster and opens the channel instead of embedding the video, and no
 * VideoObject structured data is published for it. Paste each id once to switch the embeds on.
 *
 * `uploadDate` is the publication date shown on the channel (16 Nov 2026), used for structured data.
 */

export type VideoKey = "how-it-works" | "passport-renewal" | "lost-passport" | "e-oci" | "visa-for-germans";

export type Video = {
  key: VideoKey;
  /** Title as published on YouTube. */
  title: string;
  /** Short title for players and cards. */
  label: string;
  description: string;
  youtubeId: string | null;
  /** ISO 8601 duration (structured data). */
  duration: string;
  /** Human-readable duration ("1:52"). */
  durationLabel: string;
  uploadDate: string;
  /** Poster tone when no YouTube thumbnail is available. */
  tone: "green" | "orange" | "lime" | "rust";
};

export const videos: Record<VideoKey, Video> = {
  "how-it-works": {
    key: "how-it-works",
    title: "Struggling with Indian Passport Renewal in Germany? Meet Simplyes.",
    label: "How Simplyes works",
    description:
      "Indian paperwork, made simple: how Simplyes helps Indians in Germany with passport, e-OCI and visa applications, from the first WhatsApp message to a complete application.",
    youtubeId: null,
    duration: "PT59S",
    durationLabel: "0:59",
    uploadDate: "2026-11-02",
    tone: "green",
  },
  "passport-renewal": {
    key: "passport-renewal",
    title: "How to Renew Your Indian Passport in Germany | Step-by-Step Guide | Simplyes",
    label: "How to renew your Indian passport in Germany",
    description:
      "Renew your Indian passport in Germany in six steps: online form, photo and signature, documents, appointment and submission.",
    youtubeId: null,
    duration: "PT1M52S",
    durationLabel: "1:52",
    uploadDate: "2026-11-02",
    tone: "green",
  },
  "lost-passport": {
    key: "lost-passport",
    title: "Lost Your Indian Passport in Germany? What to Do, Step by Step | Simplyes",
    label: "Lost your Indian passport in Germany? What to do",
    description:
      "What to do when you lose your Indian passport in Germany: police report first, then the documents for a new passport or an Emergency Certificate for urgent travel.",
    youtubeId: null,
    duration: "PT1M53S",
    durationLabel: "1:53",
    uploadDate: "2026-11-12",
    tone: "rust",
  },
  "e-oci": {
    key: "e-oci",
    title: "How to Apply for an OCI Card in Germany (e-OCI, 2026) | Step-by-Step | Simplyes",
    label: "How to apply for an e-OCI card from Germany",
    description:
      "Applying for the e-OCI card from Germany in six steps: surrender certificate first, then the online application, photo, documents and submission. A digital card, no booklet.",
    youtubeId: null,
    duration: "PT2M10S",
    durationLabel: "2:10",
    uploadDate: "2026-11-11",
    tone: "orange",
  },
  "visa-for-germans": {
    key: "visa-for-germans",
    title: "Indian Visa for German Citizens 2026: e-Visa, Business Visa & Categories | Simplyes",
    label: "Indian visa for German citizens",
    description:
      "Which Indian visa do you need? e-Visa, e-Business and tourist categories for German citizens, and why you should only ever apply on the official website.",
    youtubeId: null,
    duration: "PT2M18S",
    durationLabel: "2:18",
    uploadDate: "2026-11-11",
    tone: "lime",
  },
};

/** Every video, newest first (the order on the channel). */
export const videoList: Video[] = [
  videos["lost-passport"],
  videos["visa-for-germans"],
  videos["e-oci"],
  videos["how-it-works"],
  videos["passport-renewal"],
];

export function youtubeWatchUrl(video: Video): string | null {
  return video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : null;
}

export function youtubeThumbnail(video: Video): string | null {
  return video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : null;
}

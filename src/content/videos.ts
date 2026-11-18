/**
 * Video guides on the official SimplYes YouTube channel, in the owner-approved order (18 Nov 2026).
 * `id` is the YouTube video ID. The first video is shown larger on the homepage.
 */
export type VideoGuide = { id: string; title: string };

export const videoGuides: VideoGuide[] = [
  { id: "U5oRO--jVbQ", title: "Passport Renewal Guide" },
  { id: "5AqDkuUgoEE", title: "Meet SimplYes" },
  { id: "N7qH5NG0T98", title: "OCI Card Application" },
  { id: "fSd52rH97MA", title: "Indian Visa for German Citizens" },
  { id: "K_c2qhg5PSo", title: "Lost Indian Passport" },
  { id: "ITCVJ14WiQk", title: "Indian e-Visa Application" },
  { id: "doHN3e53b0k", title: "Passport Photo & Signature Rules" },
];

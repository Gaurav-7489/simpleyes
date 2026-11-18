/**
 * Ask Simplyes: the video series in which Simple, an AI-generated presenter, answers the questions Indians in Germany
 * ask most. Episodes are YouTube videos (IDs as in src/content/videos.ts).
 */
export type Episode = {
  number: number;
  videoId: string;
  /** Title on the big player. */
  title: string;
  /** Shorter title in the episode list. */
  listTitle: string;
  /** What the episode covers (chips under the player). */
  topics: string[];
  /** The viewer question the episode answers, shown as a chat bubble. */
  question: string;
  answer: string;
};

export const episodes: Episode[] = [
  {
    number: 1,
    videoId: "U5oRO--jVbQ",
    title: "Renewing your Indian passport in Germany",
    listTitle: "Passport renewal in Germany",
    topics: ["Online form", "Photo & signature", "Documents", "Where to submit"],
    question: "How do I renew my Indian passport in Germany?",
    answer: "Great question! Episode 1 walks you through it: form, photo, documents and where to submit.",
  },
];

/** Topics viewers can vote for as the next episode. */
export const nextEpisodeTopics = ["e-OCI", "Lost passport", "Indian e-Visa", "New in Germany"];

export const simpleDisclosure = "Simple is an AI-generated presenter. A real person from Simplyes replies to every message.";

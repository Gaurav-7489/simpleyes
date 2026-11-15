/** robots.txt groups. See docs/SEO-GEO-AUDIT.md §AI crawlers for what each one controls. */

/**
 * Crawlers used to show pages in search and AI-answer results, and to fetch a page a user asked about.
 * Blocking these would remove SimplYes from those results, so they are always allowed in production.
 */
export const SEARCH_AND_RETRIEVAL_AGENTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // fetches a page a ChatGPT user asked about
  "PerplexityBot", // Perplexity search results
  "Perplexity-User",
  "Claude-SearchBot", // Claude search results
  "Claude-User", // fetches a page a Claude user asked about
];

/**
 * Tokens that control use of the content for training AI models. They do not affect search or AI-answer
 * visibility. Allowing them is an owner decision (`ALLOW_MODEL_TRAINING`); the default keeps the
 * pre-audit behaviour (allowed), because the content is public marketing text.
 */
export const MODEL_TRAINING_AGENTS = [
  "GPTBot", // OpenAI training
  "ClaudeBot", // Anthropic training
  "Google-Extended", // Gemini training/grounding control token (not a separate crawler)
  "Applebot-Extended", // Apple training control token (not a separate crawler)
];

export const ALLOW_MODEL_TRAINING = true;

import { ArrowRight } from "lucide-react";
import { episodes, nextEpisodeTopics, simpleDisclosure } from "@/content/askSimplyes";
import { getVideo } from "@/content/videos";
import { whatsappHrefForMessage } from "@/lib/whatsapp";
import { VideoTile } from "@/components/video/VideoTile";
import { SocialLinks } from "@/components/SocialLinks";
import { AskQuestion } from "@/components/home/AskQuestion";

/**
 * Ask Simplyes: the video series. The latest episode plays large; the episode list, the vote for the next episode and
 * the channel links sit below.
 */
export function AskSimplyes() {
  const [latest] = episodes.slice(-1);
  const video = getVideo(latest!.videoId)!;
  return (
    <section id="ask-simplyes" aria-labelledby="ask-title" className="ask2 scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <p className="ask-logo">
          <span className="ask-logo-mark" aria-hidden="true">
            ?
          </span>
          <span>
            <span className="ask-logo-word">
              ask <span className="wordmark-si">si</span>
              <span className="wordmark-rest">mplyes.</span>
            </span>
            <span className="ask-logo-tag">A video series with Simple</span>
          </span>
        </p>

        <div className="ask2-grid">
          <div>
            <h2 id="ask-title" className="ask2-title">
              Got a paperwork question? <span className="block text-lime">Just ask Simple.</span>
            </h2>
            <p className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed text-white/80">
              Short videos that answer the questions Indians in Germany ask us most. Send yours, and it could be the next
              episode.
            </p>

            <div className="ask-chat">
              <p className="ask-bubble" data-from="visitor">
                {latest!.question}
              </p>
              <p className="ask-bubble" data-from="simple">
                {latest!.answer}
              </p>
              <AskQuestion />
              <p className="mt-3 text-[0.75rem] leading-relaxed text-white/65">{simpleDisclosure}</p>
            </div>
          </div>

          <div id={`episode-${latest!.number}`} className="ask-episode scroll-mt-[calc(var(--header-h)+24px)]">
            <div className="relative">
              <VideoTile video={video} size="feature" caption={latest!.title} location="ask-simplyes" />
              <span className="ask-new-tag" aria-hidden="true">
                New episode
              </span>
            </div>
            <div className="ask-episode-body">
              <p className="ask-episode-kicker">Episode {latest!.number}</p>
              <h3 className="ask-episode-title">{latest!.title}</h3>
              <ul className="ask-chips mt-4" aria-label="In this episode">
                {latest!.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ol className="ask-list">
          {episodes.map((ep) => (
            <li key={ep.number} className="ask-list-item" data-current={ep === latest ? "" : undefined}>
              <span className="ask-list-num" aria-hidden="true">
                {String(ep.number).padStart(2, "0")}
              </span>
              <h3 className="ask-list-title">
                <span className="sr-only">Episode {ep.number}: </span>
                {ep.listTitle}
              </h3>
              <a href={`#episode-${ep.number}`} className="ask-list-link">
                Watch now <ArrowRight aria-hidden="true" className="inline size-4" strokeWidth={1.75} />
              </a>
            </li>
          ))}
          <li className="ask-list-item" data-next="">
            <span className="ask-list-num" aria-hidden="true">
              {String(episodes.length + 1).padStart(2, "0")}
            </span>
            <h3 className="ask-list-title">Next episode: you decide</h3>
            <ul className="ask-chips mt-4" aria-label="Vote for the next episode on WhatsApp">
              {nextEpisodeTopics.map((topic) => (
                <li key={topic}>
                  <a
                    href={whatsappHrefForMessage(`Ask Simplyes: I'd like the next episode to be about ${topic}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    data-cta-location="ask-simplyes-vote"
                    data-topic="ask-simplyes"
                  >
                    {topic}
                    <span className="sr-only"> (vote on WhatsApp, opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ol>

        <div className="ask-follow">
          <h3 className="ask-list-title">Never miss an episode</h3>
          <p className="mt-2 text-[0.875rem] text-white/75">New answers on YouTube and our social channels.</p>
          <div className="mt-5">
            <SocialLinks location="ask-simplyes" />
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MessageCircle } from "lucide-react";
import { enquiryHref, mainlyForPhrase, services } from "@/content/services";
import { site } from "@/content/site";
import { featuredGuides } from "@/content/guides";
import { fiveSteps, homeFaqs, includedWithEveryService, whySimplyes } from "@/content/home";
import { videos } from "@/content/videos";
import { whatsappHref } from "@/lib/whatsapp";
import { CheckBox, CheckRows, Eyebrow, GuideCard, MissionChips } from "./bits";
import { VideoPlayer } from "./VideoPlayer";

/* ----- Hero ------------------------------------------------------------------------------------------- */

/** The application-check card composition beside the hero headline (pure HTML/CSS). */
function ApplicationCheck() {
  return (
    <div className="appcheck" role="img" aria-label="Example: a passport renewal application checked and ready to submit, with an appointment booked">
      <div className="appcheck-passport" aria-hidden="true">
        <span className="appcheck-emblem" />
      </div>
      <div className="appcheck-card" aria-hidden="true">
        <p className="appcheck-kicker">Application check</p>
        <p className="appcheck-title">Passport renewal</p>
        <ul>
          {["Online form", "Photo and signature", "Documents"].map((item) => (
            <li key={item}>
              <CheckBox />
              {item}
            </li>
          ))}
        </ul>
        <p className="appcheck-ready">Ready to submit</p>
      </div>
      <div className="appcheck-appointment" aria-hidden="true">
        <span className="appcheck-cal">
          <CalendarDays className="size-5" strokeWidth={1.75} />
        </span>
        <span>
          <span className="block text-[0.75rem] text-ink-2">Appointment booked</span>
          <span className="block font-display text-[1rem] font-medium text-ink">Tue, 14 Nov · 10:30</span>
        </span>
      </div>
      <div className="appcheck-photo" aria-hidden="true">
        <span className="appcheck-photo-check">
          <Check className="size-3" strokeWidth={3} />
        </span>
        Photo ready, no studio visit
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="rd-hero" aria-labelledby="home-title">
      <div className="container-site rd-hero-grid">
        <div>
          <Eyebrow className="hero-intro">{site.tagline}</Eyebrow>
          <h1 id="home-title" className="rd-hero-title hero-intro">
            Indian passport, <span className="nowrap">e-OCI</span> and visa help in Germany, <span className="text-accent-700">made simpler.</span>
          </h1>
          <p className="rd-hero-lead hero-intro">
            We check your documents, fill in your forms, help book your appointment and support you in emergencies, so your
            application is right the first time.
          </p>
          <div className="hero-intro mt-8 flex flex-wrap gap-3">
            <Link href="/contact/" className="btn btn-dark" data-cta-location="home-hero">
              <span className="btn-face">Get Assistance</span>
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
              data-cta="whatsapp"
              data-cta-location="home-hero"
              data-topic="general"
            >
              <span className="btn-face">
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                WhatsApp us
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </span>
            </a>
          </div>
          <p className="rd-note hero-intro mt-8">Independent private service. Not an embassy, consulate or government authority.</p>
        </div>
        <ApplicationCheck />
      </div>
    </section>
  );
}

/* ----- Choose your service -------------------------------------------------------------------------- */

export function ChooseService() {
  return (
    <section aria-labelledby="choose-service" className="rd-section rd-band">
      <div className="container-site">
        <Eyebrow>Six services, named the way the consulates name them</Eyebrow>
        <div className="rd-head">
          <h2 id="choose-service" className="rd-h2">
            Choose your service
          </h2>
          <p className="rd-head-aside">
            Not sure which one fits?{" "}
            <Link href={enquiryHref()} className="rd-link">
              Describe your situation
            </Link>{" "}
            and we tell you.
          </p>
        </div>
        <div className="service-list-grid">
          <ul className="service-list">
            {services.map((service) => (
              <li key={service.slug}>
                <h3 className="service-list-title">
                  <Link href={`/services/${service.slug}/`}>{service.title}</Link>
                </h3>
                <p className="service-list-summary">{service.summary}</p>
                <p className="service-list-for">Mainly for {mainlyForPhrase(service)}</p>
              </li>
            ))}
          </ul>
          <aside className="included-card" aria-labelledby="included-title">
            <p id="included-title" className="eyebrow">
              Included with every service
            </p>
            <CheckRows className="mt-4" items={includedWithEveryService} />
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ----- Why Simplyes --------------------------------------------------------------------------------- */

export function WhySection() {
  return (
    <section aria-labelledby="why-simplyes" className="rd-section rd-why">
      <div className="container-site rd-why-grid">
        <div>
          <Eyebrow>Why {site.name}</Eyebrow>
          <h2 id="why-simplyes" className="rd-h2 mt-5">
            Right the first time, with a clear line between what we do and what stays with the authorities.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[1rem] leading-relaxed text-ink-2">
            We know the forms, the photo rules and the documents each mission asks for. You get one person on WhatsApp who
            prepares everything with you.
          </p>
        </div>
        <div className="why-card">
          <CheckRows items={whySimplyes} />
        </div>
      </div>
    </section>
  );
}

/* ----- Five steps + video --------------------------------------------------------------------------- */

export function FiveSteps({ withVideo = true }: { withVideo?: boolean }) {
  return (
    <section aria-labelledby="five-steps" className="rd-section rd-white">
      <div className="container-site">
        <div className="rd-head rd-head-end">
          <h2 id="five-steps" className="rd-h2 max-w-[17ch]">
            Five clear steps, from first message to submission
          </h2>
          <p className="rd-head-aside">No documents needed to start. Official processing and decisions always stay with the authorities.</p>
        </div>
        <ol className="steps-row">
          {fiveSteps.map((step, i) => (
            <li key={step.title} className="steps-item">
              <span className="steps-num" data-first={i === 0 ? "" : undefined} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="steps-title">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="steps-body">{step.body}</p>
            </li>
          ))}
        </ol>
        {withVideo && (
          <div className="mx-auto mt-14 max-w-[825px]">
            <VideoPlayer video={videos["how-it-works"]} title="Watch: how Simplyes works (59 sec)" size="lg" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ----- Guides --------------------------------------------------------------------------------------- */

export function GuidesSection() {
  return (
    <section aria-labelledby="home-guides" className="rd-section rd-band">
      <div className="container-site">
        <Eyebrow>Step-by-step guides and videos</Eyebrow>
        <div className="rd-head rd-head-end">
          <h2 id="home-guides" className="rd-h2">
            Answers to the questions everyone asks
          </h2>
          <Link href="/guides/" className="rd-link inline-flex items-center gap-1">
            All guides <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
        <ul className="guide-grid">
          {featuredGuides.map((guide) => (
            <li key={guide.slug}>
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
        <MissionChips />
      </div>
    </section>
  );
}

/* ----- FAQs ----------------------------------------------------------------------------------------- */

export function FaqPreview({ items = homeFaqs }: { items?: { question: string; answer: string }[] }) {
  return (
    <section aria-labelledby="home-faqs" className="rd-section rd-band rd-band-end">
      <div className="container-site rd-faq-grid">
        <div>
          <Eyebrow>FAQs</Eyebrow>
          <h2 id="home-faqs" className="rd-h2 mt-5 max-w-[8ch]">
            Common questions
          </h2>
          <p className="mt-5 text-[0.9375rem] text-ink-2">
            More answers on the{" "}
            <Link href="/faqs/" className="rd-link">
              FAQs page
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((faq) => (
            <details key={faq.question} className="rd-faq" open>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { site } from "@/content/site";
import { YouTubeIcon } from "@/components/ui/YouTubeLink";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

type Link = { key: string; label: string; href: string; icon: ReactNode };

/** The official profiles that are configured (site.social), in a fixed order. */
export function socialProfiles(): Link[] {
  const profiles: (Link | null)[] = [
    site.social.instagram ? { key: "instagram", label: "Instagram", href: site.social.instagram, icon: <InstagramIcon /> } : null,
    site.social.facebook ? { key: "facebook", label: "Facebook", href: site.social.facebook, icon: <FacebookIcon /> } : null,
    site.social.linkedin ? { key: "linkedin", label: "LinkedIn", href: site.social.linkedin, icon: <LinkedInIcon /> } : null,
  ];
  return profiles.filter((p): p is Link => p !== null);
}

/** "Subscribe on YouTube" plus the configured social profiles, as pills on a dark band. */
export function SocialLinks({ location }: { location: string }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      <li>
        <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" data-cta="youtube" data-cta-location={location} className="social-pill" data-primary="">
          <YouTubeIcon className="size-4" />
          Subscribe on YouTube
          <span className="sr-only"> (opens the Simplyes YouTube channel {site.youtube.handle} in a new tab)</span>
        </a>
      </li>
      {socialProfiles().map((p) => (
        <li key={p.key}>
          <a href={p.href} target="_blank" rel="noopener noreferrer" data-cta={p.key} data-cta-location={location} className="social-pill">
            {p.icon}
            {p.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

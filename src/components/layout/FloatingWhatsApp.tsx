"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { MessageCircle } from "lucide-react";

type Props = {
  /** Prebuilt, encoded wa.me links: the general one and one per published service slug. */
  generalHref: string;
  serviceHrefs: Record<string, string>;
};

/**
 * Floating WhatsApp shortcut. Appears once the visitor has scrolled past the hero
 * (60% of the viewport), and hides while the footer or the final-CTA WhatsApp
 * button is on screen so it never covers them or the back-to-top control. Hidden
 * while the mobile menu is open (html[data-menu-open], via CSS). Uses the
 * service's own message on service pages.
 */
export function FloatingWhatsApp({ generalHref, serviceHrefs }: Props) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [anchorInView, setAnchorInView] = useState(false);

  // Motion's shared scroll listener (one for the whole page), not a listener of our own.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > window.innerHeight * 0.6));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial position after hydration (a reload mid-page)
    setScrolled(window.scrollY > window.innerHeight * 0.6);

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setAnchorInView(visible.size > 0);
    });
    document.querySelectorAll("footer, [data-wa-anchor]").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, [pathname]);

  const slug = /^\/services\/([^/]+)\/?$/.exec(pathname)?.[1];
  const href = (slug && serviceHrefs[slug]) || generalHref;
  const shown = scrolled && !anchorInView;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-topic={slug && serviceHrefs[slug] ? slug : "general"}
      data-floating-wa
      data-visible={shown}
      // Out of the tab order the moment it starts to hide (the fade keeps it visible for a moment).
      tabIndex={shown ? undefined : -1}
      aria-label="Chat with Simplyes on WhatsApp (opens in a new tab)"
      // Hidden state uses visibility:hidden, which also removes it from the tab order and accessibility tree.
      className="fab-wa btn btn-dark"
    >
      <span className="btn-face">
        <MessageCircle aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
        <span className="fab-wa-label">WhatsApp</span>
      </span>
    </a>
  );
}

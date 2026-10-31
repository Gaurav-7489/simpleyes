"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
      aria-label="Chat with SimplYes on WhatsApp (opens in a new tab)"
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

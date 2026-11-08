"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { enquiryHref } from "@/content/services";

type Props = {
  /** Prebuilt, encoded wa.me links: the general one and one per published service slug. */
  generalHref: string;
  serviceHrefs: Record<string, string>;
};

/**
 * Contact affordance that appears once the visitor has scrolled past the hero.
 * - Phones/tablets: a slim bottom bar with Get Assistance + WhatsApp.
 * - Desktop: a single WhatsApp pill in the corner.
 * It hides while the footer or a final CTA ([data-wa-anchor]) is on screen, while the mobile menu is open
 * and while a form field has focus (CSS), so it never covers content or duplicates an on-screen CTA.
 * On service pages both actions carry the service (pre-selected enquiry, service-specific WhatsApp text).
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
  const serviceSlug = slug && serviceHrefs[slug] ? slug : undefined;
  const href = (serviceSlug && serviceHrefs[serviceSlug]) || generalHref;
  const shown = scrolled && !anchorInView;
  const onContact = pathname.startsWith("/contact");

  return (
    <div className="action-bar" data-visible={shown}>
      {!onContact && (
        <Link
          href={enquiryHref(serviceSlug ? { slug: serviceSlug } : undefined, serviceSlug === "corporate-services" ? "corporate" : undefined)}
          data-cta-location="action-bar"
          className="btn btn-dark action-bar-primary"
        >
          <span className="btn-face">Get Assistance</span>
        </Link>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        data-topic={serviceSlug ?? "general"}
        data-floating-wa
        data-visible={shown}
        aria-label="Chat with SimplYes on WhatsApp (opens in a new tab)"
        // Hidden state uses visibility:hidden (inherited from the bar), which also removes it from the tab order.
        className={`fab-wa btn ${onContact ? "btn-dark flex-1" : "btn-light"}`}
      >
        <span className="btn-face w-full">
          <MessageCircle aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
          <span className="fab-wa-label">WhatsApp</span>
        </span>
      </a>
    </div>
  );
}

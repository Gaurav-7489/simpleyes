import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { isProductionBuild, site } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { services } from "@/content/services";
import { whatsappHref } from "@/lib/whatsapp";
import { RevealObserver } from "@/components/RevealObserver";
import { LazyMotion } from "@/components/LazyMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";

/** Headings and buttons (§16 recommendation). Self-hosted by next/font at build time — no runtime Google requests. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

/** Body text (§16 recommendation). */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Indian documentation help in Germany`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: isProductionBuild ? { index: true, follow: true } : { index: false, follow: false },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f6f9f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <FloatingWhatsApp
          generalHref={whatsappHref()}
          serviceHrefs={Object.fromEntries(services.map((service) => [service.slug, whatsappHref(service)]))}
        />
        <Footer />
        {site.gaMeasurementId && <Analytics measurementId={site.gaMeasurementId} />}
        <RevealObserver />
        <LazyMotion />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}

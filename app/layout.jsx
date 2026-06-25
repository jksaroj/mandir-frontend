import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { getServerLocale } from "@/lib/i18n/server";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Hindu Temples, Mantras, Chalisa & Bhakti`,
    template: `%s | ${SITE_NAME}`
  },
  description:
    "Explore Hindu temples, mantras, chalisa, spiritual reels, upcoming events, bhakti articles and pandit services on BrahmaTatva.",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: {
      "hi-IN": "/",
      "en-IN": "/",
      "x-default": "/"
    },
    types: {
      "application/rss+xml": "/rss.xml"
    }
  },
  openGraph: {
    title: `${SITE_NAME} | Hindu Temples, Mantras, Chalisa & Bhakti`,
    description:
      "India-focused spiritual platform for temple darshan guides, mantras, chalisa, bhakti reels and devotional services.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "hi_IN",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Hindu Temples, Mantras, Chalisa & Bhakti`,
    description: "Discover temples, mantras, chalisa and spiritual content on BrahmaTatva.",
    images: [DEFAULT_OG_IMAGE]
  }
};

export default async function RootLayout({ children }) {
  const locale = await getServerLocale();

  return (
    <html lang={locale === "hi" ? "hi" : "en"}>
      <body>
        <ScrollProgress />
        <AppProviders initialLocale={locale}>{children}</AppProviders>
      </body>
    </html>
  );
}

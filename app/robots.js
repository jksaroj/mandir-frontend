import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "Barkrowler",
          "Bytespider",
          "DataForSeoBot",
          "PetalBot",
          "BLEXBot",
          "YandexBot"
        ],
        disallow: "/"
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Googlebot",
          "Google-Extended",
          "Bingbot",
          "PerplexityBot",
          "ClaudeBot",
          "CCBot"
        ],
        allow: "/"
      }
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemaps/pages.xml`,
      `${SITE_URL}/sitemaps/temples.xml`,
      `${SITE_URL}/sitemaps/mantras.xml`,
      `${SITE_URL}/sitemaps/chalisas.xml`,
      `${SITE_URL}/sitemaps/aartis.xml`
    ],
    host: SITE_URL
  };
}

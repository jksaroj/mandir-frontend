import { sitemapDocument, sitemapUrl, toAbsoluteUrl, xmlResponse } from "@/lib/sitemap";

export const revalidate = 60;

const pages = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/temples", changefreq: "daily", priority: "0.9" },
  { path: "/mantras", changefreq: "daily", priority: "0.9" },
  { path: "/chalisa", changefreq: "daily", priority: "0.9" },
  { path: "/reels", changefreq: "daily", priority: "0.7" },
  { path: "/pandit-services", changefreq: "weekly", priority: "0.6" },
];

export async function GET() {
  const urls = pages.map((page) =>
    sitemapUrl({
      loc: toAbsoluteUrl(page.path),
      changefreq: page.changefreq,
      priority: page.priority,
    })
  );

  return xmlResponse(sitemapDocument(urls));
}

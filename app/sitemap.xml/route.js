import { SITE_URL, escapeXml, formatDate, xmlResponse } from "@/lib/sitemap";

export const revalidate = 60;

const sitemapPaths = [
  "/sitemaps/pages.xml",
  "/sitemaps/temples.xml",
  "/sitemaps/mantras.xml",
  "/sitemaps/chalisas.xml",
  "/sitemaps/aartis.xml",
];

export async function GET() {
  const now = formatDate();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapPaths.map((path) =>
      [
        "  <sitemap>",
        `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        "  </sitemap>",
      ].join("\n")
    ),
    "</sitemapindex>",
  ].join("\n");

  return xmlResponse(body);
}

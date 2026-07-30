import { SITE_URL, escapeXml, formatDate, xmlResponse } from "@/lib/sitemap";

export const revalidate = 3600;

const childSitemaps = [
  "pages",
  "temples",
  "mantras",
  "chalisas",
  "aartis",
  "blogs",
  "events",
  "create-share",
];

export async function GET() {
  const lastmod = formatDate(new Date());
  const entries = childSitemaps.map((name) => [
    "  <sitemap>",
    `    <loc>${escapeXml(`${SITE_URL}/sitemaps/${name}.xml`)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "  </sitemap>",
  ].join("\n"));

  return xmlResponse([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</sitemapindex>",
  ].join("\n"));
}

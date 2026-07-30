import { fetchPaginatedRows, sitemapDocument, sitemapUrl, toAbsoluteUrl, xmlResponse } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  const rows = await fetchPaginatedRows("/festivals");
  const urls = rows.filter((row) => row?.slug).map((row) => sitemapUrl({
    loc: toAbsoluteUrl(`/events/${row.slug}`),
    lastmod: row.updatedAt || row.updated_at || row.start_date || row.createdAt,
    changefreq: "weekly",
    priority: "0.8",
  }));
  return xmlResponse(sitemapDocument(urls));
}

import { fetchPaginatedRows, sitemapDocument, sitemapUrl, toAbsoluteUrl, xmlResponse } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  const rows = await fetchPaginatedRows("/articles");
  const urls = rows.filter((row) => row?.slug).map((row) => sitemapUrl({
    loc: toAbsoluteUrl(`/blog/${row.slug}`),
    lastmod: row.updatedAt || row.updated_at || row.published_at || row.createdAt,
    changefreq: "weekly",
    priority: "0.7",
  }));
  return xmlResponse(sitemapDocument(urls));
}

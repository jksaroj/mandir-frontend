import { fetchPaginatedRows, sitemapDocument, sitemapUrl, toAbsoluteUrl, xmlResponse } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  const rows = await fetchPaginatedRows("/create-share-media");
  const urls = rows.map((row) => row?.id || row?._id).filter(Boolean).map((id) => sitemapUrl({
    loc: toAbsoluteUrl(`/create-and-share/${id}`),
    changefreq: "weekly",
    priority: "0.6",
  }));
  return xmlResponse(sitemapDocument(urls));
}

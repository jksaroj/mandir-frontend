import { getTempleSitemapUrls, sitemapDocument, xmlResponse } from "@/lib/sitemap";

export const revalidate = 60;

export async function GET() {
  const urls = await getTempleSitemapUrls();
  return xmlResponse(sitemapDocument(urls));
}

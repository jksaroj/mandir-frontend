import { getSpiritualSitemapUrls, sitemapDocument, xmlResponse } from "@/lib/sitemap";

export const revalidate = 60;

export async function GET() {
  const urls = await getSpiritualSitemapUrls("chalisa");
  return xmlResponse(sitemapDocument(urls));
}

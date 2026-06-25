import { SITE_URL } from "@/lib/sitemap";

export const revalidate = 60;

export async function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      `RSS: ${SITE_URL}/rss.xml`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
      },
    }
  );
}

import {
  SITE_URL,
  escapeXml,
  fetchPaginatedRows,
  formatDate,
  toAbsoluteUrl,
  xmlResponse,
} from "@/lib/sitemap";
import { fetchSpiritualItems } from "@/lib/mantras";
import { fetchTemples } from "@/lib/temples";

export const revalidate = 60;

function text(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "object" && !Array.isArray(value)) {
    return value.en || value.hi || Object.values(value).find(Boolean) || fallback;
  }
  return String(value);
}

function stripHtml(value) {
  return text(value)
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function rssItem({ title, link, description, pubDate, category }) {
  return [
    "    <item>",
    `      <title>${escapeXml(title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <description>${escapeXml(stripHtml(description))}</description>`,
    `      <pubDate>${new Date(formatDate(pubDate)).toUTCString()}</pubDate>`,
    `      <category>${escapeXml(category)}</category>`,
    "    </item>",
  ].join("\n");
}

async function templeItems() {
  const apiRows = await fetchPaginatedRows("/temples", { sort: "newest" });
  const rows = apiRows.length ? apiRows : await fetchTemples();

  return rows
    .filter((temple) => temple?.slug)
    .map((temple) =>
      rssItem({
        title: text(temple.name, "Temple"),
        link: toAbsoluteUrl(`/temples/${temple.slug}`),
        description:
          temple.short_description ||
          temple.excerpt ||
          temple.description ||
          [temple.city, temple.state].filter(Boolean).join(", "),
        pubDate: temple.updated_at || temple.created_at,
        category: "Temples",
      })
    );
}

async function spiritualItems(type, label) {
  const endpoint = type === "chalisa" ? "/chalisas" : type === "aarti" ? "/aartis" : "/mantras";
  const apiRows = await fetchPaginatedRows(endpoint, type === "mantra" ? { type } : {});
  const rows = apiRows.length ? apiRows : await fetchSpiritualItems({ type });

  return rows
    .filter((item) => item?.slug)
    .map((item) => {
      const path = type === "chalisa" ? `/chalisa/${item.slug}` : `/mantras/${item.slug}`;
      return rssItem({
        title: text(item.title, label),
        link: toAbsoluteUrl(path),
        description:
          item.short_description ||
          item.excerpt ||
          item.meta_description ||
          item.meaning ||
          item.original_text ||
          "",
        pubDate: item.updated_at || item.created_at,
        category: label,
      });
    });
}

export async function GET() {
  const [temples, mantras, chalisas, aartis] = await Promise.all([
    templeItems(),
    spiritualItems("mantra", "Mantras"),
    spiritualItems("chalisa", "Chalisas"),
    spiritualItems("aarti", "Aartis"),
  ]);

  const items = [...temples, ...mantras, ...chalisas, ...aartis].slice(0, 500);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>brahmatatva</title>",
    `    <link>${escapeXml(SITE_URL)}</link>`,
    "    <description>Latest temples, mantras, chalisas and aartis from brahmatatva.</description>",
    "    <language>en-IN</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(`${SITE_URL}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return xmlResponse(body);
}

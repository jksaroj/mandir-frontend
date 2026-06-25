import { fetchSpiritualItems } from "./mantras";
import { fetchTemples } from "./temples";
import { apiGet } from "./api";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.brahmatatva.com").replace(/\/$/, "");

export const SITEMAP_REVALIDATE_SECONDS = 60;

export function xmlResponse(body) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${SITEMAP_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}

export function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toAbsoluteUrl(path) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export function sitemapUrl({ loc, lastmod, changefreq = "weekly", priority = "0.7" }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${formatDate(lastmod)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export function sitemapDocument(urls) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

export async function fetchPaginatedRows(endpoint, params = {}) {
  const rows = [];
  const limit = 100;

  for (let page = 1; page <= 1000; page += 1) {
    const query = new URLSearchParams({
      ...params,
      page: String(page),
      limit: String(limit),
    });
    const response = await apiGet(`${endpoint}?${query}`);
    const data = Array.isArray(response?.data) ? response.data : [];
    rows.push(...data);

    if (!response?.pagination?.hasNextPage || data.length === 0) {
      break;
    }
  }

  return rows;
}

export async function getTempleSitemapUrls() {
  const apiTemples = await fetchPaginatedRows("/temples", { sort: "newest" });
  const temples = apiTemples.length ? apiTemples : await fetchTemples();
  return temples
    .filter((temple) => temple?.slug)
    .map((temple) =>
      sitemapUrl({
        loc: toAbsoluteUrl(`/temples/${temple.slug}`),
        lastmod: temple.updated_at || temple.created_at,
        changefreq: "weekly",
        priority: "0.8",
      })
    );
}

export async function getSpiritualSitemapUrls(type) {
  const endpoint = type === "chalisa" ? "/chalisas" : type === "aarti" ? "/aartis" : "/mantras";
  const apiItems = await fetchPaginatedRows(endpoint, type === "mantra" ? { type } : {});
  const items = apiItems.length ? apiItems : await fetchSpiritualItems({ type });
  return items
    .filter((item) => item?.slug)
    .map((item) => {
      const path = type === "chalisa" ? `/chalisa/${item.slug}` : `/mantras/${item.slug}`;
      return sitemapUrl({
        loc: toAbsoluteUrl(path),
        lastmod: item.updated_at || item.created_at,
        changefreq: "weekly",
        priority: type === "aarti" ? "0.75" : "0.8",
      });
    });
}

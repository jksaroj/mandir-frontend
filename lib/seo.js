import { apiGet } from "./api";

export const SITE_NAME = "BrahmaTatva";
export const SITE_URL = "https://www.brahmatatva.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/brahmatatva.png`;

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripHtml(value = "") {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(value = "", max = 155) {
  const text = stripHtml(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

export function imageUrl(image) {
  return image || DEFAULT_OG_IMAGE;
}

export function seoKeywords(...groups) {
  return [...new Set(groups.flat().filter(Boolean).map((item) => String(item).trim()))];
}

export function languageAlternates(path) {
  return {
    canonical: absoluteUrl(path)
  };
}

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = []
}) {
  const safeDescription = truncate(description || "Explore Hindu temples, mantras, chalisa, events and bhakti content on BrahmaTatva.");
  const url = absoluteUrl(path);
  const ogImage = imageUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: safeDescription,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: { index: true, follow: true },
    alternates: languageAlternates(path),
    openGraph: {
      title,
      description: safeDescription,
      url,
      siteName: SITE_NAME,
      locale: "hi_IN",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [ogImage]
    }
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function itemListSchema(items, basePath) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`${basePath}/${item.slug}`),
      name: item.name || item.title
    }))
  };
}

export function faqSchema(items = []) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export async function fetchSitemapRows(endpoint) {
  const rows = [];
  for (let page = 1; page <= 1000; page += 1) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await apiGet(`${endpoint}${separator}limit=100&page=${page}`);
    const batch = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
    rows.push(...batch);
    if (!response?.pagination?.hasNextPage || batch.length === 0) break;
  }
  return rows;
}

export async function getAllSeoSitemapItems() {
  const [temples, mantras, chalisas, blogs, events] = await Promise.all([
    fetchSitemapRows("/temples"),
    fetchSitemapRows("/mantras?type=mantra"),
    fetchSitemapRows("/chalisas"),
    fetchSitemapRows("/articles"),
    fetchSitemapRows("/festivals")
  ]);

  return { temples, mantras, chalisas, blogs, events };
}

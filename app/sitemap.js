import { getAllSeoSitemapItems, SITE_URL } from "@/lib/seo";

export const revalidate = 60;

function date(value) {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function entry(path, lastModified, changeFrequency, priority) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: date(lastModified),
    changeFrequency,
    priority
  };
}

export default async function sitemap() {
  const { temples, mantras, chalisas, blogs, events } = await getAllSeoSitemapItems();
  const staticPages = [
    entry("/", new Date(), "daily", 1.0),
    entry("/temples", new Date(), "daily", 0.9),
    entry("/mantras", new Date(), "weekly", 0.9),
    entry("/chalisa", new Date(), "weekly", 0.9),
    entry("/reels", new Date(), "daily", 0.9),
    entry("/blog", new Date(), "weekly", 0.7),
    entry("/pandit-services", new Date(), "weekly", 0.9)
  ];

  const templePages = temples.map((item) =>
    entry(`/temples/${item.slug}`, item.updatedAt || item.updated_at || item.created_at, "weekly", 0.8)
  );
  const mantraPages = mantras.map((item) => entry(`/mantras/${item.slug}`, item.updatedAt, "weekly", 0.8));
  const chalisaPages = chalisas.map((item) => entry(`/chalisa/${item.slug}`, item.updatedAt, "weekly", 0.8));
  const blogPages = blogs
    .filter((item) => item.slug)
    .map((item) => entry(`/blog/${item.slug}`, item.updated_at || item.updatedAt || item.published_at, "weekly", 0.7));
  const eventPages = events
    .filter((item) => item.slug)
    .map((item) => entry(`/events/${item.slug}`, item.updated_at || item.updatedAt || item.start_date, "daily", 0.8));

  return [...staticPages, ...templePages, ...mantraPages, ...chalisaPages, ...blogPages, ...eventPages];
}

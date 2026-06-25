import { apiGet } from "./api";
import { imageUrl, stripHtml } from "./seo";

function text(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "object" && !Array.isArray(value)) {
    return value.en || value.hi || Object.values(value).find(Boolean) || fallback;
  }
  return String(value);
}

export function normalizeEvent(row) {
  if (!row) return null;
  const city = text(row.city);
  const state = text(row.state);

  return {
    slug: row.slug,
    name: text(row.name || row.title, "BrahmaTatva Event"),
    shortDescription: stripHtml(text(row.shortDescription || row.short_description || row.excerpt || row.meta_description)),
    description: stripHtml(text(row.description || row.content || row.body || row.excerpt)),
    imageUrl: imageUrl(row.imageUrl || row.image_url || row.cover_image || row.image),
    city,
    state,
    address: text(row.address || row.location),
    startDate: row.startDate || row.start_date || row.event_date || row.date || new Date().toISOString(),
    endDate: row.endDate || row.end_date || row.startDate || row.start_date || row.event_date || row.date,
    publishedAt: row.publishedAt || row.published_at || row.created_at || new Date().toISOString(),
    updatedAt: row.updatedAt || row.updated_at || row.publishedAt || row.published_at || new Date().toISOString(),
    organizer: text(row.organizer || row.organizer_name, "BrahmaTatva"),
    status: row.eventStatus || row.event_status || "https://schema.org/EventScheduled"
  };
}

export async function fetchEvents() {
  const response = await apiGet("/events?limit=50");
  const rows = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
  return rows.map(normalizeEvent).filter((item) => item?.slug);
}

export async function fetchEventBySlug(slug) {
  const response = await apiGet(`/events/${slug}`);
  const row = response?.data ?? response;
  if (row?.slug) return normalizeEvent(row);
  return null;
}

import { apiGet } from "./api";
import { imageUrl, stripHtml } from "./seo";

function text(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "object" && !Array.isArray(value)) {
    return value.en || value.hi || Object.values(value).find(Boolean) || fallback;
  }
  return String(value);
}

export function normalizeBlog(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    title: text(row.title || row.name, "BrahmaTatva Article"),
    shortDescription: stripHtml(text(row.shortDescription || row.short_description || row.excerpt || row.meta_description)),
    description: stripHtml(text(row.description || row.content || row.body || row.excerpt)),
    content: text(row.content || row.body || row.description),
    imageUrl: imageUrl(row.imageUrl || row.image_url || row.cover_image || row.image),
    author: text(row.author || row.author_name, "BrahmaTatva"),
    publishedAt: row.publishedAt || row.published_at || row.created_at || new Date().toISOString(),
    updatedAt: row.updatedAt || row.updated_at || row.publishedAt || row.published_at || new Date().toISOString(),
    category: text(row.category, "Bhakti")
  };
}

export async function fetchBlogs() {
  const response = await apiGet("/blogs?limit=50");
  const rows = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
  return rows.map(normalizeBlog).filter((item) => item?.slug);
}

export async function fetchBlogBySlug(slug) {
  const response = await apiGet(`/blogs/${slug}`);
  const row = response?.data ?? response;
  if (row?.slug) return normalizeBlog(row);
  return null;
}

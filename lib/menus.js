import { apiGet, getCurrentLocale } from "./api";

function labelText(label, locale = "en") {
  if (label && typeof label === "object") return label.en || label.hi || "";
  return String(label || "");
}

function pickLabel(item, locale) {
  const exact = locale === "hi" ? item.label_hi : item.label_en;
  if (exact) return String(exact);
  if (item.label && typeof item.label === "object") return String(item.label[locale] || "");
  return "";
}

function normalizeMenuItem(item, locale) {
  const children = Array.isArray(item.children)
    ? item.children.map((child) => normalizeMenuItem(child, locale)).filter(Boolean)
    : [];
  const label = pickLabel(item, locale);
  if (!label) return null;

  return {
    id: item.id || item._id || item.url || labelText(item.label, locale),
    label,
    url: item.url || "#",
    openInNewTab: Boolean(item.openInNewTab),
    children,
  };
}

export async function fetchMenu(position = "header") {
  const locale = await getCurrentLocale();
  const response = await apiGet(`/menus?position=${encodeURIComponent(position)}`, {
    next: { revalidate: 60 }
  });
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map((item) => normalizeMenuItem(item, locale)).filter(Boolean);
}

export async function fetchHeaderMenu() {
  return fetchMenu("header");
}

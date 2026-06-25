import { apiGet } from "./api";

function labelText(label) {
  if (label && typeof label === "object") return label.en || label.hi || "";
  return String(label || "");
}

function normalizeMenuItem(item) {
  return {
    id: item.id || item._id || item.url || labelText(item.label),
    label: labelText(item.label),
    url: item.url || "#",
    openInNewTab: Boolean(item.openInNewTab),
    children: Array.isArray(item.children) ? item.children.map(normalizeMenuItem) : [],
  };
}

export async function fetchMenu(position = "header") {
  const response = await apiGet(`/menus?position=${encodeURIComponent(position)}`, {
    next: { revalidate: 60 }
  });
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map(normalizeMenuItem);
}

export async function fetchHeaderMenu() {
  return fetchMenu("header");
}

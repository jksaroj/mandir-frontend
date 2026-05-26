import { apiGet } from "./api";
import { resolveImageUrl } from "./images";

const fallbackImage =
  "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=300&q=80";

const SPIRITUAL_TYPES = ["mantra", "chalisa", "stotra", "aarti"];

const staticMantras = [
  {
    slug: "om-namah-shivaya",
    title: "Om Namah Shivaya",
    type: "mantra",
    deity: "Lord Shiva",
    original_text: "ॐ नमः शिवाय",
    transliteration: "Om Namah Shivaya",
    short_description:
      "A sacred Panchakshari mantra invoking Lord Shiva for peace and transformation.",
    duration_label: "4:52",
    cover_image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=300&q=80"
  },
  {
    slug: "om-namo-bhagavate-vasudevaya",
    title: "Om Namo Bhagavate Vasudevaya",
    type: "mantra",
    deity: "Lord Vishnu",
    original_text: "ॐ नमो भगवते वासुदेवाय",
    transliteration: "Om Namo Bhagavate Vasudevaya",
    short_description: "A Vishnu mantra for surrender, devotion and divine protection.",
    duration_label: "5:20",
    cover_image: "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=300&q=80"
  }
];

const staticChalisas = [
  { slug: "hanuman-chalisa", title: "Hanuman Chalisa", type: "chalisa" },
  { slug: "shri-ram-chalisa", title: "Shri Ram Chalisa", type: "chalisa" }
];

function resolveType(row) {
  const raw = String(row.type || row.category || "mantra").toLowerCase();
  if (SPIRITUAL_TYPES.includes(raw)) return raw;
  return "mantra";
}

function parseBenefits(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function normalizeItem(row) {
  const type = resolveType(row);
  return {
    slug: row.slug,
    title: row.title,
    type,
    category: type,
    categoryLabel: typeof row.category === "string" && !SPIRITUAL_TYPES.includes(row.category.toLowerCase())
      ? row.category
      : "",
    deity: row.deity ?? "",
    originalText: row.originalText ?? row.original_text ?? "",
    transliteration: row.transliteration ?? "",
    excerpt: row.excerpt ?? row.short_description ?? row.meaning ?? "",
    readTime: row.readTime ?? row.duration_label ?? row.read_time ?? "",
    benefits: parseBenefits(row.benefits),
    howToChant: row.howToChant ?? row.how_to_chant ?? "",
    notes: row.notes ?? row.when_to_chant ?? "",
    image: resolveImageUrl(row.cover_image ?? row.image, fallbackImage),
    related: Array.isArray(row.related) ? row.related.map(normalizeItem) : []
  };
}

function staticFallback(type) {
  const all = [
    ...staticMantras,
    ...staticChalisas.map((c) => ({ ...c, short_description: "", duration_label: "" }))
  ].map(normalizeItem);
  if (!type) return all;
  return all.filter((item) => item.type === type);
}

export async function fetchSpiritualItems({ type } = {}) {
  const params = new URLSearchParams({ limit: "50" });
  if (type) params.set("type", type);

  const response = await apiGet(`/mantras?${params}`);
  const rows = Array.isArray(response?.data) ? response.data : null;

  if (rows?.length) {
    return rows.map(normalizeItem);
  }

  return staticFallback(type);
}

export async function fetchSpiritualItemBySlug(slug) {
  const response = await apiGet(`/mantras/${slug}`);
  const row = response?.data ?? (response?.slug ? response : null);

  if (row?.slug) {
    return normalizeItem(row);
  }

  return staticFallback().find((item) => item.slug === slug) ?? null;
}

export function getSpiritualListHref(type) {
  return type === "chalisa" ? "/chalisa" : "/mantras";
}

export function getMantraHref(slugOrItem, typeHint) {
  let slug = slugOrItem;
  let type = typeHint;

  if (slugOrItem && typeof slugOrItem === "object") {
    slug = slugOrItem.slug;
    type = slugOrItem.type ?? slugOrItem.category;
  }

  const base = type === "chalisa" ? "/chalisa" : "/mantras";
  return `${base}/${slug}`;
}

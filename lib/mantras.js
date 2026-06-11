import { apiGet } from "./api";
import { resolveImageUrl, UPLOAD_BASE } from "./images";

const fallbackImage =
  "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=300&q=80";

const SPIRITUAL_TYPES = ["mantra", "chalisa", "stotra", "aarti"];

// Backend keeps chalisas and aartis in their own collections/endpoints.
const TYPE_ENDPOINTS = {
  chalisa: "/chalisas",
  aarti: "/aartis"
};
const ALL_ENDPOINTS = ["/mantras", "/chalisas", "/aartis"];

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

/** API may return bilingual fields as { en, hi } objects — flatten to a string (first non-empty). */
function text(value, locale = "en") {
  if (value == null) return "";
  if (typeof value === "object" && !Array.isArray(value)) {
    return String(value[locale] || value.en || value.hi || "");
  }
  return String(value);
}

/** Sirf specific language ka content (object fields ke liye) — duplicate avoid karne ke liye. */
function localizedOnly(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return String(value[locale] || "");
  }
  return "";
}

/** Admin rich-text editor HTML save karta hai — usse readable plain text me convert karo. */
function htmlToText(value) {
  const raw = String(value ?? "");
  if (!raw) return "";
  if (!/[<&]/.test(raw)) return raw.trim();
  return raw
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Bilingual flatten + HTML strip — frontend par hamesha saaf text. */
function clean(value, locale = "en") {
  return htmlToText(text(value, locale));
}

/** Resolve uploaded media path (audio/video) to a full URL; keep external links as-is. */
function resolveMediaUrl(path) {
  if (!path) return "";
  const raw = String(path).trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const base = UPLOAD_BASE.replace(/\/$/, "");
  return `${base}/${raw.replace(/^\//, "")}`;
}

function resolveType(row) {
  const raw = String(text(row.type) || text(row.category) || "mantra").toLowerCase();
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
  const category = clean(row.category);
  return {
    slug: row.slug,
    title: clean(row.title),
    type,
    category: type,
    categoryLabel:
      category && !SPIRITUAL_TYPES.includes(category.toLowerCase()) ? category : "",
    deity: clean(row.deity),
    originalText: clean(row.originalText ?? row.original_text),
    originalTextHi: htmlToText(localizedOnly(row.originalText ?? row.original_text, "hi")),
    transliteration: clean(row.transliteration),
    meaningHi: htmlToText(localizedOnly(row.meaning, "hi")),
    excerpt: clean(row.excerpt ?? row.short_description ?? row.meta_description ?? row.meaning),
    readTime: clean(row.readTime ?? row.duration_label ?? row.read_time),
    benefits: parseBenefits(row.benefits).map(htmlToText).filter(Boolean),
    howToChant: clean(row.howToChant ?? row.how_to_chant),
    notes: clean(row.notes ?? row.when_to_chant),
    image: resolveImageUrl(row.cover_image ?? row.image, fallbackImage),
    audioUrl: resolveMediaUrl(row.audioUrl ?? row.audio_url),
    audioSource: row.audioSource ?? row.audio_source ?? "",
    videoUrl: resolveMediaUrl(row.videoUrl ?? row.video_url),
    videoSource: row.videoSource ?? row.video_source ?? "",
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

async function fetchRows(endpoint, params) {
  const response = await apiGet(`${endpoint}?${params}`);
  return Array.isArray(response?.data) ? response.data : [];
}

export async function fetchSpiritualItems({ type } = {}) {
  let rows = [];

  if (type) {
    const endpoint = TYPE_ENDPOINTS[type];
    if (endpoint) {
      rows = await fetchRows(endpoint, new URLSearchParams({ limit: "50" }));
    } else {
      rows = await fetchRows("/mantras", new URLSearchParams({ limit: "50", type }));
    }
  } else {
    const results = await Promise.all(
      ALL_ENDPOINTS.map((endpoint) => fetchRows(endpoint, new URLSearchParams({ limit: "50" })))
    );
    rows = results.flat();
  }

  // API me ek bhi record ho to API data use hota hai; warna static fallback.
  if (rows.length) {
    return rows.map(normalizeItem);
  }

  return staticFallback(type);
}

export async function fetchSpiritualItemBySlug(slug, typeHint) {
  const order =
    typeHint === "chalisa"
      ? ["/chalisas", "/mantras", "/aartis"]
      : typeHint === "aarti"
        ? ["/aartis", "/mantras", "/chalisas"]
        : ["/mantras", "/chalisas", "/aartis"];

  for (const endpoint of order) {
    const response = await apiGet(`${endpoint}/${slug}`);
    const row = response?.data ?? (response?.slug ? response : null);
    if (row?.slug) {
      return normalizeItem(row);
    }
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

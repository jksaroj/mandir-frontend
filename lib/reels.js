import { apiGet } from "./api";
import { resolveImageUrl } from "./images";

const fallbackThumbs = [
  "/reels/shiva.svg",
  "/reels/hanuman.svg",
  "/reels/krishna.svg",
  "/reels/aarti.svg",
  "/reels/temple.svg",
  "/reels/durga.svg",
  "/reels/ganesh.svg",
  "/reels/satsang.svg"
];

export function youtubeIdFromUrl(url) {
  const raw = String(url || "");
  const patterns = [
    /youtube\.com\/shorts\/([^?&/]+)/i,
    /youtube\.com\/watch\?v=([^?&/]+)/i,
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i
  ];
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

/**
 * Extracts the reels array from whatever shape the API returns:
 *   { data: [...] }
 *   { data: { reels: [...] } }
 *   { reels: [...] }
 *   [...]
 */
function extractReelsArray(response) {
  if (!response) return null;
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.reels)) return response.data.reels;
  if (Array.isArray(response.reels)) return response.reels;
  return null;
}

export function normalizeReel(reel, index) {
  const isYoutube =
    reel.sourceType === "youtube" ||
    String(reel.videoUrl || "").includes("youtube") ||
    String(reel.videoUrl || "").includes("youtu.be");

  const youtubeId = isYoutube ? youtubeIdFromUrl(reel.videoUrl) : "";

  // Auto-generate YouTube thumbnail when admin leaves thumbnail empty
  // YouTube provides: mqdefault (320×180), hqdefault (480×360), maxresdefault (1280×720)
  const youtubeThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : "";

  const thumbnail =
    reel.thumbnail && String(reel.thumbnail).trim()
      ? resolveImageUrl(reel.thumbnail, youtubeThumbnail || fallbackThumbs[index % fallbackThumbs.length])
      : youtubeThumbnail || fallbackThumbs[index % fallbackThumbs.length];

  return {
    ...reel,
    _id: reel._id || reel.id || `reel-${index}`,
    id: reel._id || reel.id || `reel-${index}`,
    title: reel.title || "Divine Reel",
    category: reel.category || "Bhajan",
    deity: reel.deity || reel.category || "Bhakti",
    filter: String(reel.category || reel.deity || "all").toLowerCase(),
    duration: reel.duration || `0:${25 + (index % 7)}`,
    views: reel.views || `${(6 + (index % 14) + 0.2).toFixed(1)}K`,
    youtubeId,
    href: reel.videoUrl || (reel.videoFile ? resolveImageUrl(reel.videoFile, "") : "/reels"),
    thumbnail,
    status: reel.status || "active"
  };
}

/**
 * Fetch reels from the live API.
 * Returns normalized array or empty array on failure.
 */
export async function fetchReels({ limit = 100 } = {}) {
  const response = await apiGet(`/reels?limit=${limit}`);
  const arr = extractReelsArray(response);
  if (!arr || arr.length === 0) return [];
  return arr
    .filter((r) => r.status !== "inactive" && r.status !== "draft")
    .map(normalizeReel);
}

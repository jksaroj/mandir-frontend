export const UPLOAD_BASE = process.env.NEXT_PUBLIC_UPLOAD_BASE ?? "http://localhost:5000";

export const FALLBACK_TEMPLE_IMAGE =
  "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=1200&q=80";

/** True when src is safe for next/image (non-empty string). */
export function isValidImageSrc(src) {
  return typeof src === "string" && src.trim().length > 0;
}

/** API may return images as array or single object. */
export function normalizeImagesList(images) {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  if (typeof images === "object") return [images];
  return [];
}

/**
 * Resolve backend path, relative path, or full URL. Never returns "".
 * Strips duplicate "uploads/" when base already ends with uploads path.
 */
export function resolveImageUrl(path, fallback = FALLBACK_TEMPLE_IMAGE) {
  if (path == null) return fallback;
  if (typeof path === "object") {
    return resolveImageUrl(path.image_url ?? path.url ?? path.src, fallback);
  }
  const raw = String(path).trim();
  if (!raw) return fallback;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const base = UPLOAD_BASE.replace(/\/$/, "");
  let clean = raw.replace(/^\//, "");
  // uploads/temples/x.png → /uploads/temples/x.png (static mount is /uploads)
  if (!clean.startsWith("uploads/")) clean = `uploads/${clean}`;
  return `${base}/${clean}`;
}

/** Next.js optimizer often fails on localhost backend — serve file directly. */
export function isBackendUploadUrl(url) {
  if (!isValidImageSrc(url)) return false;
  try {
    const u = new URL(url);
    const upload = new URL(UPLOAD_BASE);
    if (u.hostname === upload.hostname && u.port === upload.port) return true;
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") return true;
  } catch {
    return false;
  }
  return false;
}

/** Build ordered unique gallery URLs for a temple record from API. */
export function buildTempleImageList(row, mainFallback) {
  const main = resolveImageUrl(row?.main_image ?? row?.image, mainFallback);
  const urls = [];
  const gallery = normalizeImagesList(row?.images);

  for (const item of gallery) {
    const path = typeof item === "string" ? item : item?.image_url;
    const url = resolveImageUrl(path, "");
    if (isValidImageSrc(url) && !urls.includes(url)) {
      urls.push(url);
    }
  }

  if (!urls.includes(main)) urls.unshift(main);
  return urls.length ? urls : [main];
}

/** SEO-friendly alt text for temple photos. */
export function templeImageAlt(templeName, options = {}) {
  const { index, total, context = "photo" } = options;
  const base = `${templeName} temple`;
  if (context === "thumbnail" && index != null) {
    return `${base} — gallery image ${index + 1}${total ? ` of ${total}` : ""}`;
  }
  if (context === "hero") return `${base} — main darshan view`;
  if (context === "gallery" && index != null) return `${base} — sacred architecture photo ${index + 1}`;
  return `${base} — ${context}`;
}

export const IMAGE_SIZES = {
  hero: "(min-width: 1024px) 55vw, 100vw",
  thumbnail: "(min-width: 768px) 10vw, 20vw",
  card: "(min-width: 1024px) 20vw, 50vw",
  gallery: "(min-width: 1024px) 25vw, 50vw",
};

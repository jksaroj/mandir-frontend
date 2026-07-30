import { apiGet, getCurrentLocale } from "./api";
import { resolveImageUrl } from "./images";

function localizedText(value, locale, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "object" && !Array.isArray(value)) {
    return String(value[locale] || fallback);
  }
  return String(value);
}

/**
 * Homepage hero banners — admin Banner Management se aate hain.
 * API me ek bhi banner ho to wahi use hota hai, warna hero apne static slides dikhata hai.
 */
export async function fetchBanners() {
  const locale = await getCurrentLocale();
  const response = await apiGet("/banners", { cache: "no-store" });
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows
    .filter((b) => b?.image_url)
    .map((b) => ({
      id: b.id,
      name: localizedText(b.name, locale),
      heading: localizedText(b.heading, locale),
      description: localizedText(b.description, locale),
      backgroundColor: /^#[0-9a-f]{6}$/i.test(String(b.background_color || "")) ? b.background_color : "#061b42",
      slug: b.slug ?? "",
      image: resolveImageUrl(b.background_image_url || b.image_url, "")
    }))
    .filter((b) => b.image);
}

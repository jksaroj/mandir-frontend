import { apiGet } from "./api";
import { resolveImageUrl } from "./images";

/**
 * Homepage hero banners — admin Banner Management se aate hain.
 * API me ek bhi banner ho to wahi use hota hai, warna hero apne static slides dikhata hai.
 */
export async function fetchBanners() {
  const response = await apiGet("/banners");
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows
    .filter((b) => b?.image_url)
    .map((b) => ({
      id: b.id,
      name: typeof b.name === "object" ? (b.name.en ?? b.name.hi ?? "") : String(b.name ?? ""),
      heading: typeof b.heading === "object" ? (b.heading.en ?? b.heading.hi ?? "") : String(b.heading ?? ""),
      description: typeof b.description === "object" ? (b.description.en ?? b.description.hi ?? "") : String(b.description ?? ""),
      slug: b.slug ?? "",
      image: resolveImageUrl(b.background_image_url || b.image_url, ""),
      foregroundImage: b.background_image_url ? resolveImageUrl(b.image_url, "") : ""
    }))
    .filter((b) => b.image);
}

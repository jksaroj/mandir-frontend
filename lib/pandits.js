import { apiGet } from "./api";

const staticPandits = [
  {
    slug: "pandit-sri-venkatesh-sharma",
    name: "Pandit Sri Venkatesh Sharma",
    title: "Vedic Scholar",
    city: "Tirupati, Andhra Pradesh",
    languages: ["Sanskrit", "Hindi", "Telugu"],
    experienceYears: "22 Years",
    specialties: ["Vedic Pooja", "Graha Shanti", "Marriage"],
    rating: "4.9",
    reviewCount: "128 Reviews",
    priceFrom: "₹1,500",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=500&q=80",
    bio: "Experienced Vedic scholar serving devotees for over two decades."
  }
];

function normalizePandit(row) {
  return {
    slug: row.slug,
    name: row.name,
    title: row.title ?? "",
    city: row.city ?? "",
    languages: row.languages ?? [],
    experienceYears: row.experienceYears ?? row.experience_years ?? "",
    specialties: row.specialties ?? [],
    rating: String(row.rating ?? "0"),
    reviewCount: row.reviewCount ?? row.review_count ?? "0",
    priceFrom: row.priceFrom ?? row.price_from ?? "",
    image: row.image ?? "",
    bio: row.bio ?? ""
  };
}

export async function fetchPandits() {
  const data = await apiGet("/pandits");
  if (Array.isArray(data) && data.length) {
    return data.map(normalizePandit);
  }
  return staticPandits;
}

export async function fetchPanditBySlug(slug) {
  const data = await apiGet(`/pandits/slug/${slug}`);
  if (data) return normalizePandit(data);
  const all = await fetchPandits();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getPanditHref(slug) {
  return `/pandit-services/${slug}`;
}

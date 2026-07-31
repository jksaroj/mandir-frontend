import SpiritualListingPage from "@/components/spiritual/SpiritualListingPage";
import { buildMetadata, DEFAULT_OG_IMAGE, seoKeywords } from "@/lib/seo";
import { fetchSpiritualItems } from "@/lib/mantras";
import { fetchBanners } from "@/lib/banners";

export const revalidate = 60;

export async function generateMetadata() {
  const items = await fetchSpiritualItems({ type: "chalisa" });
  return buildMetadata({
    title: "Chalisa",
    description: "Read and chant sacred Hindu chalisas with lyrics, meaning, benefits and devotional guidance for courage, protection and bhakti.",
    path: "/chalisa",
    image: items[0]?.image || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("Chalisa", "Hanuman Chalisa", "Hindu chalisa lyrics", "bhakti", "devotional prayer", items.slice(0, 5).map((item) => item.title))
  });
}

export default async function ChalisaPage() {
  const banners = await fetchBanners("chalisa");
  return <SpiritualListingPage variant="chalisa" banners={banners} />;
}

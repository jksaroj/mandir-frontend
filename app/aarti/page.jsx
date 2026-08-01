import SpiritualListingPage from "@/components/spiritual/SpiritualListingPage";
import { fetchBanners } from "@/lib/banners";
import { buildMetadata, DEFAULT_OG_IMAGE, seoKeywords } from "@/lib/seo";
import { fetchSpiritualItems } from "@/lib/mantras";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const items = await fetchSpiritualItems({ type: "aarti" });
  return buildMetadata({
    title: "Aarti",
    description: "Read and listen to Hindu aartis with lyrics, meaning and devotional guidance.",
    path: "/aarti",
    image: items[0]?.image || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("Hindu aarti", "aarti lyrics", "devotional songs", items.slice(0, 5).map((item) => item.title)),
  });
}

export default async function AartiPage() {
  const banners = await fetchBanners("aarti");
  return <SpiritualListingPage variant="aarti" banners={banners} />;
}

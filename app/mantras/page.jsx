import SpiritualListingPage from "@/components/spiritual/SpiritualListingPage";
import { buildMetadata, DEFAULT_OG_IMAGE, seoKeywords } from "@/lib/seo";
import { fetchSpiritualItems } from "@/lib/mantras";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const items = await fetchSpiritualItems({ type: "mantra" });
  return buildMetadata({
    title: "Mantras",
    description: "Discover powerful Hindu mantras with lyrics, meaning, benefits, audio and chanting guidance for peace, positivity and devotion.",
    path: "/mantras",
    image: items[0]?.image || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("Hindu mantras", "Vedic mantras", "mantra lyrics", "mantra meaning", "bhakti", items.slice(0, 5).map((item) => item.title))
  });
}

export default function MantrasPage() {
  return <SpiritualListingPage variant="mantra" />;
}

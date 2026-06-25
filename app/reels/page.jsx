import DivineReelsPage from "@/components/reels/DivineReelsPage";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { fetchReels } from "@/lib/reels";
import { absoluteUrl, buildMetadata, DEFAULT_OG_IMAGE, seoKeywords } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const reels = await fetchReels({ limit: 20 });
  return buildMetadata({
    title: "Spiritual Reels",
    description: "Watch devotional reels, bhajans, aartis, mantras, temple darshan, festival clips and pravachan shorts on BrahmaTatva.",
    path: "/reels",
    image: reels[0]?.thumbnail || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("spiritual reels", "bhakti reels", "devotional shorts", "bhajan video", "aarti video", "temple darshan")
  });
}

export default async function ReelsPage() {
  const reels = await fetchReels({ limit: 100 });
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Spiritual Reels", href: "/reels" }
  ];
  const videoSchemas = reels.map((reel) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: reel.title,
    description: `${reel.title} devotional reel on BrahmaTatva.`,
    thumbnailUrl: [absoluteUrl(reel.thumbnail)],
    uploadDate: reel.created_at || new Date().toISOString(),
    duration: reel.duration,
    contentUrl: reel.href,
    embedUrl: reel.youtubeId ? `https://www.youtube.com/embed/${reel.youtubeId}` : reel.href
  }));

  return (
    <>
      <JsonLd data={videoSchemas} />
      <div className="sr-only">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <DivineReelsPage initialReels={reels} />
    </>
  );
}

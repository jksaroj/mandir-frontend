import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import PopularTemples from "@/components/home/PopularTemples";
import SpiritualReels from "@/components/home/SpiritualReels";
import DevotionalColumns from "@/components/home/DevotionalColumns";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import BlogArticles from "@/components/home/BlogArticles";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import Reveal from "@/components/animations/Reveal";
import { fetchHomeData } from "@/lib/home";
import { fetchBanners } from "@/lib/banners";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, seoKeywords } from "@/lib/seo";

export const revalidate = 60;

const legacyMetadata = {
  title: "brahmatatva | Famous Temples, Mantras, Chalisa & Spiritual Reels",
  description:
    "Discover famous temples in India, Hanuman Chalisa, powerful mantras for peace, spiritual reels, upcoming festivals and devotional articles on brahmatatva.",
  keywords: [
    "temples in India",
    "Hanuman Chalisa",
    "mantras for peace",
    "spiritual reels",
    "Vrindavan",
    "Kashi Vishwanath",
    "Hindu devotional"
  ],
  openGraph: {
    title: "brahmatatva — Temples, Mantras & Bhakti",
    description:
      "Your trusted platform for temple darshan, mantras, chalisas, spiritual shorts and pilgrimage guides.",
    type: "website"
  }
};

export async function generateMetadata() {
  return buildMetadata({
    title: "Hindu Temples, Mantras, Chalisa & Spiritual Reels",
    description:
      "Discover famous temples in India, Hanuman Chalisa, powerful mantras, spiritual reels, upcoming Hindu events and devotional articles on BrahmaTatva.",
    path: "/",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    keywords: seoKeywords(
      "BrahmaTatva",
      "Hindu temples",
      "temples in India",
      "Hanuman Chalisa",
      "powerful mantras",
      "spiritual reels",
      "bhakti articles",
      "Hindu festivals"
    )
  });
}

export default async function HomePage() {
  const [{ temples, spiritualItems, events }, banners] = await Promise.all([
    fetchHomeData(),
    fetchBanners()
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: ["hi-IN", "en-IN"],
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream">
        <HeroSection banners={banners} />
        <Reveal>
          <PopularTemples temples={temples} />
        </Reveal>
        <Reveal direction="left">
          <SpiritualReels />
        </Reveal>
        <Reveal direction="right">
          <DevotionalColumns items={spiritualItems} />
        </Reveal>
        <Reveal scale>
          <UpcomingEvents events={events} />
        </Reveal>
        <Reveal>
          <BlogArticles />
        </Reveal>
        <Reveal>
          <FAQSection />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

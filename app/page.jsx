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

export const revalidate = 60;

export const metadata = {
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

export default async function HomePage() {
  const [{ temples, spiritualItems, events }, banners] = await Promise.all([
    fetchHomeData(),
    fetchBanners()
  ]);

  return (
    <>
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

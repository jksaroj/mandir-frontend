import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import PopularTemples from "@/components/home/PopularTemples";
import SpiritualReels from "@/components/home/SpiritualReels";
import DevotionalColumns from "@/components/home/DevotionalColumns";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import BlogArticles from "@/components/home/BlogArticles";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { fetchHomeData } from "@/lib/home";

export const revalidate = 60;

export const metadata = {
  title: "Sri Devasthanam | Famous Temples, Mantras, Chalisa & Spiritual Reels",
  description:
    "Discover famous temples in India, Hanuman Chalisa, powerful mantras for peace, spiritual reels, upcoming festivals and devotional articles on Sri Devasthanam.",
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
    title: "Sri Devasthanam — Temples, Mantras & Bhakti",
    description:
      "Your trusted platform for temple darshan, mantras, chalisas, spiritual shorts and pilgrimage guides.",
    type: "website"
  }
};

export default async function HomePage() {
  const { temples, spiritualItems, events } = await fetchHomeData();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <HeroSection />
        <PopularTemples temples={temples} />
        <SpiritualReels />
        <DevotionalColumns items={spiritualItems} />
        <UpcomingEvents events={events} />
        <BlogArticles />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

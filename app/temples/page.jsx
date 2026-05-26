import Footer from "@/components/temples/Footer";
import Header from "@/components/temples/Header";
import NewsletterSection from "@/components/temples/NewsletterSection";
import PopularTempleCards from "@/components/temples/PopularTempleCards";
import RecentlyAddedTemples from "@/components/temples/RecentlyAddedTemples";
import TempleBenefits from "@/components/temples/TempleBenefits";
import TempleByState from "@/components/temples/TempleByState";
import TempleCategoryGrid from "@/components/temples/TempleCategoryGrid";
import TempleFilters from "@/components/temples/TempleFilters";
import TempleHero from "@/components/temples/TempleHero";
import { fetchTemples } from "@/lib/temples";

export const metadata = {
  title: "Temples | Sri Devasthanam",
  description:
    "Discover temples, their history, darshan timings, deities, and spiritual services."
};

export const revalidate = 60;

export default async function TemplesPage() {
  const temples = await fetchTemples();

  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#15172b]">
      <Header />
      <TempleHero />
      <TempleFilters />
      <TempleCategoryGrid />
      <PopularTempleCards temples={temples} />
      <TempleByState />
      <RecentlyAddedTemples temples={temples} />
      <TempleBenefits />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

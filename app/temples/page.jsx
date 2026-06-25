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
import Reveal from "@/components/animations/Reveal";
import { fetchTemples } from "@/lib/temples";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata, DEFAULT_OG_IMAGE, itemListSchema, seoKeywords } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const temples = await fetchTemples();
  const names = temples.slice(0, 5).map((temple) => temple.name);

  return buildMetadata({
    title: "Temples",
    description:
      "Discover famous Hindu temples in India with history, darshan timings, deities, facilities, location and pilgrimage guides.",
    path: "/temples",
    image: temples[0]?.image || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("Hindu temples", "temples in India", "darshan timings", "pilgrimage guide", names)
  });
}

export default async function TemplesPage() {
  const temples = await fetchTemples();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Temples", href: "/temples" }
  ];

  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#15172b]">
      <JsonLd data={itemListSchema(temples, "/temples")} />
      <Header />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <TempleHero />
      <Reveal direction="none" duration={0.6}>
        <TempleFilters />
      </Reveal>
      <Reveal>
        <TempleCategoryGrid />
      </Reveal>
      <Reveal direction="left">
        <PopularTempleCards temples={temples} />
      </Reveal>
      <Reveal direction="right">
        <TempleByState />
      </Reveal>
      <Reveal>
        <RecentlyAddedTemples temples={temples} />
      </Reveal>
      <Reveal scale>
        <TempleBenefits />
      </Reveal>
      <Reveal>
        <NewsletterSection />
      </Reveal>
      <Footer />
    </main>
  );
}

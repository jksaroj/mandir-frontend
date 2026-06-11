import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/temples/Footer";
import Header from "@/components/temples/Header";
import TempleDetailsHero from "@/components/temples/TempleDetailsHero";
import TempleFacilities from "@/components/temples/TempleFacilities";
import TempleGallery from "@/components/temples/TempleGallery";
import TempleInfoTabs from "@/components/temples/TempleInfoTabs";
import TempleLocation from "@/components/temples/TempleLocation";
import TempleNearbyPlaces from "@/components/temples/TempleNearbyPlaces";
import TempleReviews from "@/components/temples/TempleReviews";
import TempleTimings from "@/components/temples/TempleTimings";
import TempleScheduleGrid from "@/components/temples/TempleScheduleGrid";
import FaqSection from "@/components/seo/FaqSection";
import Reveal from "@/components/animations/Reveal";
import { fetchAllTempleSlugs, fetchTempleBySlug } from "@/lib/temples";
import { resolveImageUrl } from "@/lib/images";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sridevasthanam.com";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchAllTempleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const temple = await fetchTempleBySlug(slug);

  if (!temple) {
    return { title: "Temple Not Found | Sri Devasthanam" };
  }

  const description =
    temple.excerpt ||
    `Plan your visit to ${temple.name} in ${temple.city}. Darshan timings, facilities, how to reach, gallery, and devotee reviews on Sri Devasthanam.`;
  const ogImage = resolveImageUrl(temple.image);
  const canonical = `${SITE_URL}/temples/${slug}`;

  return {
    title: `${temple.name} — Darshan Timings & Visit Guide | Sri Devasthanam`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${temple.name} | Sri Devasthanam`,
      description,
      url: canonical,
      siteName: "Sri Devasthanam",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${temple.name} temple — darshan and pilgrimage guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${temple.name} | Sri Devasthanam`,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function TempleDetailsPage({ params }) {
  const { slug } = await params;
  const temple = await fetchTempleBySlug(slug);

  if (!temple) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/temples/${slug}`;
  const heroImage = resolveImageUrl(temple.image);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    name: temple.name,
    description: temple.excerpt,
    image: temple.images?.length ? temple.images : [heroImage],
    address: {
      "@type": "PostalAddress",
      addressLocality: temple.city,
      addressCountry: "IN",
    },
    url: pageUrl,
  };

  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#15172b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#6b2323]">
            Home
          </Link>
          <span>›</span>
          <Link href="/temples" className="hover:text-[#6b2323]">
            Temples
          </Link>
          <span>›</span>
          <span className="text-[#7b2929]">{temple.name}</span>
        </div>
        <section id="overview" className="scroll-mt-24">
          <TempleDetailsHero temple={temple} />
        </section>
        <TempleInfoTabs />
        <section id="darshan-timings" className="scroll-mt-24">
          <Reveal>
            <TempleTimings temple={temple} />
          </Reveal>
          <Reveal>
            <TempleScheduleGrid scheduleTimings={temple.scheduleTimings} />
          </Reveal>
        </section>
        <span id="pooja-seva" className="block scroll-mt-24" />
        <span id="history" className="block scroll-mt-24" />
        <section id="gallery" className="scroll-mt-24">
          <Reveal scale>
            <TempleGallery temple={temple} />
          </Reveal>
        </section>
        <section id="facilities" className="scroll-mt-24">
          <Reveal direction="left">
            <TempleFacilities facilities={temple.facilities} />
          </Reveal>
        </section>
        <section id="how-to-reach" className="scroll-mt-24">
          <Reveal direction="right">
            <TempleLocation temple={temple} />
          </Reveal>
        </section>
        <Reveal>
          <TempleNearbyPlaces temple={temple} />
        </Reveal>
        <section id="reviews" className="scroll-mt-24">
          <Reveal>
            <TempleReviews temple={temple} />
          </Reveal>
        </section>
        <section className="gold-ring card-lift mt-10 overflow-hidden rounded-2xl border border-[#f1e7dc] bg-[#fff2df] px-6 py-9 text-center shadow-sm">
          <h2 className="font-serif text-3xl font-bold text-[#3d1717]">
            Plan your visit for a divine experience.
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Book your Darshan and Seva in advance for a hassle-free visit.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex rounded-lg bg-[#6b2323] px-8 py-3 text-sm font-extrabold text-white"
          >
            Book Darshan / Seva Now
          </a>
        </section>
        <FaqSection
          title={`${temple.name} FAQs`}
          description="Helpful answers for devotees planning darshan, seva booking, facilities, and temple visits."
          items={temple.faqs}
        />
      </div>
      <Footer />
    </main>
  );
}

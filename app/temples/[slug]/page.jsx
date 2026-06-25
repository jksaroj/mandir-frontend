import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/temples/Footer";
import Header from "@/components/temples/Header";
import TempleDetailsHero from "@/components/temples/TempleDetailsHero";
import TempleFacilities from "@/components/temples/TempleFacilities";
import TempleGallery from "@/components/temples/TempleGallery";
import TempleLocation from "@/components/temples/TempleLocation";
import TempleNearbyPlaces from "@/components/temples/TempleNearbyPlaces";
import TemplePoojaSeva from "@/components/temples/TemplePoojaSeva";
import TempleReviews from "@/components/temples/TempleReviews";
import TempleTimings from "@/components/temples/TempleTimings";
import TempleScheduleGrid from "@/components/temples/TempleScheduleGrid";
import FaqSection from "@/components/seo/FaqSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { fetchAllTempleSlugs, fetchTempleBySlug } from "@/lib/temples";
import { resolveImageUrl } from "@/lib/images";
import { absoluteUrl, buildMetadata, faqSchema, seoKeywords } from "@/lib/seo";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await fetchAllTempleSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function legacyTempleMetadata({ params }) {
  const { slug } = await params;
  const temple = await fetchTempleBySlug(slug);

  if (!temple) {
    return { title: "Temple Not Found | brahmatatva" };
  }

  const description =
    temple.excerpt ||
    `Plan your visit to ${temple.name} in ${temple.city}. Darshan timings, facilities, how to reach, gallery, and devotee reviews on brahmatatva.`;
  const ogImage = resolveImageUrl(temple.image);
  const canonical = `${SITE_URL}/temples/${slug}`;

  return {
    title: `${temple.name} — Darshan Timings & Visit Guide | brahmatatva`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${temple.name} | brahmatatva`,
      description,
      url: canonical,
      siteName: "brahmatatva",
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
      title: `${temple.name} | brahmatatva`,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const temple = await fetchTempleBySlug(slug);

  if (!temple) {
    return buildMetadata({
      title: "Temple Not Found",
      description: "The requested temple guide could not be found on BrahmaTatva.",
      path: `/temples/${slug}`,
      keywords: ["BrahmaTatva", "Hindu temple"]
    });
  }

  const description =
    temple.excerpt ||
    `Plan your visit to ${temple.name} in ${temple.city}. Darshan timings, facilities, how to reach, gallery and devotee reviews on BrahmaTatva.`;

  return buildMetadata({
    title: `${temple.name} - Darshan Timings & Visit Guide`,
    description,
    path: `/temples/${slug}`,
    image: resolveImageUrl(temple.image),
    type: "article",
    keywords: seoKeywords(
      temple.name,
      temple.deity,
      temple.city,
      "darshan timings",
      "temple history",
      "Hindu temple",
      "pilgrimage India"
    )
  });
}

export default async function TempleDetailsPage({ params }) {
  const { slug } = await params;
  const temple = await fetchTempleBySlug(slug);

  if (!temple) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/temples/${slug}`);
  const heroImage = resolveImageUrl(temple.image);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Temples", href: "/temples" },
    { name: temple.name, href: `/temples/${slug}` }
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: temple.name,
    description: temple.excerpt,
    image: temple.images?.length ? temple.images : [heroImage],
    touristType: "Pilgrimage",
    address: {
      "@type": "PostalAddress",
      addressLocality: temple.city,
      addressCountry: "IN",
    },
    url: pageUrl,
  };

  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#15172b]">
      <JsonLd data={[jsonLd, faqSchema(temple.faqs)]} />
      <Header />
      <div className="sr-only">
        <Breadcrumbs items={breadcrumbs} />
      </div>
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
        <section id="darshan-timings" className="scroll-mt-24">
          <TempleTimings temple={temple} />
          <TempleScheduleGrid scheduleTimings={temple.scheduleTimings} />
        </section>
        <section id="pooja-seva" className="scroll-mt-24">
          <TemplePoojaSeva poojas={temple.poojas} />
        </section>
        <section id="gallery" className="scroll-mt-24">
          <TempleGallery temple={temple} />
        </section>
        <section id="facilities" className="scroll-mt-24">
          <TempleFacilities facilities={temple.facilities} />
        </section>
        <section id="how-to-reach" className="scroll-mt-24">
          <TempleLocation temple={temple} />
        </section>
        <TempleNearbyPlaces temple={temple} />
        <section id="reviews" className="scroll-mt-24">
          <TempleReviews temple={temple} />
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

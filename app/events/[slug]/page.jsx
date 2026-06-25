import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { fetchEventBySlug, fetchEvents } from "@/lib/events";
import { absoluteUrl, buildMetadata, seoKeywords } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await fetchEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);

  if (!event) {
    return buildMetadata({
      title: "Event Not Found",
      description: "The requested BrahmaTatva event could not be found.",
      path: `/events/${slug}`,
      keywords: ["BrahmaTatva", "Hindu event"]
    });
  }

  return buildMetadata({
    title: event.name,
    description: event.shortDescription || event.description,
    path: `/events/${slug}`,
    image: event.imageUrl,
    type: "article",
    keywords: seoKeywords(event.name, event.city, event.state, "Hindu event", "festival", "bhakti event", "spiritual event")
  });
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);

  if (!event) notFound();

  const locationName = [event.city, event.state].filter(Boolean).join(", ") || event.address || "India";
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/" },
    { name: event.name, href: `/events/${slug}` }
  ];
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.shortDescription || event.description,
    image: [event.imageUrl],
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: event.status,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: locationName,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.address,
        addressLocality: event.city,
        addressRegion: event.state,
        addressCountry: "IN"
      }
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer,
      url: absoluteUrl("/")
    },
    url: absoluteUrl(`/events/${slug}`)
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <JsonLd data={eventSchema} />
      <Header />
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-7" />
        <h1 className="font-serif text-5xl font-bold leading-tight text-[#351112]">{event.name}</h1>
        <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600">{event.shortDescription || event.description}</p>
        <Image src={event.imageUrl} alt={`${event.name} event image`} width={1200} height={630} priority className="mt-8 aspect-[1200/630] w-full rounded-lg object-cover" />
        <section className="mt-8 grid gap-5 rounded-lg border border-[#f1e4d6] bg-white p-6 shadow-sm sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-extrabold text-[#351112]">Start Date</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">{new Date(event.startDate).toLocaleString("en-IN")}</p>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#351112]">Location</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">{locationName}</p>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#351112]">Organizer</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">{event.organizer}</p>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-[#351112]">About This Event</h2>
          <p className="mt-4 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">{event.description}</p>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/temples" className="rounded-lg border border-[#9b5252] px-4 py-2 text-sm font-extrabold text-[#6b2323]">Nearby Temples</Link>
          <Link href="/pandit-services" className="rounded-lg border border-[#9b5252] px-4 py-2 text-sm font-extrabold text-[#6b2323]">Book Pandit Services</Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}

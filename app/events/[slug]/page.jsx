import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bookmark, CalendarDays, CheckCircle2, Clock3, Droplets, Heart, Leaf, MapPin, Share2, Sparkles, Tag } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { fetchEventBySlug, fetchEvents } from "@/lib/events";
import { absoluteUrl, buildMetadata, seoKeywords } from "@/lib/seo";
import { fetchFaqs } from "@/lib/faqs";
import FaqSection from "@/components/seo/FaqSection";
import { faqSchema } from "@/lib/seo";

export const revalidate = 60;
export const dynamic = "force-dynamic";

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
  const [faqs, allEvents] = await Promise.all([fetchFaqs("event", slug), fetchEvents()]);
  const upcoming = allEvents.filter((item) => item.slug !== slug && new Date(item.endDate || item.startDate) >= new Date()).slice(0, 6);

  const locationName = [event.city, event.state].filter(Boolean).join(", ") || event.address || "India";
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
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

  const startLabel = formatDate(event.startDate);
  const endLabel = formatDate(event.endDate);
  const dateLabel = startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;

  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#2b2022]">
      <JsonLd data={[eventSchema, faqSchema(faqs)]} />
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8"><Breadcrumbs items={breadcrumbs} /></div>
      <div className="mx-auto grid max-w-7xl gap-7 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_285px] lg:px-8">
        <article className="min-w-0">
          <div className="flex items-start justify-between gap-5">
            <div><h1 className="font-serif text-4xl font-bold leading-tight text-[#4d1519] sm:text-5xl">{event.name}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{event.shortDescription || plainText(event.description).slice(0, 180)}</p></div>
            <div className="hidden shrink-0 gap-2 sm:flex"><RoundIcon icon={Heart}/><RoundIcon icon={Share2}/><RoundIcon icon={Bookmark}/></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
            <InfoChip icon={CalendarDays}>{dateLabel}</InfoChip><InfoChip icon={MapPin}>{locationName}</InfoChip><InfoChip icon={Tag}>{event.deity || "Hindu Festival"}</InfoChip>
          </div>
          <div className="relative mt-6 aspect-[16/8.2] min-h-[260px] overflow-hidden rounded-xl bg-[#eee2d4]"><Image src={event.imageUrl} alt={`${event.name} event image`} fill priority sizes="(max-width:1024px) 100vw, 900px" className="object-cover" /></div>

          <section className="mt-5 grid overflow-hidden rounded-xl border border-[#eaded2] bg-white sm:grid-cols-2 xl:grid-cols-4">
            <Feature icon={Sparkles} color="rose" title="Significance" text={`Sacred celebration dedicated to ${event.deity || "divine blessings"}.`}/>
            <Feature icon={Droplets} color="blue" title="Main Ritual" text="Prayer, worship, mantra jaap and traditional offerings."/>
            <Feature icon={Leaf} color="green" title="Benefits" text="Peace, prosperity, spiritual growth and blessings."/>
            <Feature icon={Clock3} color="amber" title="Best Time" text={dateLabel}/>
          </section>

          <section className="mt-10"><SectionTitle>About {event.name}</SectionTitle>
            {event.descriptionHtml ? <div className="event-rich-content mt-5 text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: event.descriptionHtml }}/>: <p className="mt-5 text-sm text-slate-600">Details will be updated soon.</p>}
          </section>

          <section className="mt-10"><SectionTitle>Quick Highlights</SectionTitle><div className="mt-5 grid gap-3 rounded-xl border border-[#efd59d] bg-[#fffaf0] p-5 sm:grid-cols-2">{[
            `Dedicated to ${event.deity || "the divine"}`, `Observed at ${locationName}`, "Prayer and sacred rituals", "Brings peace and prosperity"
          ].map((item)=><p key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-amber-500"/>{item}</p>)}</div></section>

          <section className="mt-10"><SectionTitle>Explore More</SectionTitle><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ExploreCard href="/temples" title="Most Popular Temples" text="Explore sacred temples across India."/>
            <ExploreCard href="/chalisa" title="Chalisa Collection" text="Read powerful devotional Chalisas."/>
            <ExploreCard href="/mantras" title="Divine Mantras" text="Chant sacred mantras for peace."/>
            <ExploreCard href="/aarti" title="Aarti Collection" text="Listen and read popular Aartis."/>
          </div></section>
          <FaqSection title="Frequently Asked Questions" description={`Common questions about ${event.name}.`} items={faqs} />
        </article>

        <aside className="space-y-6">
          <div className="rounded-xl border border-[#eaded2] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[#4d1519]"><CalendarDays size={17} className="text-[#a52c35]"/>Upcoming Events</h2><Link href="/events" className="text-[10px] font-bold text-maroon">View All</Link></div><div className="mt-3 divide-y divide-[#f0e5da]">{upcoming.length ? upcoming.map(item=><SidebarEvent key={item.slug} event={item}/>) : <p className="py-5 text-xs text-slate-500">No more upcoming events.</p>}</div></div>
          <div className="rounded-xl border border-[#eaded2] bg-white p-5"><h2 className="font-serif text-lg font-bold text-[#4d1519]">Quick Links</h2><div className="mt-3 divide-y text-sm">{[["Shiva Mantras","/mantras"],["Shiva Chalisas","/chalisa"],["Jyotirlingas","/temples"],["Shiva Aartis","/aarti"],["Puja Services","/pandit-services"]].map(([name,href])=><Link key={name} href={href} className="block py-3 font-medium text-slate-600 hover:text-maroon">{name}</Link>)}</div></div>
          <div className="rounded-xl border border-[#eaded2] bg-white p-5"><h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[#4d1519]"><Share2 size={17}/>Share This Event</h2><p className="mt-3 text-xs leading-5 text-slate-500">Share the blessings of {event.name} with your loved ones.</p><div className="mt-4 flex flex-wrap gap-2"><a href={`https://wa.me/?text=${encodeURIComponent(event.name + " " + absoluteUrl(`/events/${slug}`))}`} className="rounded-full border px-3 py-2 text-xs font-bold">WhatsApp</a><button className="rounded-full border px-3 py-2 text-xs font-bold">Copy Link</button></div></div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}

function formatDate(value) { if (!value) return "Date TBA"; const date = new Date(value); return Number.isNaN(date.getTime()) ? "Date TBA" : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }); }
function plainText(value="") { return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(); }
function RoundIcon({icon:Icon}) { return <button aria-label="Event action" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eaded2] bg-white text-[#8b3036]"><Icon size={16}/></button>; }
function InfoChip({icon:Icon,children}) { return <span className="inline-flex items-center gap-2 rounded-md border border-[#eaded2] bg-white px-3 py-2"><Icon size={13} className="text-[#d18b22]"/>{children}</span>; }
function Feature({icon:Icon,title,text,color}) { const colors={rose:"bg-rose-50 text-rose-600",blue:"bg-blue-50 text-blue-500",green:"bg-green-50 text-green-600",amber:"bg-amber-50 text-amber-600"}; return <div className="border-b border-[#eee3d8] p-4 last:border-0 sm:border-b-0 sm:border-r"><div className="flex gap-3"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors[color]}`}><Icon size={20}/></span><div><h3 className="text-xs font-extrabold text-[#4d1519]">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div></div></div>; }
function SectionTitle({children}) { return <h2 className="font-serif text-2xl font-bold text-[#351112]">{children}<span className="mt-2 block h-px w-14 bg-[#9c3c3f]"/></h2>; }
function ExploreCard({href,title,text}) { return <Link href={href} className="rounded-xl border border-[#eaded2] bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"><h3 className="font-serif text-base font-bold text-[#4d1519]">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{text}</p><span className="mt-4 block text-xs font-bold text-maroon">Explore →</span></Link>; }
function SidebarEvent({event}) { return <Link href={`/events/${event.slug}`} className="flex gap-3 py-3"><div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md"><Image src={event.imageUrl} alt="" fill sizes="64px" className="object-cover"/></div><div><h3 className="line-clamp-2 text-xs font-bold text-[#351112]">{event.name}</h3><p className="mt-1 text-[10px] text-slate-500">{formatDate(event.startDate)}</p></div></Link>; }

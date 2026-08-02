import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

function dateKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function EventCard({ event, featured = false }) {
  const date = new Date(event.startDate);
  const validDate = !Number.isNaN(date.getTime());
  return <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#ead8c6] bg-white shadow-[0_3px_14px_rgba(82,30,25,.06)] transition hover:-translate-y-1 hover:shadow-lg">
    <Link href={`/events/${event.slug}`} className={`relative block overflow-hidden ${featured ? "h-56" : "h-44"}`}>
      <Image src={event.imageUrl} alt={event.name} fill sizes={featured ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 25vw"} className="object-cover transition duration-500 group-hover:scale-105" />
      {validDate && <div className="absolute bottom-3 left-3 flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white text-[#681c22] shadow-lg">
        <span className="font-serif text-2xl font-extrabold leading-none">{date.toLocaleDateString("en-IN", { day: "2-digit" })}</span>
        <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wider">{date.toLocaleDateString("en-IN", { month: "short" })}</span>
      </div>}
    </Link>
    <div className="flex flex-1 flex-col p-4">
      <h3 className="font-serif text-lg font-bold text-[#271c21]">{event.name}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500"><MapPin size={13} className="text-[#a52c35]"/>{event.address || "India"}</p>
      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-5 text-slate-500">{event.shortDescription || event.description || "Discover this sacred festival and its spiritual significance."}</p>
      <Link href={`/events/${event.slug}`} className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#781e24] py-2.5 text-xs font-bold text-white">View Event <ArrowRight size={13}/></Link>
    </div>
  </article>;
}

export default function EventsCollectionPage({ events = [], now = new Date().toISOString() }) {
  const current = new Date(now);
  const year = current.getUTCFullYear();
  const month = current.getUTCMonth();
  const today = now.slice(0, 10);
  const upcoming = events
    .filter((event) => dateKey(event.endDate || event.startDate) >= today)
    .sort((a, b) => dateKey(a.startDate).localeCompare(dateKey(b.startDate)));
  const thisMonth = upcoming.filter((event) => {
    const date = new Date(event.startDate);
    return !Number.isNaN(date.getTime()) && date.getUTCFullYear() === year && date.getUTCMonth() === month;
  });
  const laterEvents = upcoming.filter((event) => !thisMonth.some((item) => item.slug === event.slug));
  const monthName = current.toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });

  return <main className="min-h-screen bg-[#fffaf5] text-[#271c21]">
    <Header />
    <section className="bg-gradient-to-br from-[#3d0d12] via-[#6f1d24] to-[#a34432] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="inline-flex rounded-full bg-[#f0c45f] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#3d0d12]">Festivals & Events</span>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-bold sm:text-6xl">Upcoming Sacred Festivals & Events</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">Stay connected with important Hindu festivals, celebrations and special temple events.</p>
      </div>
    </section>
    <div className="mx-auto max-w-7xl px-4 py-5 text-xs sm:px-6 lg:px-8"><Link href="/">Home</Link><span className="mx-3">›</span><b className="text-maroon">Events</b></div>

    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a632b]">Happening this month</p><h2 className="mt-2 font-serif text-3xl font-bold"><CalendarDays className="mr-2 inline text-[#8a252c]"/>Events in {monthName}</h2></div>
        <span className="text-xs font-semibold text-slate-500">{thisMonth.length} event{thisMonth.length === 1 ? "" : "s"}</span>
      </div>
      {thisMonth.length > 0 ? <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{thisMonth.map((event) => <EventCard key={event.slug} event={event} featured />)}</div> : <div className="mt-6 rounded-xl border border-dashed border-[#d9c2ad] bg-white px-5 py-10 text-center text-sm text-slate-500">No active events have been added for {monthName}.</div>}

      <div className="mt-12 border-t border-[#ead8c6] pt-9"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a632b]">Plan ahead</p><h2 className="mt-2 font-serif text-3xl font-bold">All Upcoming Events</h2><p className="mt-2 text-sm text-slate-500">Future festivals and events, arranged by the nearest date first.</p></div>
      {laterEvents.length > 0 ? <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{laterEvents.map((event) => <EventCard key={event.slug} event={event} />)}</div> : <div className="mt-6 rounded-xl border border-dashed border-[#d9c2ad] bg-white px-5 py-10 text-center text-sm text-slate-500">More upcoming events will appear here when they are added.</div>}
    </section>
    <Footer />
  </main>;
}

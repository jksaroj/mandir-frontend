import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { fallbackEvents } from "@/lib/homeContent";

function EventCard({ event }) {
  const rawDate = String(event.date || "");
  const isoParts = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const parsedDate = isoParts
    ? new Date(Number(isoParts[1]), Number(isoParts[2]) - 1, Number(isoParts[3]))
    : new Date(rawDate);
  const hasValidDate = !Number.isNaN(parsedDate.getTime());
  const dateParts = hasValidDate
    ? {
        day: parsedDate.toLocaleDateString("en-IN", { day: "2-digit" }),
        month: parsedDate.toLocaleDateString("en-IN", { month: "short" }).toUpperCase(),
      }
    : (() => {
        const parts = String(event.date || "TBA").trim().split(/\s+/);
        return { day: parts[0] || "--", month: (parts[1] || "TBA").slice(0, 3).toUpperCase() };
      })();

  return (
    <article className="group card-lift flex h-full flex-col overflow-hidden rounded-xl border border-[#eaded2] bg-white shadow-sm">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={event.image}
          alt={`${event.name} — spiritual event`}
          fill
          sizes="280px"
          className="img-zoom object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-[#eaded2] bg-white text-center shadow-lg">
          <span className="font-serif text-xl font-extrabold leading-none text-[#681c22]">{dateParts.day}</span>
          <span className="mt-1 text-[9px] font-extrabold tracking-wide text-[#681c22]">{dateParts.month}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-extrabold text-[#21181c]">{event.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <MapPin size={13} className="shrink-0 text-[#b8464e]" aria-hidden />
          {event.location}
        </p>
        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-5 text-slate-500">{event.description}</p>
        <Link
          href={event.href || "#events"}
          className="mt-4 inline-flex items-center justify-center gap-1 rounded-md border border-maroon/25 bg-white py-2.5 text-xs font-extrabold text-maroon transition hover:bg-maroon hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default function UpcomingEvents({ events = [] }) {
  const display = events.length
    ? events.slice(0, 4).map((e, i) => ({
        slug: e.slug || `event-${i}`,
        name: e.name || e.title || "Spiritual Event",
        date: e.date || e.startDate || null,
        location: e.location || e.address || e.place || "India",
        description: e.shortDescription || e.description || e.excerpt || "",
        image:
          e.image || e.imageUrl ||
          fallbackEvents[i % fallbackEvents.length].image,
        href: e.href || `/events/${e.slug}`
      }))
    : [];

  return (
    <section id="events" className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4"><h2 className="font-serif text-2xl font-bold text-[#2d2020]">♨ Upcoming Festivals &amp; Events</h2><Link href="/events" className="shrink-0 text-xs font-bold text-maroon hover:underline">View All Events ›</Link></div>
      <p className="mt-2 max-w-2xl text-sm text-slate-500">
        Festivals, melas and special darshan across India&apos;s holy cities.
      </p>
      {display.length > 0 ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {display.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
      </div> : <div className="mt-5 rounded-xl border border-dashed border-[#d9c2ad] bg-white px-5 py-8 text-center text-sm text-slate-500">No upcoming events are available right now.</div>}
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import { fallbackEvents } from "@/lib/homeContent";

function EventCard({ event }) {
  return (
    <article className="group card-lift flex h-full w-[min(100%,300px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#f1e4d6] bg-white shadow-sm sm:w-[280px]">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={event.image}
          alt={`${event.name} — spiritual event`}
          fill
          sizes="280px"
          className="img-zoom object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-extrabold text-[#11162b]">{event.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#c48a2a]">
          <Calendar size={15} aria-hidden />
          {event.date}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={15} className="shrink-0 text-maroon" aria-hidden />
          {event.location}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-5 text-slate-500">{event.description}</p>
        <Link
          href={event.href || "#events"}
          className="mt-4 inline-flex items-center justify-center gap-1 rounded-xl bg-maroon py-2.5 text-sm font-extrabold text-white transition hover:opacity-90"
        >
          View Details <ChevronRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default function UpcomingEvents({ events = [] }) {
  const display = events.length
    ? events.slice(0, 8).map((e, i) => ({
        slug: e.slug || `event-${i}`,
        name: e.name || e.title || "Spiritual Event",
        date: e.date || e.startDate || "TBA",
        location: e.location || e.place || "India",
        description: e.description || e.excerpt || "",
        image:
          e.image ||
          fallbackEvents[i % fallbackEvents.length].image,
        href: e.href || "#events"
      }))
    : fallbackEvents;

  return (
    <section id="events" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-[#11162b] sm:text-3xl">Upcoming Spiritual Events</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-500">
        Festivals, melas and special darshan across India&apos;s holy cities.
      </p>
      <div className="mt-6">
        <HorizontalScroll ariaLabel="Upcoming events carousel">
          {display.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}

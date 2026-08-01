import Image from "next/image";
import Link from "next/link";
import {
  Bell, BookOpen, CalendarDays, Flame,
  Globe2, Landmark, Share2, ShieldCheck, Sparkles, Sun
} from "lucide-react";
import { fallbackChalisas } from "@/lib/homeContent";
import { getMantraHref } from "@/lib/mantras";

const actions = [
  [Landmark, "Find Temples", "Discover temples near you", "/temples"],
  [BookOpen, "Read Chalisa", "Read and understand powerful chalisas", "/chalisa"],
  [Sparkles, "Chant Mantras", "Chant mantras for peace and strength", "/mantras"],
  [Flame, "Aarti Collection", "Watch and listen divine aartis", "/aarti"],
  [CalendarDays, "Festival Calendar", "Upcoming festivals & important dates", "#events"],
  [Share2, "Share Devotion", "Share photos and spread devotion", "/create-and-share"],
];

export function QuickActions() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="sr-only">Explore BrahmaTatva</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {actions.map(([Icon, title, text, href]) => (
          <Link key={title} href={href} className="group flex min-h-40 flex-col items-center justify-center rounded-xl border border-[#eaded2] bg-white px-3 py-5 text-center shadow-[0_5px_20px_rgba(74,25,25,.04)] transition hover:-translate-y-1 hover:border-[#c99a55]">
            <Icon size={38} strokeWidth={1.5} className="text-[#8b3a26]" />
            <h3 className="mt-4 text-sm font-extrabold text-[#251a21]">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const journey = [
  [Sun, "Daily Darshan", "Get divine blessings with today’s darshan.", "View Details", "/temples"],
  [Bell, "Aarti Time", "07:00 PM", "Watch Aarti", "/aarti"],
  [Sparkles, "Today’s Mantra", "ॐ नमो भगवते वासुदेवाय", "Chant Now", "/mantras"],
  [BookOpen, "Daily Chalisa", "Read a powerful chalisa and feel the divine energy.", "Read Chalisa", "/chalisa"],
];

export function SpiritualJourney() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-xl bg-gradient-to-br from-[#4a0e12] via-[#63191c] to-[#73302d] px-5 py-6 text-white shadow-lg">
        <h2 className="text-center font-serif text-2xl font-bold text-[#f3ce76]">— ❖ &nbsp; Today’s Spiritual Journey &nbsp; ❖ —</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map(([Icon, title, text, button, href], i) => (
            <div key={title} className={`flex flex-col items-center px-5 text-center ${i ? "lg:border-l lg:border-white/15" : ""}`}>
              <Icon size={42} strokeWidth={1.5} className="text-[#edc35e]" />
              <h3 className="mt-3 font-serif text-lg font-bold text-[#f4d27c]">{title}</h3>
              <p className={`mt-2 min-h-12 text-xs leading-5 ${i === 1 ? "text-xl font-bold text-[#f4d27c]" : "text-white/85"}`}>{text}</p>
              <Link href={href} className="mt-4 rounded-md border border-[#d5a851]/70 px-7 py-2 text-xs font-bold text-[#f1cb73] hover:bg-[#d5a851] hover:text-[#421014]">{button}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChalisaShowcase({ items = [] }) {
  const apiChalisas = items.filter((item) => item.category === "chalisa" || item.type === "chalisa");
  const display = (apiChalisas.length > 0 ? apiChalisas : fallbackChalisas).slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-[#2d2020]">❖ Popular Chalisas</h2>
        <Link href="/chalisa" className="text-xs font-bold text-maroon">View All Chalisas ›</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {display.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-xl border border-[#eaded2] bg-white shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={item.image} alt={item.title} fill sizes="220px" className="object-cover transition duration-500 hover:scale-105" />
            </div>
            <div className="p-3">
              <h3 className="truncate text-sm font-extrabold">{item.title}</h3>
              <Link href={item.href || getMantraHref(item)} className="mt-3 block rounded-md border border-maroon/25 py-2 text-center text-xs font-bold text-maroon">Read Chalisa</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TrustStrip() {
  const trust = [[ShieldCheck, "Verified Temple Information", "Authentic details sourced and verified for your trust."], [Globe2, "Bilingual Content", "Available in English and Hindi for devotees worldwide."], [Bell, "Daily Devotional Updates", "Fresh content, darshan, and guidance updated every day."]];
  return <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8"><div className="grid gap-5 rounded-xl border border-[#eaded2] bg-white px-7 py-6 md:grid-cols-3">{trust.map(([Icon,title,text],i)=><div key={title} className={`flex items-center gap-4 ${i ? "md:border-l md:border-[#eaded2] md:pl-8" : ""}`}><Icon size={40} strokeWidth={1.4} className="shrink-0 text-[#c9892e]"/><div><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></div>)}</div></section>;
}

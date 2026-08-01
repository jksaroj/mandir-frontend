"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, CalendarDays, Clock3, MapPin, Navigation, Share2, Star, Sun } from "lucide-react";

export default function TempleDetailsHero({ temple }) {
  const timings = temple.templeTimings || "3:00 AM – 11:00 PM";
  return <>
    <section className="relative min-h-[520px] overflow-hidden bg-[#07162a] text-white">
      <Image src={temple.image} alt={temple.name} fill priority sizes="100vw" className="object-cover object-[70%_center] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/85 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-3 text-xs font-bold text-white/80"><Link href="/">Home</Link><span>›</span><Link href="/temples">Temples</Link><span>›</span><span>{temple.city}</span><span>›</span><span>{temple.name}</span></div>
        <div className="mt-12 max-w-xl"><span className="inline-flex rounded-full border border-[#c99a37] bg-[#7d5a18]/30 px-4 py-2 text-xs font-bold uppercase text-[#e5bd59]">♨ &nbsp; 12 Jyotirlingas</span><h1 className="mt-5 font-serif text-5xl font-bold leading-tight sm:text-6xl">{temple.name}</h1><p className="mt-4 flex flex-wrap items-center gap-3 text-sm"><MapPin size={17}/>{temple.city}<span className="text-white/40">|</span><span>♙ &nbsp; {temple.deity}</span></p><div className="mt-4 flex items-center gap-2"><span className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} size={18} className="fill-[#ffc233] text-[#ffc233]"/>)}</span><b>{temple.rating || "4.8"}</b><span className="text-xs text-white/70">({temple.reviewCount || "12,345"})</span></div><p className="mt-4 max-w-lg text-sm leading-6 text-white/85">{temple.excerpt}</p><div className="mt-6 flex flex-wrap gap-3"><a href="#plan-visit" className="rounded-md border border-[#d5a33e] px-6 py-3 text-xs font-bold">Plan Your Visit &nbsp; ▣</a><a href="#how-to-reach" className="rounded-md border border-[#d5a33e] px-6 py-3 text-xs font-bold">View on Map &nbsp; ◉</a><button className="rounded-md border border-white/35 p-3"><Bookmark size={18}/></button><button className="rounded-md border border-white/35 p-3"><Share2 size={18}/></button></div><div className="mt-7 flex flex-wrap gap-2 text-[10px]"><span className="rounded-full bg-white/15 px-3 py-2 text-green-300">● &nbsp; Open Today</span><span className="rounded-full bg-white/15 px-3 py-2">◉ &nbsp; Photography Restricted</span><span className="rounded-full bg-white/15 px-3 py-2 text-green-300">▣ &nbsp; Free Entry</span></div></div>
      </div>
    </section>
    <section className="relative z-10 mx-auto -mt-6 max-w-6xl px-4 sm:px-6"><div className="grid overflow-hidden rounded-xl border border-[#e3cba8] bg-white shadow-lg sm:grid-cols-2 lg:grid-cols-4">{[[Clock3,"Today’s Darshan",timings,"Open Now"],[Sun,"Mangala Aarti","3:00 AM","Daily"],[CalendarDays,"Best Time to Visit","Oct – Mar","Pleasant Weather"],[Clock3,"Avg. Visit Duration","1 – 2 Hours","Approx."]].map(([Icon,a,b,c],i)=><div key={a} className={`flex items-center gap-4 p-5 ${i?"lg:border-l lg:border-[#ead8c6]":""}`}><Icon size={31} className="shrink-0 text-[#c18a35]"/><div><p className="text-[10px] text-slate-500">{a}</p><b className="mt-1 block text-sm">{b}</b><span className="text-[10px] text-slate-500">{c}</span></div></div>)}</div></section>
  </>;
}

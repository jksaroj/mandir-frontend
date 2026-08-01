"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ChevronDown, Clock3, Headphones, Search, Sparkles, Star, Sun } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Accordion from "@/components/ui/Accordion";
import { fallbackChalisas } from "@/lib/homeContent";
import { getMantraHref } from "@/lib/mantras";

const extra = ["Saraswati", "Shani", "Kali", "Bhairav", "Nandi", "Parvati", "Krishna", "Vishnu", "Sai", "Navgrah", "Ganga", "Santoshi Mata"].map((name, i) => ({
  slug: `${name.toLowerCase().replaceAll(" ", "-")}-chalisa`, title: `${name} Chalisa`, deity: name,
  readTime: `${8 + (i % 5)} min`, excerpt: `A sacred devotional hymn dedicated to ${name}, with meaning and spiritual guidance.`,
  image: [
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600&q=85",
    "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=600&q=85",
    "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=600&q=85",
  ][i % 3], type: "chalisa",
}));

const fallback = [...fallbackChalisas.map((x, i) => ({ ...x, readTime: `${9 + i} min`, excerpt: `A powerful prayer for protection, courage and divine blessings.`, type: "chalisa" })), ...extra];
const filters = ["All", "Hanuman", "Shiva", "Durga", "Ram", "Lakshmi", "Saraswati", "Ganesh"];

function ChalisaCard({ item, compact = false }) {
  return <article className="group overflow-hidden rounded-lg border border-[#ead8c6] bg-white shadow-[0_3px_12px_rgba(82,30,25,.04)]">
    <Link href={getMantraHref(item)} className="relative block overflow-hidden">
      <div className={`relative ${compact ? "h-36" : "h-52"}`}><Image src={item.image} alt={item.title} fill sizes="300px" className="object-cover transition duration-500 group-hover:scale-105" /></div>
      <Bookmark size={19} className="absolute right-3 top-3 text-white drop-shadow" />
    </Link>
    <div className={compact ? "p-3" : "p-4"}>
      <h3 className="font-serif text-lg font-bold text-[#251b21]">{item.title}</h3>
      <p className="mt-2 flex items-center gap-2 text-[11px] text-slate-500"><Clock3 size={13}/>{item.readTime || "10 min"}<span>। हिंदी + English</span></p>
      {!compact && <p className="mt-2 line-clamp-3 min-h-14 text-xs leading-5 text-slate-500">{item.excerpt}</p>}
      {!compact && <div className="mt-3 flex gap-2"><Link href={getMantraHref(item)} className="flex-1 rounded-md bg-[#781e24] py-2.5 text-center text-xs font-bold text-white">Read Chalisa</Link><button className="flex items-center gap-1 rounded-md border border-[#ead8c6] px-3 text-xs font-semibold"><Headphones size={14}/> Listen</button></div>}
    </div>
  </article>;
}

export default function ChalisaCollectionPage({ items = [] }) {
  const source = items.length > 0 ? items : fallback;
  const displaySource = source.length >= 10 ? source : [...source, ...fallback.filter((f) => !source.some((x) => x.slug === f.slug))];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => displaySource.filter((x) => `${x.title} ${x.deity}`.toLowerCase().includes(query.toLowerCase()) && (filter === "All" || `${x.title} ${x.deity}`.toLowerCase().includes(filter.toLowerCase()))), [displaySource, query, filter]);
  const featured = filtered.slice(0, 6);
  const all = filtered.slice(6, 18);
  const daily = displaySource[1] || displaySource[0];
  return <main className="min-h-screen bg-[#fffaf5] text-[#271c21]">
    <Header />
    <section className="relative min-h-[400px] overflow-hidden bg-[#07152b] text-white">
      <Image src="/reels/hero-krishna.png" alt="Sacred Chalisa collection" fill priority className="object-cover object-[75%_center] opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07152b] via-[#07152b]/90 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"><div className="max-w-xl"><span className="inline-flex rounded-full bg-[#bce96d] px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-[#173519]">◉ &nbsp; Chalisa</span><h1 className="mt-7 font-serif text-5xl font-bold text-[#f1c96d] sm:text-6xl">सम्पूर्ण चालीसा संग्रह</h1><p className="mt-5 max-w-lg text-base leading-7 text-white/85">Read sacred chalisas with Hindi text, English transliteration, meaning and chanting guidance.</p><div className="mt-7 flex gap-3"><a href="#collection" className="rounded-md bg-[#f0c45f] px-7 py-3 text-sm font-bold text-[#321a18]">Explore Chalisas</a><a href="#today" className="rounded-md border border-[#e5b952] px-7 py-3 text-sm font-bold text-[#f0c45f]">Today’s Chalisa</a></div></div></div>
    </section>
    <div className="mx-auto max-w-7xl px-4 py-5 text-xs sm:px-6 lg:px-8"><Link href="/">Home</Link><span className="mx-3">›</span><b className="text-maroon">Chalisa</b></div>
    <section id="collection" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="text-center"><h2 className="font-serif text-4xl font-bold">— ❖ &nbsp; Chalisa Collection &nbsp; ❖ —</h2><p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-500">A Chalisa is a devotional hymn of forty verses dedicated to a deity.<br/>Explore our collection with text, meaning, audio and guidance to uplift your spiritual journey.</p></div>
      <div className="mt-7 flex flex-wrap items-center gap-2"><label className="flex min-w-[240px] flex-1 items-center rounded-md border border-[#dfcdbb] bg-white px-3"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search Chalisa" className="w-full px-3 py-3 text-xs outline-none"/></label>{filters.map(x=><button key={x} onClick={()=>setFilter(x)} className={`rounded-full px-4 py-2 text-xs ${filter===x?"bg-[#679d3b] text-white":"border border-[#e3d3c3] bg-white"}`}>{x}</button>)}<button className="rounded-md border border-[#dfcdbb] bg-white px-4 py-3 text-xs">Language: Hindi⌄</button><button className="rounded-md border border-[#dfcdbb] bg-white px-4 py-3 text-xs">Sort: Popular⌄</button></div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_330px]">
        <div className="rounded-xl border border-[#ead8c6] p-4"><div className="mb-4 flex justify-between"><h2 className="font-serif text-xl font-bold">🔥 Popular Chalisas</h2><span className="text-xs font-bold text-maroon">View All Popular ›</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{featured.map(x=><ChalisaCard key={x.slug} item={x}/>)}</div></div>
        <aside className="space-y-5"><div id="today" className="rounded-xl bg-gradient-to-br from-[#461014] to-[#6f2428] p-7 text-center text-white"><h2 className="font-serif text-2xl font-bold text-[#edc869]">— Today’s Chalisa —</h2><div className="my-7 text-7xl text-[#efc861]">ॐ</div><h3 className="font-serif text-2xl font-bold">{daily.title}</h3><p className="mt-3 text-sm leading-6 text-white/80">Surrender with devotion and invite peace, strength and divine blessings into your life.</p><Link href={getMantraHref(daily)} className="mt-6 inline-block rounded-md bg-[#efc861] px-8 py-3 text-sm font-bold text-[#431014]">Start Reading</Link></div><InfoPanels/></aside>
      </div>
      <div className="mt-6 rounded-xl border border-[#ead8c6] p-5"><div className="mb-5 flex justify-between"><h2 className="font-serif text-xl font-bold">All Chalisas</h2><span className="text-xs font-bold text-maroon">View All Chalisas ›</span></div><div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{all.map(x=><ChalisaCard key={x.slug} item={x} compact/>)}</div><button className="mx-auto mt-6 flex items-center gap-2 rounded-md border border-[#dfcdbb] px-8 py-2.5 text-xs font-bold">Load More Chalisas <ChevronDown size={14}/></button></div>
      <BottomPanels />
    </section><Footer />
  </main>;
}

function InfoPanels(){return <><div className="rounded-xl border border-[#ead8c6] bg-white p-5"><h3 className="font-serif text-xl font-bold">Benefits of Chalisa Chanting</h3><ul className="mt-4 space-y-4 text-xs text-slate-600">{["Calms the mind and reduces stress","Strengthens faith and devotion","Brings positive energy and protection","Improves focus and self-discipline","Invites peace, prosperity and health"].map(x=><li key={x} className="flex gap-3"><Star size={16} className="text-[#c98b32]"/>{x}</li>)}</ul></div><div className="rounded-xl border border-[#ead8c6] bg-white p-5"><h3 className="font-serif text-xl font-bold">Best Time to Chant</h3><ul className="mt-3 divide-y text-xs">{[["Brahma Muhurat","04:00 AM – 06:00 AM"],["Sunrise","06:00 AM – 08:00 AM"],["Evening","06:00 PM – 08:00 PM"],["Before Sleep","09:00 PM – 10:00 PM"]].map(([a,b])=><li key={a} className="flex gap-3 py-3"><Sun size={18} className="text-[#c98b32]"/><span><b className="block">{a}</b>{b}</span></li>)}</ul></div></>}
function BottomPanels(){const faq=[{title:"What is a Chalisa and why is it 40 verses?",content:"A Chalisa is a devotional hymn traditionally composed of forty verses in praise of a deity."},{title:"Are Chalisa texts available in Hindi and English?",content:"Yes, Chalisas include Hindi text and English guidance where available."},{title:"Can I read a Chalisa every day?",content:"Yes. Daily reading with devotion is a meaningful spiritual practice."},{title:"Is audio available for all Chalisas?",content:"Audio is shown whenever it has been added by the administrator."}];return <div className="mt-6 grid gap-5 lg:grid-cols-3"><div className="rounded-xl border border-[#d5a95f] bg-white p-6"><h3 className="text-center font-serif text-xl font-bold">Why Read Chalisa Daily?</h3><ul className="mt-5 space-y-4 text-sm"><li><b>Calm the Mind</b><p className="text-xs text-slate-500">Helps reduce anxiety and brings inner peace.</p></li><li><b>Build Devotion</b><p className="text-xs text-slate-500">Deepens connection with the divine.</p></li><li><b>Create Discipline</b><p className="text-xs text-slate-500">Builds consistency and spiritual strength.</p></li></ul></div><div className="rounded-xl border border-[#d5a95f] bg-white p-6"><h3 className="text-center font-serif text-xl font-bold">How to Chant a Chalisa</h3><div className="mt-8 flex items-start justify-between text-center">{["Choose a Quiet Place","Set Your Intention","Read with Devotion","Reflect and Pray"].map((x,i)=><div key={x} className="w-1/4 text-xs"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#f4d78d] font-serif text-lg font-bold">{i+1}</span><p className="mt-3">{x}</p></div>)}</div></div><div className="rounded-xl border border-[#d5a95f] bg-white p-5"><h3 className="text-center font-serif text-xl font-bold">Frequently Asked Questions</h3><Accordion items={faq} className="mt-4"/></div></div>}

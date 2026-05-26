import Image from "next/image";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnimatedCard from "@/components/animations/AnimatedCard";
import FadeUp from "@/components/animations/FadeUp";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import WaveText from "@/components/animations/WaveText";
import {
  BadgeCheck,
  Briefcase,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Languages,
  MapPin,
  RotateCcw,
  Search,
  Star,
  UserRound
} from "lucide-react";
import { fetchPandits, getPanditHref } from "@/lib/pandits";

export const metadata = {
  title: "Pandit Services | Sri Devasthanam",
  description: "Find experienced and verified pandits for poojas, homas, rituals and spiritual services."
};

const heroImage = "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1200&q=80";
const panditImage = "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=500&q=80";

const services = ["Pooja", "Homam / Havan", "Upanayanam", "Shraddha / Tarpanam", "Marriage", "Graha Shanti", "Vastu Shanti", "Other Rituals"];
const languages = ["Sanskrit", "Hindi", "Telugu", "Tamil", "Kannada", "English", "Other"];
const experience = ["1 - 5 Years", "5 - 10 Years", "10 - 20 Years", "20+ Years"];
const availability = ["Available Today", "Available Tomorrow", "This Week", "Custom Date"];
const stats = [["500+", "Verified Pandits"], ["50+", "Cities Covered"], ["20+", "Years of Experience"], ["4.8/5", "Average Rating"]];
function CheckboxList({ title, items }) {
  return (
    <div className="border-b border-[#f1e4d6] pb-6">
      <h3 className="mb-4 font-extrabold text-[#1f2937]">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-[#d9bfa9] accent-[#6b2323]" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

export const revalidate = 60;

export default async function PanditServicesPage() {
  const panditList = await fetchPandits();

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <Header active="pandit" />
      <section className="relative overflow-hidden bg-[#fff2df]">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Image src={heroImage} alt="Pandit performing ritual" fill priority sizes="50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff2df] via-[#fff2df]/35 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-sm font-bold text-[#7b2929]"><Link href="/">Home</Link><span>›</span><span>Pandit Services</span></div>
            <WaveText as="h1" text="List of Pandits" className="block font-serif text-6xl font-bold text-[#5b1f1f]" />
            <FadeUp delay={0.16}><p className="mt-5 text-lg font-medium leading-8 text-slate-700">
              Find experienced and verified pandits for your poojas, homas, rituals and other spiritual services.
            </p></FadeUp>
          </div>
          <div className="mt-10 grid gap-4 rounded-2xl border border-[#f1e4d6] bg-white p-5 shadow-md lg:grid-cols-[2fr_repeat(3,1fr)_auto_auto]">
            <label className="flex h-12 items-center gap-3 rounded-lg border border-[#eadfd3] px-4">
              <Search size={18} className="text-[#9b5252]" />
              <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" placeholder="Search by name, expertise or location" />
            </label>
            {["Select Service", "Select City", "Language"].map((label) => (
              <select key={label} className="h-12 rounded-lg border border-[#eadfd3] bg-white px-3 text-sm font-semibold text-slate-600 outline-none"><option>{label}</option></select>
            ))}
            <button className="h-12 rounded-lg bg-[#6b2323] px-7 text-sm font-extrabold text-white">Search</button>
            <button className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[#d9bfa9] px-5 text-sm font-extrabold text-[#6b2323]"><RotateCcw size={16} /> Reset Filters</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <WaveGrid className="grid gap-5 rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => <WaveGridItem key={label} className="text-center"><p className="text-3xl font-extrabold text-[#6b2323]">{value}</p><p className="mt-1 text-sm font-bold text-slate-600">{label}</p></WaveGridItem>)}
        </WaveGrid>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <FadeUp><aside className="h-max rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-extrabold text-[#5b1f1f]">Filters</h2>
          <div className="space-y-6">
            <CheckboxList title="Service" items={services} />
            <div className="border-b border-[#f1e4d6] pb-6">
              <h3 className="mb-3 font-extrabold">Location</h3>
              <input className="h-11 w-full rounded-lg border border-[#eadfd3] px-3 text-sm outline-none" placeholder="Enter city or location" />
            </div>
            <CheckboxList title="Language" items={languages} />
            <div className="border-b border-[#f1e4d6] pb-6">
              <h3 className="mb-4 font-extrabold">Experience</h3>
              <div className="space-y-3">{experience.map((item) => <label key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-600"><input name="experience" type="radio" className="accent-[#6b2323]" />{item}</label>)}</div>
            </div>
            <CheckboxList title="Availability" items={availability} />
          </div>
          <button className="mt-6 w-full rounded-lg bg-[#6b2323] py-3 text-sm font-extrabold text-white">Apply Filters</button>
          <button className="mt-3 w-full rounded-lg border border-[#d9bfa9] py-3 text-sm font-extrabold text-[#6b2323]">Clear All</button>
        </aside></FadeUp>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <p className="font-bold text-slate-600">Showing 1 - 10 of 120 pandits</p>
            <select className="h-11 rounded-lg border border-[#eadfd3] bg-white px-4 text-sm font-bold text-slate-600"><option>Sort by Highest Rated</option></select>
          </div>
          <div className="space-y-5">
            {panditList.map((pandit) => (
              <AnimatedCard key={pandit.slug} as="article" className="grid gap-5 rounded-2xl border border-[#f1e4d6] bg-white p-5 shadow-sm transition hover:shadow-md md:grid-cols-[160px_1fr_auto]">
                <div className="relative h-44 overflow-hidden rounded-2xl md:h-full">
                  <Image src={pandit.image || panditImage} alt={pandit.name} fill sizes="180px" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">Available</span>
                </div>
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 text-xl font-extrabold text-[#351112]">
                    {pandit.name}
                    <BadgeCheck size={19} className="fill-emerald-100 text-emerald-600" />
                  </h3>
                  <p className="mt-1 font-bold text-[#9b5252]">{pandit.title}</p>
                  <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
                    <p className="flex items-center gap-2"><MapPin size={16} /> {pandit.city}</p>
                    <p className="flex items-center gap-2"><Languages size={16} /> {(pandit.languages || []).join(", ")}</p>
                    <p className="flex items-center gap-2"><Briefcase size={16} /> {pandit.experienceYears} Experience</p>
                    <p className="flex items-center gap-2"><Star size={16} className="fill-[#f7b313] text-[#f7b313]" /> {pandit.rating} · {pandit.reviewCount}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(pandit.specialties || []).map((tag) => (
                      <span key={tag} className="rounded-full bg-[#fff2df] px-3 py-1 text-xs font-extrabold text-[#6b2323]">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4 md:w-44">
                  <div className="rounded-xl bg-[#fff7ed] p-4 text-center"><p className="text-xs font-bold text-slate-500">Starting from</p><p className="mt-1 text-2xl font-extrabold text-[#6b2323]">{pandit.priceFrom}</p></div>
                  <div className="space-y-3">
                    <Link href={getPanditHref(pandit.slug)} className="block rounded-lg border border-[#9b5252] py-2.5 text-center text-sm font-extrabold text-[#6b2323]">View Profile</Link>
                    <button className="w-full rounded-lg bg-[#6b2323] py-2.5 text-sm font-extrabold text-white">Book Now</button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#eadfd3] bg-white"><ChevronLeft size={16} /></button>
            {["1", "2", "3", "4", "5", "...", "12"].map((page) => <button key={page} className={`h-10 min-w-10 rounded-lg px-3 text-sm font-extrabold ${page === "1" ? "bg-[#6b2323] text-white" : "border border-[#eadfd3] bg-white text-slate-600"}`}>{page}</button>)}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#eadfd3] bg-white"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#f1e4d6] bg-[#fff2df] p-10 text-center shadow-sm">
          <h2 className="font-serif text-4xl font-bold text-[#5b1f1f]">Can’t find the right pandit?</h2>
          <p className="mt-3 text-base font-medium text-slate-600">Request a pandit as per your specific requirements</p>
          <button className="mt-6 rounded-lg bg-[#6b2323] px-8 py-3 text-sm font-extrabold text-white">Request Now</button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

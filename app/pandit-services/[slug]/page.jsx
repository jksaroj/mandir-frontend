import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FadeUp from "@/components/animations/FadeUp";
import WaveText from "@/components/animations/WaveText";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import Tabs from "@/components/ui/Tabs";
import { fetchPanditBySlug } from "@/lib/pandits";
import {
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Clock,
  Languages,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star
} from "lucide-react";

export const revalidate = 60;

const fallbackImage = "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=600&q=80";
const tabs = ["Overview", "Services", "Experience", "Reviews", "FAQs"];
const defaultServices = ["Pooja", "Homam / Havan", "Graha Shanti", "Vastu Shanti", "Upanayanam", "Marriage", "Satyanarayana Pooja"];
const timeline = [
  ["2001", "Completed Vedic studies and began assisting senior priests in daily rituals."],
  ["2008", "Started independent pooja and homam services for families."],
  ["2016", "Recognized for community rituals and temple events."],
  ["2026", "Serving devotees through Sri Devasthanam verified pandit services."]
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pandit = await fetchPanditBySlug(slug);

  if (!pandit) {
    return { title: "Pandit Not Found | Sri Devasthanam" };
  }

  return {
    title: `${pandit.name} | Sri Devasthanam`,
    description: `${pandit.name} profile, services, availability, pricing, reviews and booking.`
  };
}

export default async function PanditProfilePage({ params }) {
  const { slug } = await params;
  const pandit = await fetchPanditBySlug(slug);

  if (!pandit) {
    notFound();
  }

  const services = pandit.specialties?.length ? pandit.specialties : defaultServices;
  const languageText = (pandit.languages || []).join(", ");

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <Header active="pandit" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <Link href="/">Home</Link><span>›</span><Link href="/pandit-services">Pandit Services</Link><span>›</span><span className="text-[#7b2929]">{pandit.name}</span>
        </div>

        <FadeUp>
          <section className="grid gap-7 rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm lg:grid-cols-[190px_1fr_260px]">
            <div className="relative h-56 overflow-hidden rounded-2xl lg:h-full">
              <Image src={pandit.image || fallbackImage} alt={pandit.name} fill priority sizes="220px" className="object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">Available</span>
            </div>
            <div>
              <h1 className="flex flex-wrap items-center gap-2 font-serif text-4xl font-bold text-[#351112]">
                <WaveText text={pandit.name} /> <BadgeCheck size={24} className="fill-emerald-100 text-emerald-600" />
              </h1>
              <p className="mt-2 text-lg font-bold text-[#9b5252]">{pandit.title}</p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                <span className="flex items-center gap-2"><MapPin size={17} /> {pandit.city}</span>
                <span className="flex items-center gap-2"><Languages size={17} /> {languageText}</span>
                <span className="flex items-center gap-2"><Clock size={17} /> {pandit.experienceYears} Experience</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {services.map((tag) => <span key={tag} className="rounded-full bg-[#fff2df] px-3 py-1 text-xs font-extrabold text-[#6b2323]">{tag}</span>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="rounded-lg bg-[#6b2323] px-7 py-3 text-sm font-extrabold text-white">Book Now</button>
                <button className="rounded-lg border border-[#9b5252] px-7 py-3 text-sm font-extrabold text-[#6b2323]">Contact Pandit</button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-[#d9bfa9] px-5 py-3 text-sm font-extrabold text-[#6b2323]"><Share2 size={16} /> Share Profile</button>
              </div>
            </div>
            <aside className="rounded-2xl bg-[#fff7ed] p-6 text-center">
              <p className="text-5xl font-extrabold text-[#6b2323]">{pandit.rating}</p>
              <div className="mt-3 flex justify-center gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-[#f7b313] text-[#f7b313]" />)}</div>
              <p className="mt-2 text-sm font-bold text-slate-600">{pandit.reviewCount}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Starting from</p>
              <p className="mt-1 text-3xl font-extrabold text-[#351112]">{pandit.priceFrom}</p>
            </aside>
          </section>
        </FadeUp>

        <Tabs tabs={tabs} className="mt-8" />

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#351112]">About Pandit</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                {pandit.bio || `${pandit.name} is a verified pandit with experience in traditional poojas, homams, graha shanti rituals and family ceremonies.`}
              </p>
            </div>

            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#351112]">Services Offered</h2>
              <WaveGrid className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => <WaveGridItem key={service} className="flex items-center gap-3 rounded-xl bg-[#fff7ed] p-4 text-sm font-extrabold"><CheckCircle size={18} className="text-emerald-600" /> {service}</WaveGridItem>)}
              </WaveGrid>
            </div>

            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#351112]">Experience Timeline</h2>
              <div className="mt-6 space-y-5">
                {timeline.map(([year, text]) => <div key={year} className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6b2323] text-sm font-extrabold text-white">{year}</span><p className="pt-2 text-sm font-medium leading-7 text-slate-600">{text}</p></div>)}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Booking & Pricing</h3>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                <p className="flex justify-between"><span>Basic Pooja</span><b>{pandit.priceFrom}</b></p>
                <p className="flex justify-between"><span>Homam / Havan</span><b>On request</b></p>
                <p className="flex justify-between"><span>Marriage Rituals</span><b>On request</b></p>
              </div>
              <button className="mt-6 w-full rounded-lg bg-[#6b2323] py-3 text-sm font-extrabold text-white">Book Now</button>
            </div>
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Contact Information</h3>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600"><Phone size={16} /> +91 98765 43210</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600"><Mail size={16} /> pandit@sridevasthanam.com</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600"><Briefcase size={16} /> {pandit.experienceYears} Experience</p>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-2xl border border-[#f1e4d6] bg-[#fff2df] p-10 text-center shadow-sm">
          <h2 className="font-serif text-4xl font-bold text-[#5b1f1f]">Book {pandit.name}</h2>
          <p className="mt-3 text-base font-medium text-slate-600">Select a service and a preferred date to book the pandit.</p>
          <button className="mt-6 rounded-lg bg-[#6b2323] px-8 py-3 text-sm font-extrabold text-white">Book Now</button>
        </section>
      </div>
      <Footer />
    </main>
  );
}

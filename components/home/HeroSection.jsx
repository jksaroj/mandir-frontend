"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Landmark, Play, Sparkles } from "lucide-react";

const staticSlides = [
  {
    deity: "Mahadev",
    title: "Awaken Inner Stillness with Shiva",
    highlight: "Shiv Bhakti",
    text: "Explore sacred Jyotirlingas, morning mantras, aarti timings, and peaceful temple guides devoted to Lord Shiva.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Statue_of_lord_shiva.jpg?width=1800",
    align: "object-[58%_36%]"
  },
  {
    deity: "Hanuman Ji",
    title: "Strength, Seva and Fearless Devotion",
    highlight: "Hanuman Chalisa",
    text: "Read powerful chalisas, discover Hanuman temples, and carry the spirit of courage into every day.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Statue.jpg?width=1800",
    align: "object-center"
  },
  {
    deity: "Ganesh Ji",
    title: "Begin Every Journey with Blessings",
    highlight: "Ganesh Vandana",
    text: "Find Ganesh temples, festival stories, and auspicious prayers for wisdom, prosperity, and new beginnings.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vandanmedu-Statue_of_Ganesha-WUS07383.jpg?width=1800",
    align: "object-[50%_30%]"
  },
  {
    deity: "Shri Krishna",
    title: "A Divine Path of Joy and Wisdom",
    highlight: "Krishna Leela",
    text: "Experience Krishna bhajans, Janmashtami guides, temple darshan routes, and timeless devotional stories.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lord_Krishna_statue.jpg?width=1800",
    align: "object-[50%_28%]"
  },
  {
    deity: "Radha Krishna",
    title: "Celebrate Love, Grace and Bhakti",
    highlight: "Radha Krishna",
    text: "Explore Vrindavan-inspired devotion, sacred songs, festival guides, and temples of eternal divine love.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Krishna_and_radha.jpg?width=1800",
    align: "object-[50%_35%]"
  }
];

const AUTO_SLIDE_MS = 5600;

function TempleSilhouette({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <div className="mx-auto h-7 w-20 rounded-t-full bg-[#2B1D16]/10 blur-[1px]" />
      <div className="mx-auto h-16 w-16 bg-[#2B1D16]/10 blur-[1px] [clip-path:polygon(50%_0,72%_26%,72%_100%,28%_100%,28%_26%)]" />
      <div className="-mt-1 flex items-end justify-center gap-2">
        <div className="h-14 w-12 rounded-t-2xl bg-[#2B1D16]/10 blur-[1px]" />
        <div className="h-20 w-16 rounded-t-3xl bg-[#2B1D16]/10 blur-[1px]" />
        <div className="h-14 w-12 rounded-t-2xl bg-[#2B1D16]/10 blur-[1px]" />
      </div>
      <div className="h-6 w-48 rounded-t-2xl bg-[#2B1D16]/10 blur-[1px]" />
    </div>
  );
}

export default function HeroSection({ banners = [] }) {
  // Admin Banner Management se image aati hai; ek bhi banner na ho to static slides.
  const slides = banners.length
    ? banners.map((banner) => ({
        deity: banner.name,
        title: banner.name,
        highlight: banner.name,
        text: "Sacred stories, rituals, festival guides and darshan timings — explore the divine journey.",
        image: banner.image,
        align: "object-cover"
      }))
    : staticSlides;

  const [active, setActive] = useState(0);
  const slide = slides[Math.min(active, slides.length - 1)];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goPrev = () => setActive((c) => (c - 1 + slides.length) % slides.length);
  const goNext = () => setActive((c) => (c + 1) % slides.length);

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate w-full overflow-hidden bg-[#F6EFE6] text-[#2B1D16]"
    >
      {/* ===== Background (same as before) ===== */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#F6EFE6_0%,#EADBC8_44%,#F8F3EC_100%)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_16%_28%,rgba(198,90,46,0.28),transparent_28%),radial-gradient(circle_at_77%_48%,rgba(255,226,177,0.8),transparent_30%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,221,153,0.9),rgba(198,90,46,0.18)_45%,transparent_72%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full border border-[#C65A2E]/20 opacity-25 [background:repeating-conic-gradient(from_18deg,rgba(198,90,46,0.22)_0deg,rgba(198,90,46,0.22)_6deg,transparent_6deg,transparent_15deg)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-36 -right-24 h-96 w-96 rounded-full border border-[#C65A2E]/15 opacity-20 [background:repeating-conic-gradient(from_0deg,rgba(43,29,22,0.18)_0deg,rgba(43,29,22,0.18)_5deg,transparent_5deg,transparent_14deg)]"
        aria-hidden
      />
      <TempleSilhouette className="bottom-0 left-3 hidden scale-125 opacity-55 blur-sm sm:block" />

      {/* ===== Content — new style ===== */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-7 px-4 pb-10 pt-0 sm:px-6 sm:pt-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:pb-12 lg:pt-9">
        {/* Left — text */}
        <div className="order-2 text-center lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.deity}-${active}`}
              initial={{ opacity: 0, x: -26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#C65A2E]/60" aria-hidden />
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8E3F22]">
                  <Sparkles size={13} className="diya-flicker" aria-hidden />
                  {slide.deity}
                </span>
              </div>

              <h1
                id="home-hero-heading"
                className="mx-auto mt-4 max-w-3xl font-serif text-[1.55rem] font-black leading-[1.08] sm:text-[2.15rem] lg:text-[2.4rem]"
              >
                {slide.title === slide.highlight ? (
                  <span className="bg-gradient-to-r from-[#C65A2E] via-[#E08A3D] to-[#9F3F21] bg-clip-text text-transparent">
                    {slide.highlight}
                  </span>
                ) : (
                  <>
                    {slide.title.split(slide.highlight)[0]}
                    <span className="relative inline-block bg-gradient-to-r from-[#C65A2E] via-[#E08A3D] to-[#9F3F21] bg-clip-text text-transparent">
                      {slide.highlight}
                      <span
                        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#C65A2E]/20"
                        aria-hidden
                      />
                    </span>
                  </>
                )}
              </h1>

              <p className="mx-auto mt-4 max-w-xl border-t-2 border-[#C65A2E]/30 px-2 pt-4 text-sm leading-7 text-[#60483A] sm:text-base lg:border-l-2 lg:border-t-0 lg:pl-4 lg:pt-0">
                {slide.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/temples"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#2B1D16] px-7 py-3.5 text-sm font-bold text-[#F6EFE6] shadow-[0_18px_38px_rgba(43,29,22,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C65A2E]"
            >
              <Landmark size={18} aria-hidden />
              Explore Temples
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#reels"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2B1D16]/15 px-7 py-3 text-sm font-bold text-[#2B1D16] transition duration-300 hover:-translate-y-0.5 hover:border-[#C65A2E]/50 hover:text-[#8E3F22]"
            >
              <Play size={18} aria-hidden />
              Watch Reels
            </Link>
          </div>

          {/* Slide controls — counter + arrows (new style, bottom-left) */}
          {slides.length > 1 && (
            <div className="mt-7 flex items-center justify-center gap-5">
              <div className="font-serif text-sm font-bold tracking-widest text-[#8E3F22]">
                {String(active + 1).padStart(2, "0")}
                <span className="mx-1 text-[#C9A88F]">/</span>
                <span className="text-[#C9A88F]">{String(slides.length).padStart(2, "0")}</span>
              </div>
              <div className="relative h-[3px] w-36 overflow-hidden rounded-full bg-[#2B1D16]/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#C65A2E] transition-all duration-500"
                  style={{ width: `${((active + 1) / slides.length) * 100}%` }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous hero slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B1D16]/15 text-[#8E3F22] transition hover:border-[#C65A2E] hover:bg-[#C65A2E] hover:text-white"
                >
                  <ArrowLeft size={17} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next hero slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B1D16]/15 text-[#8E3F22] transition hover:border-[#C65A2E] hover:bg-[#C65A2E] hover:text-white"
                >
                  <ArrowRight size={17} aria-hidden />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right — mandir-arch image frame (new style) */}
        <div className="order-1 -mx-4 w-[calc(100%+2rem)] max-w-none sm:mx-auto sm:w-full sm:max-w-[290px] lg:order-2 lg:max-w-[320px]">
          <div className="relative">
            {/* Offset arch outline behind */}
            <div
              className="pointer-events-none absolute -right-4 -top-4 hidden h-full w-full rounded-b-[2rem] rounded-t-[999px] border-2 border-dashed border-[#C65A2E]/30 sm:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(198,90,46,0.2),rgba(255,244,224,0.55)_45%,transparent_70%)] blur-xl"
              aria-hidden
            />

            {/* Arch frame */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-none border-0 bg-[#EADBC8] shadow-[0_24px_60px_rgba(80,44,27,0.18)] sm:aspect-[3/4] sm:rounded-b-[2rem] sm:rounded-t-[999px] sm:border-[6px] sm:border-white/80 sm:shadow-[0_35px_90px_rgba(80,44,27,0.28)] sm:ring-1 sm:ring-[#C65A2E]/20">
              {slides.map((item, index) => (
                <img
                  key={`${item.deity}-${index}`}
                  src={item.image}
                  alt={`${item.deity} devotional banner`}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${item.align} ${
                    index === active ? "ken-burns scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D16]/35 via-transparent to-transparent" />

              {/* Name plate inside arch (bottom) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`plate-${slide.deity}-${active}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-x-6 bottom-5 rounded-2xl border border-white/40 bg-[#2B1D16]/45 px-4 py-3 text-center backdrop-blur-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFD9A0]">{slide.deity}</p>
                  <p className="mt-0.5 font-serif text-base font-bold text-white">{slide.highlight}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail rail — mini arches */}
            {slides.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2.5">
                {slides.map((item, index) => (
                  <button
                    key={`thumb-${item.deity}-${index}`}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${item.deity} slide`}
                    className={`relative h-12 w-9 overflow-hidden rounded-b-md rounded-t-full border-2 transition-all duration-300 ${
                      index === active
                        ? "scale-110 border-[#C65A2E] shadow-[0_8px_18px_rgba(198,90,46,0.35)]"
                        : "border-white/70 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

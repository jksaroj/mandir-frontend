"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Landmark, Play, Sparkles } from "lucide-react";

const slides = [
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

const AUTO_SLIDE_MS = 5200;

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

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const mobileSliderRef = useRef(null);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  const handleMobileScroll = (event) => {
    const width = event.currentTarget.clientWidth;
    if (!width) return;
    setActive(Math.round(event.currentTarget.scrollLeft / width) % slides.length);
  };

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate aspect-[4/5] max-h-[62svh] min-h-[420px] w-full overflow-hidden bg-[#F6EFE6] text-[#2B1D16] sm:h-[70vh] sm:min-h-[590px] sm:max-h-none sm:aspect-auto lg:min-h-[620px]"
    >
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
        className="pointer-events-none absolute right-5 top-0 h-56 w-56 rotate-12 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85),rgba(255,199,104,0.38)_36%,transparent_70%)] blur-xl"
        aria-hidden
      />
      <TempleSilhouette className="bottom-0 left-3 hidden scale-125 opacity-55 blur-sm sm:block" />
      <TempleSilhouette className="right-[38%] top-20 hidden scale-75 opacity-40 blur-md lg:block" />
      <div
        className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full border border-[#C65A2E]/20 opacity-25 [background:repeating-conic-gradient(from_18deg,rgba(198,90,46,0.22)_0deg,rgba(198,90,46,0.22)_6deg,transparent_6deg,transparent_15deg)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-36 -right-24 h-96 w-96 rounded-full border border-[#C65A2E]/15 opacity-20 [background:repeating-conic-gradient(from_0deg,rgba(43,29,22,0.18)_0deg,rgba(43,29,22,0.18)_5deg,transparent_5deg,transparent_14deg)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-4 top-6 bottom-6 rounded-[2rem] border border-white/55 bg-white/20 shadow-[0_28px_90px_rgba(93,54,31,0.10)] backdrop-blur-[2px] sm:inset-x-8 lg:inset-x-12"
        aria-hidden
      />

      <div
        ref={mobileSliderRef}
        onScroll={handleMobileScroll}
        className="scrollbar-hide absolute inset-0 z-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth sm:hidden"
      >
        {slides.map((item) => (
          <div key={item.deity} className="relative h-full w-full shrink-0 snap-center">
            <img
              src={item.image}
              alt={`${item.deity} devotional banner`}
              className={`h-full w-full object-cover ${item.align}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D16]/28 via-transparent to-white/10" />
            <div className="absolute inset-0 bg-[#F6EFE6]/10 mix-blend-screen" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto hidden h-full max-w-7xl items-center gap-8 px-4 py-8 sm:grid sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C65A2E]/20 bg-white/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8E3F22] shadow-sm backdrop-blur-md">
            <Sparkles size={14} aria-hidden />
            {slide.deity}
          </div>
          <h1
            id="home-hero-heading"
            key={slide.title}
            className="mt-5 font-serif text-4xl font-black leading-[1.05] text-[#2B1D16] transition sm:text-5xl lg:text-[4rem]"
          >
            {slide.title.split(slide.highlight)[0]}
            {slide.title.includes(slide.highlight) ? (
              <span className="bg-gradient-to-r from-[#C65A2E] via-[#E08A3D] to-[#9F3F21] bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            ) : (
              <span className="block bg-gradient-to-r from-[#C65A2E] via-[#E08A3D] to-[#9F3F21] bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#60483A] sm:text-lg">{slide.text}</p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/temples"
              className="group inline-flex items-center gap-2 rounded-full bg-[#C65A2E] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_38px_rgba(198,90,46,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(198,90,46,0.42)]"
            >
              <Landmark size={18} aria-hidden />
              Explore Temples
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#reels"
              className="inline-flex items-center gap-2 rounded-full border border-[#C65A2E]/35 bg-white/30 px-7 py-3.5 text-sm font-bold text-[#8E3F22] shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/55"
            >
              <Play size={18} aria-hidden />
              Watch Reels
            </Link>
          </div>
        </div>

        <div className="relative h-full min-h-[250px] lg:min-h-0">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(198,90,46,0.22),rgba(255,244,224,0.62)_42%,transparent_69%)] blur-xl"
            aria-hidden
          />
          <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/25 p-2 shadow-[0_35px_90px_rgba(80,44,27,0.22)] backdrop-blur-md">
            {slides.map((item, index) => (
              <img
                key={item.deity}
                src={item.image}
                alt={`${item.deity} devotional banner`}
                className={`absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-[1.55rem] object-cover transition duration-700 ease-out ${item.align} ${
                  index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-2 rounded-[1.55rem] bg-gradient-to-r from-[#2B1D16]/22 via-transparent to-white/12" />
            <div className="absolute inset-2 rounded-[1.55rem] bg-[#F6EFE6]/10 mix-blend-screen" />
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/70 bg-white/65 px-5 py-4 shadow-[0_20px_45px_rgba(80,44,27,0.18)] backdrop-blur-xl sm:left-6 sm:right-auto sm:w-80">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C65A2E]">{slide.deity}</p>
            <p className="mt-1 font-serif text-lg font-bold leading-snug text-[#2B1D16]">{slide.highlight}</p>
            <p className="mt-1 text-xs font-medium leading-5 text-[#705545]">Sacred stories, rituals and darshan guides.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.deity}
            type="button"
            onClick={() => {
              setActive(index);
              mobileSliderRef.current?.scrollTo({
                left: index * mobileSliderRef.current.clientWidth,
                behavior: "smooth"
              });
            }}
            aria-label={`Show ${item.deity} slide`}
            className={`h-2.5 rounded-full transition-all ${
              index === active ? "w-8 bg-[#C65A2E]" : "w-2.5 bg-[#8E6C5B]/35 hover:bg-[#C65A2E]/60"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous hero slide"
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8E3F22] shadow-lg backdrop-blur-md transition hover:bg-white/75 sm:flex lg:left-6"
      >
        <ArrowLeft size={19} aria-hidden />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next hero slide"
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8E3F22] shadow-lg backdrop-blur-md transition hover:bg-white/75 sm:flex lg:right-6"
      >
        <ArrowRight size={19} aria-hidden />
      </button>
    </section>
  );
}

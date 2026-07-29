"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const staticSlides = [
  {
    deity: "Mahadev",
    title: "Celebrate Devotion at Revered Shiva Temples Across India",
    text: "Explore sacred Jyotirlingas, morning mantras, aarti timings and peaceful temple guides devoted to Lord Shiva.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Statue_of_lord_shiva.jpg?width=1800",
    align: "object-[58%_36%]",
  },
  {
    deity: "Hanuman Ji",
    title: "Strength, Seva and Fearless Devotion",
    text: "Read powerful chalisas, discover Hanuman temples and carry the spirit of courage into every day.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Statue.jpg?width=1800",
    align: "object-center",
  },
  {
    deity: "Ganesh Ji",
    title: "Begin Every Journey with Divine Blessings",
    text: "Find Ganesh temples, festival stories and auspicious prayers for wisdom, prosperity and new beginnings.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vandanmedu-Statue_of_Ganesha-WUS07383.jpg?width=1800",
    align: "object-[50%_30%]",
  },
  {
    deity: "Shri Krishna",
    title: "A Divine Path of Joy and Timeless Wisdom",
    text: "Experience Krishna bhajans, Janmashtami guides, temple darshan routes and devotional stories.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lord_Krishna_statue.jpg?width=1800",
    align: "object-[50%_28%]",
  },
  {
    deity: "Radha Krishna",
    title: "Celebrate Eternal Love, Grace and Bhakti",
    text: "Explore Vrindavan-inspired devotion, sacred songs, festival guides and temples of divine love.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Krishna_and_radha.jpg?width=1800",
    align: "object-[50%_35%]",
  },
];

const AUTO_SLIDE_MS = 5600;

export default function HeroSection({ banners = [] }) {
  const slides = banners.length
    ? banners.map((banner) => ({
        deity: banner.name,
        title: banner.heading || banner.name,
        text: banner.description || "Sacred stories, rituals, festival guides and darshan timings — explore the divine journey.",
        image: banner.image,
        backgroundColor: banner.backgroundColor,
        align: "object-center",
      }))
    : staticSlides;

  const [active, setActive] = useState(0);
  const slide = slides[Math.min(active, slides.length - 1)];
  const backgroundColor = slide.backgroundColor || "#061b42";

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const next = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section aria-labelledby="home-hero-heading" className="relative isolate min-h-[560px] w-full overflow-hidden text-white transition-colors duration-700 lg:min-h-[620px]" style={{ backgroundColor }}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

      <div className="absolute inset-x-0 top-0 h-[48%] overflow-hidden lg:inset-y-0 lg:left-[44%] lg:right-0 lg:h-auto">
        {slides.map((item, index) => (
          <img
            key={`${item.deity}-${index}`}
            src={item.image}
            alt={`${item.deity} devotional banner`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${item.align} ${
              index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 lg:hidden" style={{ background: `linear-gradient(to top, ${backgroundColor}, transparent 70%)` }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(90deg, ${backgroundColor} 0%, ${backgroundColor}f5 4%, ${backgroundColor}b8 12%, ${backgroundColor}3d 24%, transparent 42%)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 top-[42%] w-full lg:top-0 lg:w-[47%]" style={{ backgroundColor }} />
      <div className="pointer-events-none absolute bottom-0 left-[42%] top-0 hidden w-[18%] lg:block" style={{ background: `linear-gradient(to right, ${backgroundColor}, ${backgroundColor}bf, transparent)` }} />

      <div className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-[1440px] items-end px-6 pb-16 pt-[285px] sm:px-10 lg:min-h-[620px] lg:items-center lg:px-16 lg:pb-14 lg:pt-0 xl:px-20">
        <div className="w-full lg:max-w-[590px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.deity}-${active}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3 rounded-full bg-[#c9ed79] px-5 py-2.5 font-bold text-[#173519] shadow-lg">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173519] text-[#c9ed79]">
                  <Sparkles size={17} />
                </span>
                <span className="text-sm uppercase tracking-[0.08em] sm:text-base">{slide.deity}</span>
              </div>
              <h1 id="home-hero-heading" className="mt-7 max-w-xl text-3xl font-black leading-[1.2] sm:text-4xl lg:mt-12 lg:text-[44px]">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-lg text-sm font-medium leading-7 text-white/75 sm:text-base">
                {slide.text}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/temples" className="rounded-lg bg-white px-8 py-3.5 text-sm font-extrabold text-[#071a3d] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#c9ed79]">
                  Explore Temples
                </Link>
                <Link href="#reels" className="rounded-lg border border-white/35 px-8 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10">
                  Watch Reels
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button type="button" onClick={previous} aria-label="Previous banner" className="absolute left-4 top-[34%] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-[#071a3d] shadow-lg backdrop-blur lg:top-1/2">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={next} aria-label="Next banner" className="absolute right-4 top-[34%] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-[#071a3d] shadow-lg backdrop-blur lg:top-1/2">
            <ArrowRight size={18} />
          </button>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((item, index) => (
              <button
                key={`${item.deity}-dot-${index}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.deity} banner`}
                className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

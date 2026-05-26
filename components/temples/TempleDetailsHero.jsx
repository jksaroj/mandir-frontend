"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, Heart, MapPin, Navigation, Shirt, Star, UserRound } from "lucide-react";
import FadeUp from "@/components/animations/FadeUp";
import FloatingDivine from "@/components/animations/FloatingDivine";
import SimpleSlider from "@/components/ui/SimpleSlider";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { IMAGE_SIZES, templeImageAlt } from "@/lib/images";

export default function TempleDetailsHero({ temple }) {
  const [activeImage, setActiveImage] = useState(0);

  const images = useMemo(() => {
    const list = temple.images?.length ? temple.images : [temple.image];
    return list.filter(Boolean);
  }, [temple.images, temple.image]);

  const slides = useMemo(
    () =>
      images.map((url, index) => ({
        image: url,
        alt: templeImageAlt(temple.name, { context: index === 0 ? "hero" : "gallery", index, total: images.length }),
      })),
    [images, temple.name]
  );

  const badges = [
    ["Deity", temple.deity, UserRound],
    ["Temple Timings", temple.templeTimings, Clock],
    ["Dress Code", temple.dressCode, Shirt]
  ];

  return (
    <section className="grid gap-10 lg:grid-cols-[1.12fr_1fr] lg:items-center">
      <div>
        <FloatingDivine>
          <SimpleSlider
            slides={slides}
            className="h-[360px] overflow-hidden rounded-xl bg-white shadow-sm"
            autoPlay={slides.length > 1}
            activeIndex={activeImage}
            onIndexChange={setActiveImage}
          />
        </FloatingDivine>
        {images.length > 1 && (
          <div className="mt-4 grid grid-cols-5 gap-3">
            {images.map((url, index) => (
              <button
                key={`${url}-${index}`}
                type="button"
                aria-label={templeImageAlt(temple.name, { context: "thumbnail", index, total: images.length })}
                aria-current={activeImage === index}
                onClick={() => setActiveImage(index)}
                className={`relative h-20 overflow-hidden rounded-lg outline-none transition ${
                  activeImage === index ? "ring-2 ring-[#d89b2b] ring-offset-2 ring-offset-[#fffaf6]" : "ring-1 ring-transparent hover:ring-[#ead8c6]"
                }`}
              >
                <OptimizedImage
                  src={url}
                  alt={templeImageAlt(temple.name, { context: "thumbnail", index, total: images.length })}
                  fill
                  sizes={IMAGE_SIZES.thumbnail}
                  className="object-cover"
                  quality={75}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <FadeUp>
        <div>
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#fff0dc] px-3 py-2 text-xs font-extrabold text-[#b66a14]">
            <Star size={14} className="fill-[#f7b313] text-[#f7b313]" /> Popular Temple
          </span>
          <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-[#351112]">{temple.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-500">
            <MapPin size={19} className="text-[#d89b2b]" /> {temple.city}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="font-extrabold">{temple.rating}</span>
            <span className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="fill-[#f7b313] text-[#f7b313]" />
              ))}
            </span>
            <span className="text-sm font-semibold text-slate-500">({temple.reviewCount} Reviews)</span>
          </div>
          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">{temple.excerpt}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {badges.map(([label, value, Icon]) => (
              <div key={label} className="flex gap-3 rounded-xl bg-[#fff5e9] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#d89b2b]">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-extrabold text-[#3b2430]">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-[#6b2323] px-8 py-3 text-sm font-extrabold text-white">
              <CalendarDays size={17} /> Book Darshan / Seva
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-[#9b5252] px-8 py-3 text-sm font-extrabold text-[#6b2323]">
              <Navigation size={17} /> Get Directions
            </a>
            <button type="button" className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#d9b7a6] text-[#9b5252]">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

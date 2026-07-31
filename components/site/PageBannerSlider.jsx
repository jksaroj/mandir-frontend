"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const AUTO_SLIDE_MS = 5600;

export default function PageBannerSlider({ banners = [], title = "" }) {
  const [active, setActive] = useState(0);
  const slide = banners[Math.min(active, Math.max(0, banners.length - 1))];

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % banners.length), AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (!slide) return null;
  const previous = () => setActive((value) => (value - 1 + banners.length) % banners.length);
  const next = () => setActive((value) => (value + 1) % banners.length);

  return (
    <section className="relative isolate min-h-[300px] overflow-hidden text-white sm:min-h-[380px]" style={{ backgroundColor: slide.backgroundColor }}>
      {banners.map((banner, index) => (
        <img key={banner.id} src={banner.image} alt={banner.heading || banner.name || title} className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="relative z-10 mx-auto flex min-h-[300px] max-w-7xl items-center px-6 py-12 sm:min-h-[380px] sm:px-10 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#f3c568]">{slide.name || title}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">{slide.heading || slide.name || title}</h1>
          {slide.description && <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/85 sm:text-base">{slide.description}</p>}
        </div>
      </div>
      {banners.length > 1 && <>
        <button onClick={previous} aria-label="Previous banner" className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#351112] shadow"><ArrowLeft size={18}/></button>
        <button onClick={next} aria-label="Next banner" className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#351112] shadow"><ArrowRight size={18}/></button>
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">{banners.map((banner,index)=><button key={banner.id} onClick={()=>setActive(index)} aria-label={`Show banner ${index+1}`} className={`h-2.5 rounded-full transition-all ${index===active?"w-8 bg-white":"w-2.5 bg-white/50"}`}/>)}</div>
      </>}
    </section>
  );
}

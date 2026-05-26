"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalScroll({
  children,
  className = "",
  gapClass = "gap-5",
  ariaLabel = "Carousel"
}) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.82) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateArrows, 320);
  };

  return (
    <div className={`group relative ${className}`}>
      <button
        type="button"
        aria-label="Scroll previous"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f1e4d6] bg-white text-maroon shadow-md transition hover:bg-cream disabled:opacity-30 md:flex lg:-left-4"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        onScroll={updateArrows}
        className={`flex overflow-x-auto scroll-smooth pb-2 ${gapClass} snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Scroll next"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f1e4d6] bg-white text-maroon shadow-md transition hover:bg-cream disabled:opacity-30 md:flex lg:-right-4"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

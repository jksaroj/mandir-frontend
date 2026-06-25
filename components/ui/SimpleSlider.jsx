"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { isValidImageSrc } from "@/lib/images";

export default function SimpleSlider({ slides, autoPlay = false, interval = 5000, className = "", renderSlide, activeIndex, onIndexChange }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = slides.length;
  const currentIndex = activeIndex ?? index;

  const goTo = (next) => {
    const nextIndex = ((next % count) + count) % count;
    setIndex(nextIndex);
    onIndexChange?.(nextIndex);
  };
  const next = () => goTo(currentIndex + 1);
  const previous = () => goTo(currentIndex - 1);

  useEffect(() => {
    if (!autoPlay || paused || reduceMotion || count < 2) return undefined;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, reduceMotion, count, currentIndex, interval]);

  if (!count) return null;

  const slide = slides[currentIndex];
  const slideSrc = typeof slide === "object" && slide !== null ? slide.image : slide;
  const slideAlt = typeof slide === "object" && slide !== null ? slide.alt : "Slide image";
  const hasImage = isValidImageSrc(typeof slideSrc === "string" ? slideSrc.trim() : "");

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
      tabIndex={0}
    >
      <div className="h-full overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="h-full"
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -28 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {renderSlide ? (
              renderSlide(slide, currentIndex)
            ) : hasImage ? (
              <div className="relative h-full min-h-[260px]">
                <OptimizedImage
                  src={slideSrc}
                  alt={slideAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  priority={currentIndex === 0}
                  quality={85}
                />
              </div>
            ) : slide?.title ? (
              <a href={slide.href || "#"} className="block rounded-xl bg-[#fff7ed] p-8 font-extrabold text-[#6b2323]">
                {slide.icon && <span className="mb-4 block text-[#d9a441]">{slide.icon}</span>}
                {slide.title}
              </a>
            ) : (
              slide
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {count > 1 && (
        <>
          <button aria-label="Previous slide" onClick={previous} className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#6b2323] shadow-md">
            <ChevronLeft size={18} />
          </button>
          <button aria-label="Next slide" onClick={next} className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#6b2323] shadow-md">
            <ChevronRight size={18} />
          </button>
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
            {slides.map((_, dot) => (
              <button
                key={dot}
                aria-label={`Go to slide ${dot + 1}`}
                onClick={() => goTo(dot)}
                className={`h-2 rounded-full transition-all ${dot === currentIndex ? "w-6 bg-[#d9a441]" : "w-2 bg-[#e8d6c2]"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

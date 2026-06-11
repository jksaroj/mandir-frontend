"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import HomeTempleCard from "@/components/home/HomeTempleCard";
import { temples as staticTemples } from "@/lib/temples";

export default function PopularTemples({ temples = staticTemples }) {
  return (
    <section id="temples" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#11162b] sm:text-3xl">
            Popular Temples in India
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Explore sacred mandirs for your next pilgrimage.
          </p>
        </div>
        <Link
          href="/temples"
          className="flex items-center gap-1 text-sm font-bold text-maroon hover:underline"
        >
          View All Temples <ChevronRight size={16} aria-hidden />
        </Link>
      </div>

      <HorizontalScroll ariaLabel="Popular temples carousel">
        {temples.slice(0, 12).map((temple) => (
          <HomeTempleCard key={temple.slug} temple={temple} />
        ))}
      </HorizontalScroll>
    </section>
  );
}

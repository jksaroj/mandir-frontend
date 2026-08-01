"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HomeTempleCard from "@/components/home/HomeTempleCard";
import { temples as staticTemples } from "@/lib/temples";

export default function PopularTemples({ temples = staticTemples }) {
  const source = Array.isArray(temples) && temples.length > 0 ? temples : staticTemples;
  const shown = source.slice(0, 8);

  return (
    <section id="temples" className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2d2020]">
            ॐ Popular Temples in India
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((temple) => (
          <div key={temple.slug} className="flex w-full">
            <HomeTempleCard temple={temple} grid />
          </div>
        ))}
      </div>
    </section>
  );
}

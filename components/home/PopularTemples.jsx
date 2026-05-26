"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import HomeTempleCard from "@/components/home/HomeTempleCard";
import {
  cityFilters,
  deityFilters,
  matchCityFilter,
  matchDeityFilter
} from "@/lib/homeContent";
import { temples as staticTemples } from "@/lib/temples";

export default function PopularTemples({ temples = staticTemples }) {
  const [deityFilter, setDeityFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const filtered = useMemo(
    () =>
      temples.filter(
        (t) => matchDeityFilter(t, deityFilter) && matchCityFilter(t, cityFilter)
      ),
    [temples, deityFilter, cityFilter]
  );

  const display = filtered.length ? filtered : temples;

  return (
    <section id="temples" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#11162b] sm:text-3xl">
            Popular Temples in India
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Explore sacred mandirs — filter by deity or holy city for your next pilgrimage.
          </p>
        </div>
        <Link
          href="/temples"
          className="flex items-center gap-1 text-sm font-bold text-maroon hover:underline"
        >
          View All Temples <ChevronRight size={16} aria-hidden />
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by deity">
        {deityFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setDeityFilter(f.id)}
            aria-pressed={deityFilter === f.id}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              deityFilter === f.id
                ? "bg-gradient-to-r from-[#d89b2b] to-[#c48a2a] text-white shadow-sm"
                : "border border-[#f1e4d6] bg-white text-[#4a3030] hover:bg-cream"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by city">
        {cityFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setCityFilter(f.id)}
            aria-pressed={cityFilter === f.id}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              cityFilter === f.id
                ? "bg-maroon text-white"
                : "bg-[#f5efe6] text-[#4a3030] hover:bg-[#ebe3d6]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <HorizontalScroll ariaLabel="Popular temples carousel">
        {display.slice(0, 12).map((temple) => (
          <HomeTempleCard key={temple.slug} temple={temple} />
        ))}
      </HorizontalScroll>

      {filtered.length === 0 && (
        <p className="mt-4 text-center text-sm font-medium text-slate-500">
          No temples match these filters. Showing all popular temples.
        </p>
      )}
    </section>
  );
}

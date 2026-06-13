"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import { reelFilters, spiritualReels } from "@/lib/homeContent";
import { apiGet } from "@/lib/api";
import { resolveImageUrl } from "@/lib/images";
import ReelPopup from "@/components/reels/ReelPopup";

const fallbackThumbs = [
  "/reels/shiva.svg",
  "/reels/hanuman.svg",
  "/reels/krishna.svg",
  "/reels/aarti.svg",
  "/reels/temple.svg",
  "/reels/durga.svg"
];

function youtubeIdFromUrl(url) {
  const raw = String(url || "");
  const patterns = [
    /youtube\.com\/shorts\/([^?&/]+)/i,
    /youtube\.com\/watch\?v=([^?&/]+)/i,
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i
  ];
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

function normalizeApiReel(reel, index) {
  const youtubeId = reel.sourceType === "youtube" ? youtubeIdFromUrl(reel.videoUrl) : "";
  return {
    ...reel,
    id: reel._id || reel.id || `api-${index}`,
    title: reel.title || "Divine Reel",
    deity: reel.deity || reel.category || "Bhakti",
    filter: String(reel.category || reel.deity || "all").toLowerCase(),
    duration: reel.duration || `0:${25 + (index % 7)}`,
    youtubeId,
    href: reel.videoUrl || (reel.videoFile ? resolveImageUrl(reel.videoFile, "") : "/reels"),
    thumbnail: resolveImageUrl(reel.thumbnail, fallbackThumbs[index % fallbackThumbs.length])
  };
}

function ReelCard({ reel, onOpen }) {
  return (
    <article className="group relative w-[min(100%,200px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#f1e4d6] bg-[#1a1212] shadow-md sm:w-[180px]">
      <div className="relative aspect-[9/16] w-full">
        <button
          type="button"
          className="absolute inset-0 h-full w-full"
          onClick={() => onOpen(reel)}
          aria-label={`Play ${reel.title}`}
        >
          <img
            src={reel.thumbnail}
            alt={`${reel.title} — ${reel.deity} spiritual reel thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/15">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg">
              <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-maroon" />
            </span>
          </span>
        </button>
        <span className="absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-bold text-white">
          {reel.deity}
        </span>
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-bold text-white">
          <Clock size={10} aria-hidden />
          {reel.duration}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-white">{reel.title}</h3>
        <div className="mt-2">
          <Link href="/reels" className="text-[11px] font-semibold text-[#d9a441] hover:underline">
            Watch more
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function SpiritualReels() {
  const [reels, setReels] = useState(spiritualReels);
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function loadReels() {
      const response = await apiGet("/reels?limit=12");
      if (!ignore && Array.isArray(response?.data) && response.data.length) {
        setReels(response.data.map(normalizeApiReel));
      }
    }
    loadReels();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return reels;
    return reels.filter((r) => r.filter === filter || String(r.deity || "").toLowerCase() === filter);
  }, [filter, reels]);

  return (
    <section id="reels" className="bg-gradient-to-b from-[#fffaf5] to-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-[#11162b] sm:text-3xl">
          Spiritual Reels &amp; Bhakti Shorts
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Short devotional videos — hover to play on desktop, tap on mobile.
        </p>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter reels">
          {reelFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                filter === f.id
                  ? "bg-maroon text-white"
                  : "border border-[#f1e4d6] bg-white text-[#4a3030]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <HorizontalScroll ariaLabel="Spiritual reels carousel">
            {filtered.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} onOpen={() => setActiveIndex(i)} />
            ))}
          </HorizontalScroll>
        </div>
      </div>

      {activeIndex !== null && (
        <ReelPopup
          reels={filtered}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}

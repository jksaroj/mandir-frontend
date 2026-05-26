"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Share2 } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import { reelFilters, spiritualReels } from "@/lib/homeContent";

function ReelCard({ reel }) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);

  const share = async () => {
    const url = `https://www.youtube.com/watch?v=${reel.youtubeId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: reel.title, url });
      } catch {
        /* cancelled */
      }
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

  return (
    <article
      className="group relative w-[min(100%,200px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#f1e4d6] bg-[#1a1212] shadow-md sm:w-[180px]"
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      <div className="relative aspect-[9/16] w-full">
        {playing && loaded ? (
          <iframe
            title={reel.title}
            src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="absolute inset-0 h-full w-full"
            onClick={() => {
              setLoaded(true);
              setPlaying((p) => !p);
            }}
            aria-label={playing ? `Pause ${reel.title}` : `Play ${reel.title}`}
          >
            <Image
              src={reel.thumbnail}
              alt={`${reel.title} — ${reel.deity} spiritual reel thumbnail`}
              fill
              sizes="180px"
              className="object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/15">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg">
                <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-maroon" />
              </span>
            </span>
          </button>
        )}
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
        <div className="mt-2 flex items-center justify-between">
          <Link href="#reels" className="text-[11px] font-semibold text-[#d9a441] hover:underline">
            Watch more
          </Link>
          <button
            type="button"
            onClick={share}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label={`Share ${reel.title}`}
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function SpiritualReels() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return spiritualReels;
    return spiritualReels.filter((r) => r.filter === filter);
  }, [filter]);

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
            {filtered.map((reel) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}

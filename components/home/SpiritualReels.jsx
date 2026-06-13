"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { reelFilters } from "@/lib/homeContent";
import { fetchReels } from "@/lib/reels";
import ReelPopup from "@/components/reels/ReelPopup";

function reelTags(reel) {
  const source = Array.isArray(reel?.tags) ? reel.tags.join(" ") : String(reel?.tags || "");
  const hashtags = source.match(/#[^\s#]+/g);
  const raw = hashtags?.length ? hashtags : source.split(/[,\n|\s]+/);

  return raw
    .map((tag) => String(tag || "").trim())
    .filter(Boolean)
    .slice(0, 2);
}

function ReelCard({ reel, onOpen }) {
  const tags = reelTags(reel);

  return (
    <article className="group card-lift relative overflow-hidden rounded-2xl border border-[#f1e4d6] bg-[#1a1212] shadow-md">
      <div className="relative aspect-[9/11] w-full">
        <button
          type="button"
          className="absolute inset-0 h-full w-full"
          onClick={() => onOpen(reel)}
          aria-label={`Play ${reel.title}`}
        >
          <img
            src={reel.thumbnail}
            alt={`${reel.title} — ${reel.deity} spiritual reel thumbnail`}
            className="img-zoom h-full w-full object-cover"
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
        <div className="mt-3 flex min-h-6 min-w-0 gap-1.5 overflow-hidden whitespace-nowrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="min-w-0 max-w-[48%] shrink truncate rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#f6d38a]"
              title={tag}
            >
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ReelSkeleton() {
  return (
    <div>
      <div className="aspect-[9/11] w-full animate-pulse rounded-2xl bg-[#f1e4d6]" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-[#f1e4d6]" />
    </div>
  );
}

export default function SpiritualReels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const data = await fetchReels({ limit: 12 });
      if (!ignore) {
        setReels(data);
        setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return reels;
    return reels.filter(
      (r) =>
        r.filter === filter ||
        String(r.deity || "").toLowerCase().includes(filter) ||
        String(r.category || "").toLowerCase().includes(filter)
    );
  }, [filter, reels]);

  const shown = useMemo(() => filtered.slice(0, 4), [filtered]);

  return (
    <section id="reels" className="bg-gradient-to-b from-[#fffaf5] to-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#11162b] sm:text-3xl">
              Spiritual Reels &amp; Bhakti Shorts
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Short devotional videos — tap to play.
            </p>
          </div>
          <Link href="/reels" className="text-sm font-bold text-maroon hover:underline">
            View All Reels →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reels">
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
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ReelSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#f1e4d6] py-14 text-center">
              <p className="text-sm font-semibold text-slate-400">
                {reels.length === 0 ? "Koi reel upload nahi hui abhi. Admin se reels add karwayein." : "Is category mein koi reel nahi mili."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((reel, i) => (
                <ReelCard key={reel.id} reel={reel} onOpen={() => setActiveIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {activeIndex !== null && (
        <ReelPopup
          reels={shown}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}

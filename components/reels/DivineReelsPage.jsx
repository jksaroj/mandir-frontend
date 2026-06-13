"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Headphones,
  Heart,
  Landmark,
  LoaderCircle,
  Mic,
  Music2,
  Play,
  RotateCw,
  Sparkles
} from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { fetchReels } from "@/lib/reels";
import ReelPopup from "@/components/reels/ReelPopup";

const heroImage = "/reels/hero-krishna.png";

const filters = [
  { id: "all", label: "All", icon: Flame },
  { id: "Bhakti", label: "Bhakti", icon: Sparkles },
  { id: "Bhajan", label: "Bhajan", icon: Music2 },
  { id: "Aarti", label: "Aarti", icon: Sparkles },
  { id: "Mantra", label: "Mantra", icon: Headphones },
  { id: "Temple", label: "Temple", icon: Landmark },
  { id: "Festival", label: "Festival", icon: Heart },
  { id: "Pravachan", label: "Pravachan", icon: Mic }
];

const PER_PAGE = 10;

function ReelCard({ reel, onOpen }) {
  return (
    <article className="group card-lift overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        className="relative block w-full aspect-[16/10] bg-gray-100 text-left overflow-hidden"
        onClick={() => onOpen(reel)}
        aria-label={`Play ${reel.title}`}
      >
        <img
          src={reel.thumbnail}
          alt={`${reel.title} reel thumbnail`}
          className="img-zoom h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play size={18} fill="#e2382d" className="text-[#e2382d] ml-0.5" />
          </span>
        </span>
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
          <Play size={10} fill="currentColor" />
          {reel.views}
        </span>
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {reel.duration}
        </span>
      </button>
      <div className="px-3 pb-3 pt-2">
        <h3 className="line-clamp-1 text-sm font-extrabold text-[#1d1d1f]">{reel.title}</h3>
        <p className="mt-1 text-[11px] font-bold text-[#e2382d]">#{reel.deity || reel.category}</p>
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500">
            <span className="text-sm">🙏</span>
            Sri Devasthanam
          </span>
        </div>
      </div>
    </article>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white">
      <div className="aspect-[16/10] w-full animate-pulse bg-gray-100" />
      <div className="px-3 pb-3 pt-2 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function DivineReelsPage() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(PER_PAGE);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const data = await fetchReels({ limit: 100 });
      if (!ignore) {
        setReels(data);
        setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    setPage(1);
    setVisible(PER_PAGE);
  }, [filter, sort]);

  const filtered = useMemo(() => {
    const list =
      filter === "all"
        ? reels
        : reels.filter((r) => {
            const active = filter.toLowerCase();
            return (
              String(r.category || "").toLowerCase() === active ||
              String(r.deity || "").toLowerCase().includes(active)
            );
          });
    if (sort === "oldest") return [...list].reverse();
    if (sort === "popular") return [...list].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
    return list;
  }, [filter, reels, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const shown = paged.slice(0, visible);
  const hasMore = visible < paged.length;

  const changePage = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
    setVisible(PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden border-b border-gray-200 bg-black text-white">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Lord Krishna playing flute"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
          </div>
          <div className="relative mx-auto flex min-h-[140px] max-w-7xl items-center px-4 py-7 sm:px-6 lg:px-8">
            <div className="max-w-md">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Divine Reels</h1>
              <div className="mt-2 h-px w-36 bg-white/70" />
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/90">
                Short videos that inspire devotion, bring peace and connect you with the divine.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide" role="group" aria-label="Reel categories">
              {filters.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className="flex min-w-[64px] flex-col items-center gap-2 text-[11px] font-bold text-gray-700"
                  aria-pressed={filter === id}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                      filter === id
                        ? "border-red-300 bg-red-50 text-red-600 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  {label}
                </button>
              ))}
            </div>

            <label className="relative w-full md:w-36">
              <span className="sr-only">Sort reels</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 shadow-sm outline-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="oldest">Oldest</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </label>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="mt-6 rounded-lg border border-dashed border-gray-200 py-14 text-center text-sm font-semibold text-gray-500">
              {reels.length === 0
                ? "Abhi koi reel available nahi hai. Admin panel se reels upload karein."
                : "Is category mein koi reel nahi mili."}
            </div>
          )}

          {/* Reels grid */}
          {!loading && shown.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((reel, i) => (
                <ReelCard key={reel._id} reel={reel} onOpen={() => setActiveIndex(i)} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && filtered.length > PER_PAGE && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => changePage(page - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((n) => n <= 4 || n === totalPages || Math.abs(n - page) <= 1)
                  .map((n, idx, arr) => (
                    <span key={n} className="contents">
                      {idx > 0 && n - arr[idx - 1] > 1 && (
                        <span className="px-1 text-xs text-gray-400">...</span>
                      )}
                      <button
                        type="button"
                        onClick={() => changePage(n)}
                        className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-bold ${
                          page === n
                            ? "border-red-600 bg-red-600 text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        {n}
                      </button>
                    </span>
                  ))}
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => changePage(page + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                type="button"
                disabled={!hasMore}
                onClick={() => setVisible((c) => c + PER_PAGE)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-xs font-extrabold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <RotateCw size={14} />
                Load More Reels
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {activeIndex !== null && (
        <ReelPopup
          reels={shown}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}

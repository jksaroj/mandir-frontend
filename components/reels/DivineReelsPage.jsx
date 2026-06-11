"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Headphones,
  Heart,
  Landmark,
  LoaderCircle,
  Mic,
  MoreHorizontal,
  Music2,
  Play,
  RotateCw,
  Sparkles
} from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ShareButton from "@/components/ui/ShareButton";
import { apiGet } from "@/lib/api";
import { resolveImageUrl } from "@/lib/images";

const heroImage = "/reels/hero-krishna.png";

const fallbackThumbs = [
  "/reels/shiva.svg",
  "/reels/hanuman.svg",
  "/reels/krishna.svg",
  "/reels/aarti.svg",
  "/reels/temple.svg",
  "/reels/durga.svg",
  "/reels/ganesh.svg",
  "/reels/satsang.svg"
];

const fallbackReels = [
  ["Om Namah Shivaya", "Shiv", "Bhajan", "12.5K", "00:30"],
  ["Shri Hanuman Chalisa", "Hanuman", "Aarti", "15.8K", "00:28"],
  ["Radhe Krishna Bhajan", "Krishna", "Bhajan", "18.2K", "00:29"],
  ["Shri Aarti Sangrah", "Aarti", "Aarti", "9.1K", "00:26"],
  ["Kashi Vishwanath Darshan", "Temple", "Temple", "7.2K", "00:30"],
  ["Maa Devi Mahima", "Durga", "Bhajan", "11.6K", "00:30"],
  ["Ganpati Bappa Morya", "Ganesh", "Bhajan", "10.2K", "00:27"],
  ["Shanti Mantra", "Mantra", "Mantra", "8.3K", "00:25"],
  ["Satsang Amrit Vani", "Pravachan", "Pravachan", "6.4K", "00:28"],
  ["Radha Naam Ki Mahima", "Krishna", "Bhajan", "9.8K", "00:29"],
  ["Mandir Ki Subah", "Temple", "Temple", "7.9K", "00:24"],
  ["Aarti Deep Darshan", "Aarti", "Aarti", "13.4K", "00:31"],
  ["Bhakti Ras Kirtan", "Bhajan", "Bhajan", "5.8K", "00:27"],
  ["Mahamrityunjaya Mantra", "Shiv", "Mantra", "14.7K", "00:30"],
  ["Sant Vani", "Pravachan", "Pravachan", "6.9K", "00:32"],
  ["Vrindavan Darshan", "Krishna", "Temple", "12.1K", "00:29"]
].map(([title, deity, category, views, duration], index) => ({
  _id: `fallback-${index}`,
  title,
  deity,
  category,
  views,
  duration,
  sourceType: "youtube",
  thumbnail: fallbackThumbs[index % fallbackThumbs.length],
  status: "active"
}));

const filters = [
  { id: "all", label: "All", icon: Flame },
  { id: "Bhajan", label: "Bhajan", icon: Music2 },
  { id: "Aarti", label: "Aarti", icon: Sparkles },
  { id: "Mantra", label: "Mantra", icon: Headphones },
  { id: "Temple", label: "Temple", icon: Landmark },
  { id: "Festival", label: "Festival", icon: Heart },
  { id: "Pravachan", label: "Pravachan", icon: Mic }
];

const PER_PAGE = 10;

function normalizeApiReel(reel, index) {
  return {
    ...reel,
    _id: reel._id || reel.id || `api-${index}`,
    title: reel.title || "Divine Reel",
    category: reel.category || "Bhajan",
    deity: reel.deity || "Bhakti",
    views: reel.views || `${(6 + (index % 14) + 0.2).toFixed(1)}K`,
    duration: reel.duration || `00:${25 + (index % 7)}`,
    thumbnail: resolveImageUrl(reel.thumbnail, fallbackThumbs[index % fallbackThumbs.length])
  };
}

function getReelUrl(reel) {
  if (reel.videoUrl) return reel.videoUrl;
  if (reel.videoFile) return resolveImageUrl(reel.videoFile, "");
  return typeof window !== "undefined" ? window.location.href : "/reels";
}

function ReelCard({ reel }) {
  const shareUrl = getReelUrl(reel);
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/10] bg-gray-100">
        <img
          src={reel.thumbnail}
          alt={`${reel.title} reel thumbnail`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
          <Play size={10} fill="currentColor" />
          {reel.views}
        </span>
        <button
          type="button"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded border border-white/40 bg-black/25 text-white"
          aria-label={`Save ${reel.title}`}
        >
          <Bookmark size={15} />
        </button>
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {reel.duration}
        </span>
      </div>
      <div className="px-3 pb-3 pt-2">
        <h3 className="line-clamp-1 text-sm font-extrabold text-[#1d1d1f]">{reel.title}</h3>
        <p className="mt-1 text-[11px] font-bold text-[#e2382d]">#{reel.deity || reel.category}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500">
            <span className="text-sm">🙏</span>
            Brahmatatva
          </span>
          <div className="flex items-center gap-1">
            <ShareButton
              title={reel.title}
              url={shareUrl}
              label={`Share ${reel.title}`}
              modalTitle="Share this reel"
              iconOnly
              iconSize={15}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#e2382d] transition hover:bg-red-50"
            />
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
              aria-label={`More options for ${reel.title}`}
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DivineReelsPage() {
  const [reels, setReels] = useState(fallbackReels);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(PER_PAGE);

  useEffect(() => {
    let ignore = false;
    async function loadReels() {
      setLoading(true);
      const response = await apiGet("/reels?limit=100");
      if (!ignore && Array.isArray(response?.data) && response.data.length) {
        setReels(response.data.filter((r) => r.status !== "inactive").map(normalizeApiReel));
      }
      if (!ignore) setLoading(false);
    }
    loadReels();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
    setVisible(PER_PAGE);
  }, [filter, sort]);

  const filtered = useMemo(() => {
    const list = filter === "all" ? reels : reels.filter((r) => r.category === filter || r.deity === filter);
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
            <Image src={heroImage} alt="Lord Krishna playing flute" fill priority sizes="100vw" className="object-cover object-center opacity-70" />
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
                onChange={(event) => setSort(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 shadow-sm outline-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="oldest">Oldest</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </label>
          </div>

          {loading && (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-gray-100 bg-gray-50 py-8 text-sm font-semibold text-gray-500">
              <LoaderCircle size={18} className="animate-spin" />
              Loading reels...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="mt-6 rounded-lg border border-dashed border-gray-200 py-14 text-center text-sm font-semibold text-gray-500">
              No reels found.
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((reel) => (
              <ReelCard key={reel._id} reel={reel} />
            ))}
          </div>

          {filtered.length > 0 && (
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
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((item) => item <= 4 || item === totalPages || Math.abs(item - page) <= 1)
                  .map((item, index, arr) => (
                    <span key={item} className="contents">
                      {index > 0 && item - arr[index - 1] > 1 && <span className="px-1 text-xs text-gray-400">...</span>}
                      <button
                        type="button"
                        onClick={() => changePage(item)}
                        className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-bold ${
                          page === item
                            ? "border-red-600 bg-red-600 text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        {item}
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
                onClick={() => setVisible((count) => count + PER_PAGE)}
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
    </>
  );
}

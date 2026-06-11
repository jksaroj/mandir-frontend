"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Pause, Play } from "lucide-react";
import Stagger, { StaggerItem } from "@/components/animations/Stagger";
import {
  fallbackAartis,
  fallbackChalisas,
  fallbackMantras
} from "@/lib/homeContent";
import { getMantraHref } from "@/lib/mantras";

function DevotionalCard({ item, playingId, onToggle }) {
  const isPlaying = playingId === item.slug;
  const href = item.href || getMantraHref(item);

  return (
    <article className="flex items-center gap-3 rounded-xl border border-[#f5efe6] bg-[#fffdf9] p-3 transition hover:border-[#e8d4b8] hover:shadow-sm">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={`${item.title} — ${item.deity}`}
          fill
          sizes="56px"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-extrabold text-[#11162b]">
          <Link href={href} className="hover:text-maroon">
            {item.title}
          </Link>
        </h3>
        <p className="text-xs font-semibold text-slate-500">{item.deity}</p>
        <p className="text-xs text-slate-400">{item.duration}</p>
      </div>
      <button
        type="button"
        onClick={() => onToggle(item.slug)}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition ${
          isPlaying ? "bg-maroon text-white" : "bg-[#fff0d6] text-maroon"
        }`}
        aria-label={isPlaying ? `Pause ${item.title}` : `Play ${item.title}`}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
    </article>
  );
}

function Column({ title, items, viewAllHref, playingId, onToggle }) {
  return (
    <div className="rounded-2xl border border-[#f1e4d6] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-extrabold text-[#11162b]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.slug}>
            <DevotionalCard item={item} playingId={playingId} onToggle={onToggle} />
          </li>
        ))}
      </ul>
      <Link
        href={viewAllHref}
        className="mt-5 flex w-full items-center justify-center gap-1 rounded-xl bg-[#f5efe6] py-3 text-sm font-extrabold text-maroon transition hover:bg-[#ebe3d6]"
      >
        View All <ChevronRight size={16} aria-hidden />
      </Link>
    </div>
  );
}

function mapSpiritualItems(items = []) {
  const aartis = [];
  const mantras = [];
  const chalisas = [];

  items.forEach((item) => {
    const mapped = {
      slug: item.slug,
      title: item.title,
      deity: item.deity || item.categoryLabel || "Divine",
      duration: item.readTime || "—",
      image: item.image,
      href: getMantraHref(item)
    };
    if (item.category === "aarti" || item.type === "aarti") aartis.push(mapped);
    else if (item.category === "chalisa" || item.type === "chalisa") chalisas.push(mapped);
    else mantras.push(mapped);
  });

  return {
    aartis: aartis.length ? aartis.slice(0, 3) : fallbackAartis,
    mantras: mantras.length ? mantras.slice(0, 3) : fallbackMantras,
    chalisas: chalisas.length ? chalisas.slice(0, 3) : fallbackChalisas
  };
}

export default function DevotionalColumns({ items = [] }) {
  const { aartis, mantras, chalisas } = mapSpiritualItems(items);
  const [playingId, setPlayingId] = useState(null);

  const onToggle = (slug) => setPlayingId((prev) => (prev === slug ? null : slug));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2
        id="devotional-heading"
        className="mb-8 text-center text-2xl font-extrabold text-[#11162b] sm:text-3xl"
      >
        Aarti, Mantra &amp; Chalisa
      </h2>
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.14}>
        <StaggerItem>
          <Column
            title="Popular Aartis"
            items={aartis}
            viewAllHref="/mantras"
            playingId={playingId}
            onToggle={onToggle}
          />
        </StaggerItem>
        <StaggerItem>
          <Column
            title="Powerful Mantras"
            items={mantras}
            viewAllHref="/mantras"
            playingId={playingId}
            onToggle={onToggle}
          />
        </StaggerItem>
        <StaggerItem>
          <Column
            title="Popular Chalisas"
            items={chalisas}
            viewAllHref="/chalisa"
            playingId={playingId}
            onToggle={onToggle}
          />
        </StaggerItem>
      </Stagger>
    </section>
  );
}

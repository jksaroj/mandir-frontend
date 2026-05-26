"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock, Search, TrendingUp, X } from "lucide-react";
import {
  RECENT_SEARCHES_KEY,
  trendingSearches
} from "@/lib/homeContent";

function loadRecent() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch {
    return [];
  }
}

function saveRecent(item) {
  const prev = loadRecent().filter((r) => r.label !== item.label);
  const next = [item, ...prev].slice(0, 3);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  return next;
}

export function HomeSearchInline({ className = "" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = trendingSearches.filter((t) =>
    query.trim() ? t.label.toLowerCase().includes(query.toLowerCase()) : true
  );

  const pick = (item) => {
    saveRecent(item);
    setRecent(loadRecent());
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <label className="sr-only" htmlFor="home-search">
        Search temples, mantras and articles
      </label>
      <div className="flex items-center gap-2 rounded-full border border-[#f1e4d6] bg-white/95 px-4 py-2.5 shadow-sm ring-1 ring-black/5">
        <Search size={18} className="shrink-0 text-[#c48a2a]" aria-hidden />
        <input
          id="home-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search temples, mantras, chalisas..."
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#1f2333] outline-none placeholder:text-slate-400"
          autoComplete="off"
        />
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[#f1e4d6] bg-white shadow-temple">
          {recent.length > 0 && (
            <div className="border-b border-[#f5efe6] px-4 py-3">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                <Clock size={13} /> Recent
              </p>
              <ul className="mt-2 space-y-1">
                {recent.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => pick(item)}
                      className="block rounded-lg px-2 py-2 text-sm font-semibold text-[#351112] hover:bg-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="px-4 py-3">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
              <TrendingUp size={13} /> Trending
            </p>
            <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto">
              {filtered.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => pick(item)}
                    className="block rounded-lg px-2 py-2 text-sm font-semibold text-[#351112] hover:bg-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function HomeSearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (open) {
      setRecent(loadRecent());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const filtered = trendingSearches.filter((t) =>
    query.trim() ? t.label.toLowerCase().includes(query.toLowerCase()) : true
  );

  const pick = (item) => {
    saveRecent(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-cream/98 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="flex items-center gap-3 border-b border-[#f1e4d6] px-4 py-4">
        <Search size={20} className="text-[#c48a2a]" aria-hidden />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search temples, mantras, articles..."
          className="min-w-0 flex-1 bg-transparent text-base font-semibold outline-none"
        />
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-maroon shadow-sm"
          aria-label="Close search"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {recent.length > 0 && !query && (
          <section className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Recent searches</h3>
            <ul className="mt-3 space-y-2">
              {recent.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => pick(item)}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#351112] shadow-sm"
                  >
                    <Clock size={16} className="text-[#c48a2a]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Trending searches</h3>
          <ul className="mt-3 space-y-2">
            {filtered.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => pick(item)}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#351112] shadow-sm"
                >
                  <TrendingUp size={16} className="text-[#c48a2a]" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

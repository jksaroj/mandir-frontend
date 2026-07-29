"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { apiPost } from "@/lib/api";

const endpoints = {
  temple: "/temples",
  mantra: "/mantras",
  chalisa: "/chalisas",
  aarti: "/aartis",
  blog: "/articles"
};

export default function ViewCounter({ type, slug, initialCount = 0, className = "" }) {
  const [count, setCount] = useState(Number(initialCount) || 0);

  useEffect(() => {
    const endpoint = endpoints[type];
    if (!endpoint || !slug) return;
    const storageKey = `viewed:${type}:${slug}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, "1");

    apiPost(`${endpoint}/${encodeURIComponent(slug)}/view`, {}).then((response) => {
      const nextCount = response?.data?.view_count;
      if (Number.isFinite(Number(nextCount))) setCount(Number(nextCount));
    });
  }, [slug, type]);

  const label = `${count.toLocaleString("en-IN")} views`;
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-semibold text-slate-500 ${className}`} title={label} aria-label={label}>
      <Eye size={18} aria-hidden="true" />
      {label}
    </span>
  );
}

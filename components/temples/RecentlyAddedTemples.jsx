import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Flame, Sparkles } from "lucide-react";
import { getTempleHref, temples as staticTemples } from "@/lib/temples";

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  } catch {
    return "";
  }
}

export default function RecentlyAddedTemples({ temples = staticTemples }) {
  // temples are already sorted newest-first from fetchTemples()
  const recent = temples.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Recently Added Temples</h2>
        <Link href="/temples" className="flex items-center gap-1 text-sm font-bold text-[#6b2323]">
          View All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[#f1e7dc] bg-white shadow-sm">
        {recent.map((temple, index) => (
          <Link
            key={temple.slug}
            href={getTempleHref(temple.slug)}
            className="grid gap-4 border-b border-[#f1e7dc] p-4 transition hover:bg-[#fffaf6] last:border-0 md:grid-cols-[2fr_1.3fr_1fr_1fr_auto] md:items-center"
          >
            <div className="flex items-center gap-4">
              <Image
                src={temple.image}
                alt={temple.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-extrabold">{temple.name}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">{temple.city}</p>
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              {index % 2
                ? <Sparkles size={16} className="text-blue-500" />
                : <Flame size={16} className="text-orange-500" />}
              {temple.deity}
            </p>
            <p className="text-sm font-semibold text-slate-500">
              {temple.city?.split(",")[1]?.trim() || ""}
            </p>
            <p className="text-sm font-semibold text-slate-500">
              {formatDate(temple.created_at)}
            </p>
            <span className="rounded-lg border border-[#d9b7a6] px-5 py-2 text-center text-sm font-extrabold text-[#6b2323]">
              View Details
            </span>
          </Link>
        ))}
        {recent.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-400">No temples added yet.</p>
        )}
      </div>
    </section>
  );
}

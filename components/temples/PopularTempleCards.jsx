import Link from "next/link";
import { ChevronRight } from "lucide-react";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import TempleCard from "@/components/temples/TempleCard";
import { temples as staticTemples } from "@/lib/temples";

export default function PopularTempleCards({ temples = staticTemples }) {
  const source = Array.isArray(temples) && temples.length > 0 ? temples : staticTemples;
  const shown = source.slice(0, 5);
  return (
    <section id="temple-results" className="mx-auto max-w-7xl px-4 pb-9 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-[#531b1d]">Popular Temples</h2>
        <Link href="/temples" className="flex items-center gap-1 text-sm font-bold text-[#6b2323]">
          View All Temples <ChevronRight size={16} />
        </Link>
      </div>
      <WaveGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-2">
        {shown.map((temple, index) => (
          <WaveGridItem
            key={temple.slug}
            className={`h-full min-w-0 ${
              index === 0
                ? "sm:row-span-2 lg:[&_article>div:first-child]:h-[350px]"
                : "lg:[&_article>div:first-child]:h-40"
            }`}
          >
            <TempleCard temple={temple} />
          </WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

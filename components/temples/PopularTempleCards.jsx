import Link from "next/link";
import { ChevronRight } from "lucide-react";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import TempleCard from "@/components/temples/TempleCard";
import { temples as staticTemples } from "@/lib/temples";

export default function PopularTempleCards({ temples = staticTemples }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Popular Temples</h2>
        <Link href="/temples" className="flex items-center gap-1 text-sm font-bold text-[#6b2323]">
          View All Temples <ChevronRight size={16} />
        </Link>
      </div>
      <WaveGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {temples.map((temple) => (
          <WaveGridItem key={temple.slug} className="h-full">
            <TempleCard temple={temple} />
          </WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

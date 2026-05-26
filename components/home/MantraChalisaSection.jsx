import Link from "next/link";
import { ChevronRight, Flame, Music2, Sparkles } from "lucide-react";
import AnimatedCard from "@/components/animations/AnimatedCard";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import I18n from "@/components/i18n/I18n";
import { getMantraHref } from "@/lib/mantras";

const iconMap = {
  mantra: Music2,
  chalisa: Flame,
  aarti: Sparkles
};

const colorMap = {
  mantra: "bg-blue-100 text-blue-600",
  chalisa: "bg-red-100 text-red-600",
  aarti: "bg-indigo-100 text-indigo-600"
};

export default function MantraChalisaSection({ items = [] }) {
  const displayItems = items.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <I18n k="home.mantraChalisa" as="h2" className="text-2xl font-extrabold" />
          <div className="flex items-center gap-4 text-sm font-bold text-maroon">
            <Link href="/mantras" className="flex items-center gap-1">
              <I18n k="home.mantrasLink" /> <ChevronRight size={16} />
            </Link>
            <Link href="/chalisa" className="flex items-center gap-1">
              <I18n k="home.chalisasLink" /> <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        <WaveGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {displayItems.map((item) => {
            const Icon = iconMap[item.category] ?? Music2;
            const color = colorMap[item.category] ?? "bg-blue-100 text-blue-600";
            return (
              <WaveGridItem key={item.slug}>
                <Link href={getMantraHref(item)} className="block">
                  <AnimatedCard className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition hover:shadow-md">
                    <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${color}`}>
                      <Icon size={30} />
                    </span>
                    <h3 className="mt-5 block font-extrabold text-[#11162b]">{item.title}</h3>
                    <span className="mt-2 block text-sm font-semibold capitalize text-slate-500">{item.category}</span>
                  </AnimatedCard>
                </Link>
              </WaveGridItem>
            );
          })}
        </WaveGrid>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import AnimatedCard from "@/components/animations/AnimatedCard";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";

const states = [
  ["Tamil Nadu", "2,566 Temples"], ["Uttar Pradesh", "3,124 Temples"], ["Andhra Pradesh", "2,312 Temples"], ["Maharashtra", "2,105 Temples"],
  ["Karnataka", "1,987 Temples"], ["Gujarat", "1,856 Temples"], ["Odisha", "1,734 Temples"], ["Rajasthan", "1,245 Temples"]
];
const image = "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=220&q=80";

export default function TempleByState() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Temples by State</h2>
        <a href="#" className="flex items-center gap-1 text-sm font-bold text-[#6b2323]">View All States <ChevronRight size={16} /></a>
      </div>
      <WaveGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {states.map(([state, count]) => (
          <WaveGridItem key={state}><AnimatedCard as="a" href="#" className="flex items-center gap-4 rounded-2xl border border-[#f1e7dc] bg-white p-4 shadow-sm transition hover:shadow-md">
            <Image src={image} alt={state} width={70} height={70} className="h-[70px] w-[70px] rounded-xl object-cover" />
            <span className="flex-1"><span className="block font-extrabold">{state}</span><span className="mt-1 block text-sm font-semibold text-slate-500">{count}</span></span>
            <ChevronRight size={18} className="text-[#8b3333]" />
          </AnimatedCard></WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

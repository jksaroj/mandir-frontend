import { Flower2, Landmark, Music2, Sparkles, Flame, Shapes } from "lucide-react";
import AnimatedCard from "@/components/animations/AnimatedCard";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";

const categories = [
  { title: "All Temples", count: "20,000+ Temples", icon: Landmark, color: "bg-orange-50 text-orange-500" },
  { title: "Shiva Temples", count: "5,200+ Temples", icon: Music2, color: "bg-blue-50 text-blue-600" },
  { title: "Vishnu Temples", count: "4,800+ Temples", icon: Sparkles, color: "bg-indigo-50 text-indigo-600" },
  { title: "Devi Temples", count: "3,600+ Temples", icon: Flame, color: "bg-red-50 text-red-500" },
  { title: "Ganesh Temples", count: "2,100+ Temples", icon: Flower2, color: "bg-amber-50 text-amber-600" },
  { title: "Other Temples", count: "4,300+ Temples", icon: Shapes, color: "bg-emerald-50 text-emerald-600" }
];

export default function TempleCategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="sr-only">Temple Categories</h2>
      <WaveGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map(({ title, count, icon: Icon, color }) => (
          <WaveGridItem key={title}><AnimatedCard as="a" href="#" className="block rounded-2xl border border-[#f1e7dc] bg-white p-7 text-center shadow-sm transition hover:shadow-md">
            <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${color}`}>
              <Icon size={32} strokeWidth={1.8} />
            </span>
            <h3 className="mt-5 block font-extrabold">{title}</h3>
            <span className="mt-2 block text-sm font-semibold text-slate-500">{count}</span>
          </AnimatedCard></WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

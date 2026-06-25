import { Landmark, UsersRound, HandHeart, Flower2 } from "lucide-react";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import CountUp from "@/components/animations/CountUp";

const stats = [
  { value: "20,000+", label: "Temples Listed", icon: Landmark },
  { value: "50,000+", label: "Poojas Booked", icon: HandHeart },
  { value: "1,00,000+", label: "Happy Devotees", icon: Flower2 },
  { value: "5,000+", label: "Pandits Connected", icon: UsersRound }
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <h2 className="sr-only">brahmatatva Platform Statistics</h2>
      <WaveGrid className="grid gap-4 rounded-2xl bg-[#fff3df] px-8 py-7 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ value, label, icon: Icon }, index) => (
          <WaveGridItem key={label} className={`flex items-center justify-center gap-5 ${index > 0 ? "lg:border-l lg:border-maroon/15" : ""}`}>
            <Icon className="text-[#d77a12]" size={38} strokeWidth={1.6} />
            <div>
              <p className="text-2xl font-extrabold text-maroon">
                <CountUp value={value} />
              </p>
              <p className="text-sm font-bold text-[#11162b]">{label}</p>
            </div>
          </WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

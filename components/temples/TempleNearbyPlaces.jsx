import Image from "next/image";
import AnimatedCard from "@/components/animations/AnimatedCard";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";

export default function TempleNearbyPlaces({ temple }) {
  const places = temple.nearby ?? [];

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Nearby Places to Visit</h2>
        <a href="#" className="text-sm font-extrabold text-[#6b2323]">
          View All
        </a>
      </div>
      <WaveGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {places.map(([name, distance], index) => (
          <WaveGridItem key={name}>
            <AnimatedCard as="article" className="overflow-hidden rounded-2xl border border-[#f1e7dc] bg-white shadow-sm">
              <div className="relative h-28">
                <Image
                  src={temple.images[index % temple.images.length]}
                  alt={name}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-extrabold">{name}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">{distance}</p>
              </div>
            </AnimatedCard>
          </WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

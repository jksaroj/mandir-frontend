import { Clock, IndianRupee } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { resolveImageUrl } from "@/lib/images";

export default function TemplePoojaSeva({ poojas = [] }) {
  if (!poojas.length) return null;

  return (
    <section className="mt-8 rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Pooja & Seva</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {poojas.map((pooja) => (
          <article key={pooja.id ?? pooja.slug ?? pooja.name} className="overflow-hidden rounded-xl border border-[#f1e7dc] bg-[#fffaf6]">
            <div className="relative h-32">
              <OptimizedImage
                src={resolveImageUrl(pooja.cover_image, "")}
                alt={pooja.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-extrabold text-[#351112]">{pooja.name}</h3>
              {pooja.short_description ? (
                <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-slate-600">{pooja.short_description}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
                {pooja.duration_label ? (
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} /> {pooja.duration_label}
                  </span>
                ) : null}
                {pooja.price ? (
                  <span className="inline-flex items-center gap-1">
                    <IndianRupee size={14} /> {pooja.price}
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

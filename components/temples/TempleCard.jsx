import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { IMAGE_SIZES, templeImageAlt } from "@/lib/images";
import { getTempleHref } from "@/lib/temples";

export default function TempleCard({ temple, variant = "listing" }) {
  const href = getTempleHref(temple.slug);
  const isHome = variant === "home";

  return (
    <Link href={href} className="block h-full cursor-pointer" aria-label={`View details for ${temple.name}`}>
      <article
        className={`group card-lift h-full overflow-hidden active:scale-[0.98] ${
          isHome
            ? "rounded-xl bg-white shadow-md"
            : "rounded-2xl border border-[#f1e7dc] bg-white shadow-sm"
        }`}
      >
        <div className="relative h-40 overflow-hidden">
          <OptimizedImage
            src={temple.image}
            alt={templeImageAlt(temple.name, { context: "hero" })}
            fill
            sizes={IMAGE_SIZES.card}
            className="img-zoom object-cover"
            quality={80}
          />
          <span
            className={`absolute right-3 top-3 bg-white text-slate-700 shadow ${
              isHome ? "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold" : "rounded-md px-3 py-1 text-xs font-extrabold"
            }`}
          >
            {isHome ? (
              <>
                <MapPin size={12} /> {temple.badge}
              </>
            ) : (
              temple.badge
            )}
          </span>
        </div>
        <div className="p-4">
          <h3 className={`font-extrabold ${isHome ? "text-base text-[#11162b]" : ""}`}>{temple.name}</h3>
          <p className={`mt-2 text-sm font-semibold text-slate-500 ${isHome ? "mt-1 font-medium" : ""}`}>{temple.city}</p>
          {!isHome && (
            <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-600">
              <MapPin size={13} className="text-[#6b2323]" /> {temple.deity}
            </p>
          )}
          <div className={`flex items-center gap-1 ${isHome ? "mt-4" : "mt-4"}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={isHome ? 15 : 14} className="fill-[#f7b313] text-[#f7b313]" />
            ))}
            <span className="ml-1 text-xs font-bold text-slate-600">
              {isHome ? temple.rating : `${temple.rating} (${temple.reviewCount})`}
            </span>
          </div>
          {!isHome && (
            <span className="mt-5 block rounded-lg border border-[#9b5252] py-2.5 text-center text-sm font-extrabold text-[#6b2323]">
              View Details
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}

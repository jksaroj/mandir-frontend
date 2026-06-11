import Link from "next/link";
import { MapPin } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { IMAGE_SIZES, templeImageAlt } from "@/lib/images";
import { getTempleHref } from "@/lib/temples";

function bhagwanFromDeity(deity = "") {
  const d = deity.toLowerCase();
  if (d.includes("shiva")) return "Shiva";
  if (d.includes("hanuman")) return "Hanuman";
  if (d.includes("ram")) return "Ram";
  if (d.includes("krishna") || d.includes("vishnu") || d.includes("venkateswara")) return "Krishna";
  if (d.includes("devi") || d.includes("goddess") || d.includes("lakshmi") || d.includes("durga")) return "Devi";
  return "Divine";
}

export default function HomeTempleCard({ temple }) {
  const href = getTempleHref(temple.slug);
  const tag = bhagwanFromDeity(temple.deity);
  const excerpt =
    temple.excerpt ||
    `Visit ${temple.name} for darshan, aarti timings and spiritual guidance.`;

  return (
    <article className="group card-lift flex h-full w-[min(100%,280px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#f1e7dc] bg-white shadow-sm sm:w-[260px] lg:w-[calc((100%-5*1.25rem)/5)] lg:min-w-[200px] lg:max-w-[240px]">
      <Link href={href} className="block">
        <div className="relative h-44 overflow-hidden">
          <OptimizedImage
            src={temple.image}
            alt={templeImageAlt(temple.name, { context: "card" })}
            fill
            sizes={IMAGE_SIZES.card}
            className="img-zoom object-cover"
            quality={80}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-extrabold text-[#b86b12] shadow-sm">
            {tag}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-extrabold leading-snug text-[#11162b]">
          <Link href={href} className="hover:text-maroon">
            {temple.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-slate-500">
          <MapPin size={14} className="shrink-0 text-[#c48a2a]" aria-hidden />
          {temple.city}
        </p>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{excerpt}</p>
        <Link
          href={href}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-maroon/30 py-2.5 text-sm font-extrabold text-maroon transition hover:bg-maroon hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

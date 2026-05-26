import { Accessibility, Bed, Droplets, HeartPulse, Luggage, ShieldCheck, Soup, Utensils, CircleDot } from "lucide-react";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";

const iconByTitle = {
  "Free Accommodation": Bed,
  "Free Meals": Utensils,
  "Cloak Room": Luggage,
  "Laddu Prasadam": Soup,
  "Prasadam Counter": Soup,
  "Drinking Water": Droplets,
  Wheelchair: Accessibility,
  Medical: HeartPulse,
  Security: ShieldCheck,
};

const defaultFacilities = [
  ["Free Accommodation", "for devotees", Bed],
  ["Free Meals", "(Annaprasadam)", Utensils],
  ["Cloak Room", "Facility", Luggage],
  ["Laddu Prasadam", "Sales", Soup],
  ["Drinking Water", "Available", Droplets],
  ["Wheelchair", "Facility", Accessibility],
  ["Medical", "Services", HeartPulse],
  ["Security", "24/7", ShieldCheck],
];

function normalizeList(facilities) {
  if (!facilities?.length) return defaultFacilities;
  return facilities.map((item) => {
    if (Array.isArray(item)) {
      const [title, text] = item;
      return [title, text, iconByTitle[title] || CircleDot];
    }
    const title = item.title ?? item.name ?? "Facility";
    const text = item.subtitle ?? item.text ?? "";
    return [title, text, iconByTitle[title] || CircleDot];
  });
}

export default function TempleFacilities({ facilities }) {
  const list = normalizeList(facilities);

  return (
    <section className="mt-8 rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
      <h2 className="text-xl font-extrabold">Temple Facilities</h2>
      <WaveGrid className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map(([title, text, Icon]) => (
          <WaveGridItem key={title} className="flex gap-3 rounded-xl p-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff1df] text-[#9b5252]">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-sm font-extrabold">{title}</p>
              <p className="text-xs font-semibold text-slate-500">{text}</p>
            </div>
          </WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}

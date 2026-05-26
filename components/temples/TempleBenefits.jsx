import { CalendarCheck, Gem, Landmark } from "lucide-react";

const benefits = [
  ["Ancient Heritage", "Explore temples with thousands of years of divine history and architectural beauty.", Landmark],
  ["Divine Blessings", "Visit sacred temples and receive blessings for peace, prosperity and well-being.", Gem],
  ["Plan Your Visit", "Check timings, rituals and plan your temple visit with ease.", CalendarCheck]
];

export default function TempleBenefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <h2 className="sr-only">Benefits of Using Sri Devasthanam Temple Directory</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map(([title, text, Icon]) => (
          <div key={title} className="flex gap-5 rounded-2xl border border-[#f1e7dc] bg-[#fff4e6] p-6 shadow-sm">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#8b3333]/15 text-[#8b3333]"><Icon size={27} /></span>
            <div><h3 className="font-extrabold">{title}</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-600">{text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

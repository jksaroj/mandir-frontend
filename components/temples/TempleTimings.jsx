import { CalendarDays, Landmark, TrainFront } from "lucide-react";

const infoIcons = [CalendarDays, Landmark, CalendarDays, Landmark, CalendarDays, TrainFront];

export default function TempleTimings({ temple }) {
  const { about } = temple;
  const info = about.info ?? [];
  const darshanTimings = about.darshanTimings ?? [];

  return (
    <section className="mt-8 grid gap-7 lg:grid-cols-[1.55fr_1fr]">
      <div className="rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
        <h2 className="text-xl font-extrabold">About {temple.name}</h2>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-5 text-sm font-medium leading-7 text-slate-600">
            {paragraph}
          </p>
        ))}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {info.map(([label, value], index) => {
            const Icon = infoIcons[index] ?? Landmark;
            return (
              <div key={label} className="flex gap-3 rounded-xl border border-[#f1e7dc] bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff1df] text-[#d89b2b]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-extrabold">{value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <aside className="rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
        <h2 className="text-xl font-extrabold">Darshan Timings</h2>
        <div className="mt-5 space-y-4">
          {darshanTimings.map(([label, time]) => (
            <div key={label} className="flex items-center justify-between gap-4 text-sm">
              <span className="font-extrabold">{label}</span>
              <span className="font-semibold text-slate-500">{time}</span>
            </div>
          ))}
        </div>
        <button type="button" className="mt-7 w-full rounded-lg bg-[#f7eee6] py-3 text-sm font-extrabold text-[#6b2323]">
          View All Timings
        </button>
      </aside>
    </section>
  );
}

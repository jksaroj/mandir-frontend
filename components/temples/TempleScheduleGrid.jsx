import { CalendarDays } from "lucide-react";

/** Format HH:MM or HH:MM:SS to 12-hour display */
export function formatTime12(t) {
  if (!t) return "";
  const part = String(t).slice(0, 5);
  const [h, m] = part.split(":").map(Number);
  if (Number.isNaN(h)) return String(t);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
}

export function timingRange(start, end) {
  if (!start) return "—";
  const a = formatTime12(start);
  const b = end ? formatTime12(end) : "";
  return b ? `${a} - ${b}` : a;
}

export default function TempleScheduleGrid({ scheduleTimings = [] }) {
  if (!scheduleTimings.length) return null;

  return (
    <section className="mt-8 rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
      <h2 className="text-xl font-extrabold">Temple Timings</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {scheduleTimings.map((item) => (
          <div
            key={item.name}
            className="flex gap-3 rounded-xl border border-[#f1e7dc] bg-white p-4 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1df] text-[#d89b2b]">
              <CalendarDays size={18} />
            </span>
            <div>
              <p className="text-sm font-extrabold text-slate-800">{item.name}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {item.display || timingRange(item.start, item.end)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

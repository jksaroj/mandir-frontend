import { Clock3, IndianRupee, Shirt, Camera, UserRound } from "lucide-react";
import { timingRange } from "@/components/temples/TempleScheduleGrid";

export default function TempleVisitPanel({ temple }) {
  const schedule = temple.scheduleTimings?.slice(0, 4) ?? [];
  return (
    <aside className="mt-8 rounded-xl border border-[#eadfd5] bg-white p-5 shadow-[0_4px_18px_rgba(90,36,24,.05)]">
      <h2 className="font-serif text-xl font-bold text-[#682326]">Plan Your Visit</h2>
      <div className="mt-4 rounded-lg border border-[#eee2d9] p-3">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-2 font-bold text-[#543a35]"><Clock3 size={15} className="text-[#d69a43]" /> Today&apos;s Darshan</span>
          <span className="rounded bg-[#eaf8ea] px-2 py-1 text-[10px] font-bold text-green-700">Open</span>
        </div>
        {temple.templeTimings && <p className="mt-2 text-right text-[11px] font-semibold text-slate-500">{temple.templeTimings}</p>}
      </div>
      {schedule.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-extrabold text-[#6b2323]">Aarti Schedule (Today)</p>
          <div className="space-y-1">
            {schedule.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3 border-b border-[#f4ece6] py-2 text-[11px]">
                <span className="flex items-center gap-2 font-semibold"><Clock3 size={13} className="text-[#d69a43]" />{item.name}</span>
                <span className="whitespace-nowrap text-slate-500">{item.display || timingRange(item.start, item.end)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 divide-y divide-[#f0e7e0] rounded-lg border border-[#eee2d9] px-3 text-[11px]">
        {[
          [UserRound, "Entry Fee", "Free for all devotees"],
          [IndianRupee, "Best Time to Visit", "Early morning"],
          [Shirt, "Dress Code", "Traditional & decent"],
          [Camera, "Photography", "As per temple rules"],
        ].map(([Icon, label, value]) => (
          <div key={label} className="grid grid-cols-[18px_1fr_1.35fr] items-center gap-2 py-3">
            <Icon size={14} className="text-[#d69a43]" />
            <span className="font-bold">{label}</span>
            <span className="text-slate-500">{value}</span>
          </div>
        ))}
      </div>
      <a href="#darshan-timings" className="mt-5 block rounded-md bg-[#7a2224] py-3 text-center text-xs font-bold text-white">
        View Full Timings & Rules
      </a>
    </aside>
  );
}

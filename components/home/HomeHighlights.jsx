import Image from "next/image";
import { MapPin, Play, ChevronRight } from "lucide-react";

const festivals = [
  { name: "Rath Yatra", place: "Puri, Odisha", day: "07", month: "JUN", image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=300&q=80" },
  { name: "Mahashivratri", place: "All India", day: "26", month: "FEB", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=300&q=80" },
  { name: "Navratri", place: "All India", day: "03", month: "OCT", image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=300&q=80" }
];

const poojas = [
  { name: "Rudrabhishek", text: "Get blessings for peace and prosperity", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=300&q=80" },
  { name: "Griha Shanti Pooja", text: "Remove negativity and bring harmony", image: "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=300&q=80" },
  { name: "Sahasranama Archana", text: "Special archana for your well-being", image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=300&q=80" }
];

export default function HomeHighlights() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div className="rounded-2xl bg-white p-5 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Upcoming Festivals</h2>
          <a href="#" className="flex items-center gap-1 text-xs font-bold text-maroon">View All <ChevronRight size={14} /></a>
        </div>
        <div className="space-y-4">
          {festivals.map((item) => (
            <div key={item.name} className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0">
              <Image src={item.image} alt={item.name} width={90} height={78} className="h-[78px] w-[90px] rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-maroon">{item.name}</h3>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin size={13} /> {item.place}</p>
              </div>
              <div className="rounded-xl bg-cream px-4 py-3 text-center font-extrabold text-maroon">
                <span className="block text-xl">{item.day}</span>
                <span className="text-xs">{item.month}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-lg bg-[#f4eee8] py-3 text-sm font-extrabold text-maroon">View All Festivals</button>
      </div>

      <div className="rounded-2xl bg-white p-7 shadow-md">
        <h2 className="text-xl font-extrabold">Daily Mantra</h2>
        <div className="mt-12 flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-6xl font-bold text-gold">ॐ</div>
          <div className="flex-1">
            <h3 className="font-extrabold">Om Namah Shivaya</h3>
            <p className="font-semibold text-maroon">ॐ नमः शिवाय</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">The five syllables of this mantra represent the five elements and Lord Shiva himself.</p>
          </div>
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md"><Play size={21} fill="currentColor" /></button>
        </div>
        <div className="mt-16 flex justify-center gap-3">
          {[0, 1, 2, 3, 4, 5].map((dot) => (
            <span key={dot} className={`h-2 w-2 rounded-full ${dot === 0 ? "bg-indigo-600" : "bg-indigo-200"}`} />
          ))}
        </div>
        <button className="mt-14 w-full rounded-lg bg-[#f4eee8] py-3 text-sm font-extrabold text-maroon">Explore Mantras</button>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Seva & Pooja Booking</h2>
          <a href="#" className="flex items-center gap-1 text-xs font-bold text-maroon">View All <ChevronRight size={14} /></a>
        </div>
        <div className="space-y-4">
          {poojas.map((item) => (
            <div key={item.name} className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0">
              <Image src={item.image} alt={item.name} width={82} height={72} className="h-[72px] w-[82px] rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-extrabold text-[#11162b]">{item.name}</h3>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{item.text}</p>
              </div>
              <button className="rounded-lg bg-[#f4eee8] px-4 py-2 text-xs font-extrabold text-maroon">Book Now</button>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-lg bg-[#f4eee8] py-3 text-sm font-extrabold text-maroon">View All Poojas</button>
      </div>
    </section>
  );
}

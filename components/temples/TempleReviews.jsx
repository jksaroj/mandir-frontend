import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  ["Ramesh Kumar", "May 15, 2025", "Very peaceful and divine experience. The arrangements were excellent.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"],
  ["Priya Sharma", "May 10, 2025", "Darshan was smooth and well organized. A memorable spiritual visit!", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"],
  ["Anil Verma", "May 06, 2025", "A spiritual journey like no other. Will visit again.", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"]
];

const bars = [
  ["5", "9.8K", "w-[92%]"],
  ["4", "2.1K", "w-[34%]"],
  ["3", "420", "w-[16%]"],
  ["2", "120", "w-[8%]"],
  ["1", "80", "w-[5%]"]
];

export default function TempleReviews({ temple }) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Devotee Reviews</h2>
        <a href="#" className="text-sm font-extrabold text-[#6b2323]">
          View All Reviews ›
        </a>
      </div>
      <div className="grid gap-7 lg:grid-cols-[1.05fr_2fr]">
        <div className="rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr] sm:items-center">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-[#6b2323]">{temple.rating}</p>
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-[#f7b313] text-[#f7b313]" />
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-500">Based on {temple.reviewCount} reviews</p>
            </div>
            <div className="space-y-3">
              {bars.map(([label, count, width]) => (
                <div key={label} className="grid grid-cols-[24px_1fr_44px] items-center gap-3 text-xs font-bold text-slate-600">
                  <span>{label} ★</span>
                  <span className="h-2 rounded-full bg-[#f4e4d4]">
                    <span className={`block h-2 rounded-full bg-[#f7b313] ${width}`} />
                  </span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map(([name, date, text, image]) => (
            <article key={name} className="rounded-2xl border border-[#f1e7dc] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Image src={image} alt={name} width={46} height={46} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <h3 className="font-extrabold">{name}</h3>
                  <p className="text-xs font-semibold text-slate-500">{date}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[#f7b313] text-[#f7b313]" />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

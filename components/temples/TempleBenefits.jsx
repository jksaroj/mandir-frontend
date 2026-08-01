import { Clock3, Compass, Languages, ShieldCheck } from "lucide-react";

const benefits = [
  ["Verified Temple Information", "Authentic details from trusted sources", ShieldCheck],
  ["Darshan & Aarti Timings", "Accurate timings for your visit", Clock3],
  ["Travel Guidance", "Routes, stay and travel tips", Compass],
  ["Bilingual Content", "English & Hindi information", Languages],
];

export default function TempleBenefits() {
  return <section className="mx-auto max-w-7xl px-4 pb-9 sm:px-6 lg:px-8"><div className="grid overflow-hidden rounded-xl border border-[#e5cda9] bg-white md:grid-cols-4">{benefits.map(([title,text,Icon],i)=><div key={title} className={`flex items-center gap-4 p-5 ${i?"md:border-l md:border-[#ead8c6]":""}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d99a2d] text-white"><Icon size={21}/></span><div><h3 className="text-xs font-extrabold">{title}</h3><p className="mt-1 text-[10px] text-slate-500">{text}</p></div></div>)}</div></section>;
}

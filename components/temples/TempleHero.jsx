import Image from "next/image";
import Link from "next/link";

const fallbackImage = "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=1800&q=85";

export default function TempleHero({ banners = [] }) {
  const image = banners[0]?.image || fallbackImage;
  return <section className="relative h-[430px] overflow-hidden bg-[#07162a] text-white">
    <Image src={image} alt="Sacred temples of India" fill priority sizes="100vw" className="object-cover object-center" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/80 to-transparent" />
    <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8"><div className="max-w-xl">
      <div className="mb-7 flex gap-3 text-xs font-bold"><Link href="/">Home</Link><span>›</span><span>Temples</span></div>
      <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#d8aa48]">— Temple Directory —</p>
      <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.05] sm:text-6xl">Discover Sacred<br/><span className="text-[#efbd58]">Temples of India</span></h1>
      <p className="mt-5 max-w-md text-sm leading-7 text-white/85">Explore ancient temples, darshan timings, history, festivals and travel information.</p>
      <div className="mt-6 flex gap-3"><a href="#temple-results" className="rounded-md bg-[#efbd58] px-6 py-3 text-xs font-bold text-[#3b2014]">Explore Temples &nbsp; →</a><a href="#states" className="rounded-md border border-[#d2a545] px-6 py-3 text-xs font-bold text-[#efbd58]">Plan Your Visit &nbsp; ▣</a></div>
    </div></div>
  </section>;
}

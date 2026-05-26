import Image from "next/image";
import Link from "next/link";
import { Landmark, Play } from "lucide-react";
import FadeUp from "@/components/animations/FadeUp";

const collageImages = [
  {
    src: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=500&q=80",
    alt: "Golden temple sunrise darshan"
  },
  {
    src: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=400&q=80",
    alt: "Shiva lingam and temple lamps"
  },
  {
    src: "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=400&q=80",
    alt: "Devotional flowers and diya"
  }
];

export default function HeroSection() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-[#fff9f0] via-[#fff4e6] to-[#fde8d4]"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ffc65e]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#d89b2b]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <FadeUp>
            <p className="text-sm font-bold tracking-wide text-[#c48a2a]">|| Har Har Mahadev ||</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              id="home-hero-heading"
              className="mt-4 font-serif text-4xl font-bold leading-[1.1] text-[#351112] sm:text-5xl lg:text-[3.25rem]"
            >
              Discover Sacred Temples, Mantras &amp; Bhakti — All in One Place
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Sri Devasthanam connects devotees with famous temples across India, powerful mantras,
              chalisas, spiritual reels, and upcoming festivals — guided by devotion and trust.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/temples"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8b3a3a] to-[#5b1f1f] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-maroon/25 transition hover:opacity-95"
              >
                <Landmark size={18} aria-hidden />
                Explore Temples
              </Link>
              <Link
                href="#reels"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e8d4b8] bg-white px-7 py-3.5 text-sm font-bold text-[#5b1f1f] shadow-sm transition hover:bg-[#fffaf5]"
              >
                <Play size={18} aria-hidden />
                Watch Spiritual Reels
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl shadow-temple ring-1 ring-white/80">
              <Image
                src={collageImages[0].src}
                alt={collageImages[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#351112]/30 to-transparent" />
            </div>
            {collageImages.slice(1).map((img) => (
              <div
                key={img.alt}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-md ring-1 ring-white/80"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute -bottom-3 -left-3 rounded-2xl border border-[#f1e4d6] bg-white/95 px-4 py-3 shadow-temple backdrop-blur-sm">
            <p className="text-xs font-bold text-slate-500">Trusted by devotees</p>
            <p className="text-lg font-extrabold text-[#351112]">500+ Temples</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import FloatingDivine from "@/components/animations/FloatingDivine";
import I18n from "@/components/i18n/I18n";
import I18nWaveText from "@/components/i18n/I18nWaveText";

const heroImage = "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=1800&q=80";

export default function TempleHero() {
  return (
    <section className="soft-glow relative h-[380px] overflow-hidden">
      <Image src={heroImage} alt="Temple landscape" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff0d6]/95 via-[#fff3dd]/55 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-2 text-sm font-bold text-[#7b2929]">
            <I18n k="common.home" />
            <span>›</span>
            <I18n k="nav.temples" />
          </div>
          <I18nWaveText k="temples.title" className="block font-serif text-6xl font-bold text-[#5b1f1f]" />
          <FadeUp delay={0.16}>
            <I18n
              k="temples.heroSubtitle"
              as="p"
              className="mt-5 text-lg font-medium leading-8 text-[#2d2530]"
            />
          </FadeUp>
          <FloatingDivine>
            <Link
              href="/temples/sri-venkateswara-temple"
              className="mt-7 inline-flex rounded-lg bg-[#6b2323] px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#5b1f1f]"
            >
              <I18n k="temples.exploreDetails" />
            </Link>
          </FloatingDivine>
          <div className="mt-7 h-px w-28 bg-[#d89b2b]" />
        </div>
      </div>
    </section>
  );
}

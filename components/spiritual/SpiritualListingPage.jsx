import Image from "next/image";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnimatedCard from "@/components/animations/AnimatedCard";
import FadeUp from "@/components/animations/FadeUp";
import FloatingDivine from "@/components/animations/FloatingDivine";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import I18n from "@/components/i18n/I18n";
import I18nWaveText from "@/components/i18n/I18nWaveText";
import { getMessage } from "@/lib/i18n/getMessage";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { BookOpen, Clock, Music2, Play, Search, Share2, Star } from "lucide-react";
import { fetchSpiritualItems, getMantraHref } from "@/lib/mantras";

const heroImage = "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=1200&q=80";

const configs = {
  mantra: {
    activeKey: "mantra",
    heroTitle: "spiritual.mantra.heroTitle",
    heroText: "spiritual.mantra.heroText",
    searchPlaceholder: "spiritual.searchMantras",
    categoryKeys: [
      "spiritual.mantra.categories.vedic",
      "spiritual.mantra.categories.shiva",
      "spiritual.mantra.categories.vishnu",
      "spiritual.mantra.categories.devi",
      "spiritual.mantra.categories.ganesh",
      "spiritual.mantra.categories.hanuman",
      "spiritual.mantra.categories.other"
    ],
    listTitle: "spiritual.mantra.listTitle",
    sidebarDaily: "spiritual.mantra.daily",
    sidebarBenefits: "spiritual.mantra.benefitsTitle",
    emptyKey: "common.emptyMantras",
    defaultTitle: "spiritual.defaultMantraTitle"
  },
  chalisa: {
    activeKey: "chalisa",
    heroTitle: "spiritual.chalisa.heroTitle",
    heroText: "spiritual.chalisa.heroText",
    searchPlaceholder: "spiritual.searchChalisas",
    categoryKeys: [
      "spiritual.chalisa.categories.hanuman",
      "spiritual.chalisa.categories.ram",
      "spiritual.chalisa.categories.durga",
      "spiritual.chalisa.categories.shiva",
      "spiritual.chalisa.categories.lakshmi",
      "spiritual.chalisa.categories.saraswati",
      "spiritual.chalisa.categories.other"
    ],
    listTitle: "spiritual.chalisa.listTitle",
    sidebarDaily: "spiritual.chalisa.daily",
    sidebarBenefits: "spiritual.chalisa.benefitsTitle",
    emptyKey: "common.emptyChalisas",
    defaultTitle: "spiritual.defaultChalisaTitle"
  }
};

const benefitKeys = [
  "common.benefitsList.calmMind",
  "common.benefitsList.focus",
  "common.benefitsList.discipline",
  "common.benefitsList.positiveEnergy"
];

export default async function SpiritualListingPage({ variant }) {
  const config = configs[variant];
  const items = await fetchSpiritualItems({ type: variant });
  const featured = items[0];
  const searchPlaceholder = getMessage(DEFAULT_LOCALE, config.searchPlaceholder);

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <Header active={config.activeKey} />
      <section className="relative overflow-hidden bg-[#fff2df]">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Image src={heroImage} alt="Spiritual book and diya" fill priority sizes="50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff2df] via-[#fff2df]/50 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <I18nWaveText
              k={config.heroTitle}
              className="block font-serif text-5xl font-bold leading-tight text-[#5b1f1f] md:text-6xl"
            />
            <FadeUp delay={0.16}>
              <I18n k={config.heroText} as="p" className="mt-5 text-lg font-medium leading-8 text-slate-700" />
            </FadeUp>
            <form className="mt-8 flex max-w-xl overflow-hidden rounded-xl border border-[#eadfd3] bg-white shadow-sm">
              <label className="flex min-w-0 flex-1 items-center gap-3 px-4">
                <Search size={18} className="text-[#9b5252]" />
                <input
                  className="min-w-0 flex-1 py-4 text-sm font-semibold outline-none"
                  placeholder={searchPlaceholder}
                  data-i18n-placeholder={config.searchPlaceholder}
                />
              </label>
              <button type="submit" className="bg-[#6b2323] px-7 text-sm font-extrabold text-white">
                <I18n k="common.search" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="sr-only">
          <I18n k={variant === "mantra" ? "nav.mantra" : "nav.chalisa"} />
        </h2>
        <WaveGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-7">
          {config.categoryKeys.map((categoryKey, index) => (
            <WaveGridItem key={categoryKey}>
              <Link
                href={items[index] ? getMantraHref(items[index]) : `/${variant === "mantra" ? "mantras" : "chalisa"}`}
                className="block"
              >
                <AnimatedCard className="rounded-2xl border border-[#f1e4d6] bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2df] text-[#d9a441]">
                    {variant === "chalisa" ? <BookOpen size={26} /> : <Music2 size={26} />}
                  </span>
                  <I18n k={categoryKey} as="h3" className="mt-4 block text-sm font-extrabold" />
                </AnimatedCard>
              </Link>
            </WaveGridItem>
          ))}
        </WaveGrid>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <I18n k={config.listTitle} as="h2" className="mb-6 text-2xl font-extrabold" />
          {items.length === 0 ? (
            <I18n
              k={config.emptyKey}
              as="p"
              className="rounded-2xl border border-[#f1e4d6] bg-white p-8 text-center text-sm font-semibold text-slate-500"
            />
          ) : variant === "mantra" ? (
            <div className="space-y-5">
              {items.map((item) => (
                <FadeUp key={item.slug}>
                  <article className="grid gap-5 rounded-2xl border border-[#f1e4d6] bg-white p-5 shadow-sm md:grid-cols-[110px_1fr_auto] md:items-center">
                    <Image src={item.image} alt={item.title} width={110} height={100} className="h-[100px] w-[110px] rounded-xl object-cover" />
                    <div>
                      <Link href={getMantraHref(item)} className="text-xl font-extrabold text-[#351112]">
                        {item.title}
                      </Link>
                      <p className="mt-1 font-bold text-[#9b5252]">{item.transliteration || item.originalText}</p>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:flex-col">
                      <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6b2323] text-white">
                        <Play size={18} fill="currentColor" />
                      </button>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                        <Clock size={14} /> {item.readTime}
                      </span>
                      <Link href={getMantraHref(item)} className="rounded-lg border border-[#9b5252] px-4 py-2 text-xs font-extrabold text-[#6b2323]">
                        <I18n k="common.lyrics" />
                      </Link>
                      <button type="button" className="rounded-lg bg-[#fff2df] px-4 py-2 text-xs font-extrabold text-[#6b2323]">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          ) : (
            <WaveGrid className="grid gap-5 sm:grid-cols-2">
              {items.map((item) => (
                <WaveGridItem key={item.slug}>
                  <Link href={getMantraHref(item)} className="block">
                    <AnimatedCard className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm transition hover:shadow-md">
                      <Image src={item.image} alt={item.title} width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
                      <h3 className="mt-5 font-extrabold">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        {item.excerpt ? item.excerpt : <I18n k="common.readLyricsMeaning" />}
                      </p>
                    </AnimatedCard>
                  </Link>
                </WaveGridItem>
              ))}
            </WaveGrid>
          )}
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
            <I18n k={config.sidebarDaily} as="h3" className="text-xl font-extrabold" />
            <FloatingDivine className="mt-6 rounded-2xl bg-[#fff2df] p-6 text-center">
              <p className="text-6xl font-bold text-[#d9a441]">ॐ</p>
              <h4 className="mt-4 font-extrabold">
                {featured?.title ? featured.title : <I18n k={config.defaultTitle} />}
              </h4>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {featured?.excerpt ? featured.excerpt : <I18n k="common.chantWithDevotion" />}
              </p>
            </FloatingDivine>
          </div>
          <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
            <I18n k={config.sidebarBenefits} as="h3" className="text-xl font-extrabold" />
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
              {benefitKeys.map((key) => (
                <li key={key} className="flex gap-2">
                  <Star size={16} className="fill-[#f7b313] text-[#f7b313]" />
                  <I18n k={key} />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

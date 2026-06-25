import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FloatingDivine from "@/components/animations/FloatingDivine";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import WaveText from "@/components/animations/WaveText";
import I18n from "@/components/i18n/I18n";
import SimpleSlider from "@/components/ui/SimpleSlider";
import ShareButton from "@/components/ui/ShareButton";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getMessage } from "@/lib/i18n/getMessage";
import { absoluteUrl, buildMetadata, faqSchema, seoKeywords } from "@/lib/seo";
import {
  fetchSpiritualItemBySlug,
  getMantraHref,
  getSpiritualListHref
} from "@/lib/mantras";
import { BookOpen, Clock, Download, Languages, Play, Repeat, Sparkles, Star } from "lucide-react";

const fallbackImage = "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80";

const navConfig = {
  mantra: { activeKey: "mantra", listKey: "nav.mantra", relatedKey: "common.relatedMantras", exploreKey: "common.exploreMoreMantras" },
  chalisa: { activeKey: "chalisa", listKey: "nav.chalisa", relatedKey: "common.relatedChalisas", exploreKey: "common.exploreMoreChalisas" }
};

const defaultBenefitKeys = [
  "common.defaultBenefits.peace",
  "common.defaultBenefits.focus",
  "common.defaultBenefits.devotion"
];

function buildFaqs(item) {
  return [
    {
      question: `What is ${item.title}?`,
      answer: item.excerpt || `${item.title} is a devotional ${item.type || "spiritual"} item for daily practice.`
    },
    {
      question: `How should ${item.title} be chanted?`,
      answer: item.howToChant || getMessage(DEFAULT_LOCALE, "common.defaultHowToChant")
    },
    {
      question: "What is the best time to chant?",
      answer: item.notes || getMessage(DEFAULT_LOCALE, "common.defaultWhenToChant")
    }
  ];
}

export async function generateSpiritualMetadata({ params, variant }) {
  const { slug } = await params;
  const item = await fetchSpiritualItemBySlug(slug, variant);

  if (!item) {
    return buildMetadata({
      title: `${getMessage(DEFAULT_LOCALE, navConfig[variant].listKey)} Not Found`,
      description: "The requested devotional content could not be found on BrahmaTatva.",
      path: `/${variant === "chalisa" ? "chalisa" : "mantras"}/${slug}`,
      keywords: ["BrahmaTatva", variant]
    });
  }

  const path = `/${variant === "chalisa" ? "chalisa" : "mantras"}/${slug}`;
  return buildMetadata({
    title: item.title,
    description: item.excerpt || `${item.title} lyrics, meaning, benefits, chanting method and timing.`,
    path,
    image: item.image || fallbackImage,
    type: "article",
    keywords: seoKeywords(
      item.title,
      item.deity,
      item.type,
      "lyrics",
      "meaning",
      "benefits",
      "chanting",
      variant === "chalisa" ? "chalisa" : "mantra"
    )
  });
}

export default async function SpiritualDetailPage({ params, variant }) {
  const { slug } = await params;
  const item = await fetchSpiritualItemBySlug(slug, variant);

  if (!item) {
    notFound();
  }

  if (item.type !== variant) {
    redirect(getMantraHref(item));
  }

  const config = navConfig[variant];
  const listHref = getSpiritualListHref(variant);
  const pageHref = `${listHref}/${slug}`;
  const image = item.image || fallbackImage;
  const faqs = buildFaqs(item);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: getMessage(DEFAULT_LOCALE, config.listKey), href: listHref },
    { name: item.title, href: pageHref }
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    image,
    url: absoluteUrl(pageHref),
    inLanguage: ["hi-IN", "en-IN"],
    author: { "@type": "Organization", name: "BrahmaTatva" },
    publisher: {
      "@type": "Organization",
      name: "BrahmaTatva",
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/BrahmaTatvaLogo.png") }
    },
    mainEntityOfPage: absoluteUrl(pageHref)
  };
  const audioSchema = item.audioUrl
    ? {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        name: item.title,
        description: item.excerpt,
        contentUrl: item.audioUrl,
        thumbnailUrl: image,
        encodingFormat: "audio/mpeg"
      }
    : null;
  const hasBenefits = item.benefits?.length > 0;
  const relatedSlides =
    item.related?.length > 0
      ? item.related.map((r) => ({ title: r.title, href: getMantraHref(r) }))
      : [{ title: getMessage(DEFAULT_LOCALE, config.exploreKey), href: listHref }];

  const info = [
    ["common.duration", item.readTime || getMessage(DEFAULT_LOCALE, "common.daily"), Clock],
    ["common.chantCount", getMessage(DEFAULT_LOCALE, "common.times108"), Repeat],
    ["common.language", item.originalText ? getMessage(DEFAULT_LOCALE, "common.sanskrit") : getMessage(DEFAULT_LOCALE, "common.devotional"), Languages],
    ["common.category", item.categoryLabel || item.type, BookOpen]
  ];
  const details = [
    ["common.type", item.type],
    ["common.deity", item.deity || getMessage(DEFAULT_LOCALE, "common.devotional")],
    ["common.readTime", item.readTime || getMessage(DEFAULT_LOCALE, "common.daily")],
    ["common.usage", getMessage(DEFAULT_LOCALE, "common.prayerAndDevotion")],
    ["common.bestTime", item.notes || getMessage(DEFAULT_LOCALE, "common.morningWorship")]
  ];

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <JsonLd data={[articleSchema, audioSchema, faqSchema(faqs)]} />
      <Header active={config.activeKey} />
      <div className="sr-only">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <Link href="/">
            <I18n k="common.home" />
          </Link>
          <span>›</span>
          <Link href={listHref}>
            <I18n k={config.listKey} />
          </Link>
          <span>›</span>
          <span className="capitalize">{item.type}</span>
          <span>›</span>
          <span className="text-[#7b2929]">{item.title}</span>
        </div>

        <section className="grid gap-8 rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm lg:grid-cols-[420px_1fr]">
          <div className="relative h-[390px] overflow-hidden rounded-2xl">
            <OptimizedImage src={image} alt={item.title} fill priority sizes="420px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3b1111]/45 to-transparent" />
            <span className="absolute bottom-5 left-5 text-7xl font-bold text-white">ॐ</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff2df] px-4 py-2 text-xs font-extrabold text-[#b66a14]">
              <Star size={14} className="fill-[#f7b313] text-[#f7b313]" />
              <I18n k="common.mostPopular" />
            </span>
            <WaveText as="h1" text={item.title} className="mt-5 block font-serif text-5xl font-bold text-[#351112]" />
            {(item.originalText || item.transliteration) && (
              <p className="mt-2 text-2xl font-bold text-[#9b5252]">
                {String(item.originalText || item.transliteration).split("\n")[0]}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {[item.deity, item.categoryLabel || item.type, getMessage(DEFAULT_LOCALE, "common.vedic")].filter(Boolean).map((tag) => (
                <span key={tag} className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-extrabold text-[#6b2323]">
                  {tag}
                </span>
              ))}
            </div>
            {item.excerpt && (
              <p className="mt-6 whitespace-pre-line text-base font-medium leading-8 text-slate-600">{item.excerpt}</p>
            )}
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {info.map(([labelKey, value, Icon]) => (
                <div key={labelKey} className="rounded-xl bg-[#fff7ed] p-4">
                  <Icon size={20} className="text-[#d9a441]" />
                  <I18n k={labelKey} as="p" className="mt-2 text-xs font-bold text-slate-500" />
                  <p className="mt-1 text-sm font-extrabold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-[#6b2323] px-7 py-3 text-sm font-extrabold text-white">
                <Play size={17} fill="currentColor" />
                <I18n k="common.play" />
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[#9b5252] px-7 py-3 text-sm font-extrabold text-[#6b2323]">
                <Download size={17} />
                <I18n k="common.download" />
              </button>
              <ShareButton
                title={item.title}
                url={`${listHref}/${slug}`}
                label={getMessage(DEFAULT_LOCALE, "common.share")}
                modalTitle={`Share ${item.title}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[#d9bfa9] px-5 py-3 text-sm font-extrabold text-[#6b2323] hover:bg-[#fff7ed]"
                iconSize={17}
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <I18n k="common.tabs.lyrics" as="h2" className="text-2xl font-extrabold text-[#351112]" />
              {/* Complete path/lyrics — user yahan poora chalisa/mantra padh sakta hai */}
              <div className="mt-6 rounded-2xl bg-[#fff7ed] p-6 sm:p-10">
                <p className="text-center text-6xl font-bold text-[#d9a441]">ॐ</p>
                <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-center font-serif text-xl font-semibold leading-10 text-[#5b1f1f] sm:text-2xl sm:leading-[2.9rem]">
                  {item.originalText || item.title}
                </p>
                {item.originalTextHi && item.originalTextHi !== item.originalText && (
                  <div className="mt-8 border-t border-[#eadfc8] pt-7">
                    <p className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-[#b66a14]">
                      हिंदी में पढ़ें
                    </p>
                    <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-center font-serif text-xl font-semibold leading-10 text-[#5b1f1f] sm:text-2xl sm:leading-[2.9rem]">
                      {item.originalTextHi}
                    </p>
                  </div>
                )}
                {item.transliteration && (
                  <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line border-t border-[#eadfc8] pt-6 text-center text-base font-semibold leading-8 text-slate-600">
                    {item.transliteration}
                  </p>
                )}
              </div>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl border border-[#f1e4d6] p-5">
                  <I18n k="common.transliteration" as="h3" className="font-extrabold" />
                  <p className="mt-3 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">
                    {item.transliteration || item.title}
                  </p>
                </div>
                <div className="rounded-xl border border-[#f1e4d6] p-5">
                  <I18n k="common.meaning" as="h3" className="font-extrabold" />
                  <p className="mt-3 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">{item.excerpt}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <I18n k="common.howToChant" as="h2" className="text-2xl font-extrabold text-[#351112]" />
              <p className="mt-5 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">
                {item.howToChant || <I18n k="common.defaultHowToChant" />}
              </p>
            </div>

            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <I18n k="common.whenToChant" as="h2" className="text-2xl font-extrabold text-[#351112]" />
              <p className="mt-4 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">
                {item.notes || <I18n k="common.defaultWhenToChant" />}
              </p>
            </div>

            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-7 shadow-sm">
              <I18n k={config.relatedKey} as="h2" className="text-2xl font-extrabold text-[#351112]" />
              <SimpleSlider slides={relatedSlides} className="mt-6" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
              <I18n k="common.audioPlayer" as="h3" className="text-xl font-extrabold" />
              <div className="mt-6 rounded-2xl bg-[#fff2df] p-6 text-center">
                <FloatingDivine>
                  <button type="button" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6b2323] text-white">
                    <Play size={25} fill="currentColor" />
                  </button>
                </FloatingDivine>
                <p className="mt-5 font-extrabold">{item.title}</p>
                <div className="mt-5 h-2 rounded-full bg-white">
                  <span className="block h-2 w-1/3 rounded-full bg-[#d9a441]" />
                </div>
                <div className="mt-3 flex justify-between text-xs font-bold text-slate-500">
                  <span>1:28</span>
                  <span>{item.readTime || "4:52"}</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
              <I18n k="common.benefitsOfChanting" as="h3" className="text-xl font-extrabold" />
              <WaveGrid className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                {hasBenefits
                  ? item.benefits.map((benefit) => (
                      <WaveGridItem key={benefit} className="flex gap-2">
                        <Sparkles size={16} className="text-[#d9a441]" /> {benefit}
                      </WaveGridItem>
                    ))
                  : defaultBenefitKeys.map((key) => (
                      <WaveGridItem key={key} className="flex gap-2">
                        <Sparkles size={16} className="text-[#d9a441]" />
                        <I18n k={key} />
                      </WaveGridItem>
                    ))}
              </WaveGrid>
            </div>
            <div className="rounded-2xl border border-[#f1e4d6] bg-white p-6 shadow-sm">
              <I18n k="common.details" as="h3" className="text-xl font-extrabold" />
              <div className="mt-5 space-y-3">
                {details.map(([labelKey, value]) => (
                  <p key={labelKey} className="flex justify-between gap-4 border-b border-[#f1e4d6] pb-3 text-sm">
                    <I18n k={labelKey} as="span" className="font-bold text-slate-500" />
                    <span className="text-right font-extrabold capitalize">{value}</span>
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-2xl border border-[#f1e4d6] bg-[#fff2df] p-10 text-center shadow-sm">
          <I18n k="common.getDailyUpdates" as="h2" className="font-serif text-4xl font-bold text-[#5b1f1f]" />
          <form className="mx-auto mt-7 flex max-w-lg overflow-hidden rounded-lg border border-[#eadfd3] bg-white">
            <input
              className="min-w-0 flex-1 px-5 py-3 text-sm outline-none"
              placeholder={getMessage(DEFAULT_LOCALE, "common.enterEmail")}
              data-i18n-placeholder="common.enterEmail"
            />
            <button type="submit" className="bg-[#6b2323] px-7 text-sm font-extrabold text-white">
              <I18n k="common.subscribe" />
            </button>
          </form>
        </section>
        <FaqSection
          title={`${item.title} FAQs`}
          description={`Common questions about the meaning, benefits, timing, and correct way to chant ${item.title}.`}
          items={faqs}
        />
      </div>
      <Footer />
    </main>
  );
}

"use client";

import { ChevronDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import { useTranslation } from "@/components/providers/LanguageProvider";

const localeOptions = [
  { value: "en", labelKey: "language.en" },
  { value: "hi", labelKey: "language.hi" }
];

export default function LanguageSwitcher({ variant = "dark" }) {
  const { locale, setLocale, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const isLight = variant === "light";
  const changeLocale = (nextLocale) => {
    setLocale(nextLocale);
    const currentSearch = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(currentSearch);
    params.set("lang", nextLocale);
    const query = params.toString() ? `?${params.toString()}` : "";
    const nextPath = localizePath(pathname, nextLocale);
    router.push(`${nextPath}${query}`);
    router.refresh();
  };

  return (
    <div className="relative">
      <Languages
        size={15}
        className={`pointer-events-none absolute left-2.5 top-1/2 z-10 hidden -translate-y-1/2 sm:block ${
          isLight ? "text-[#c48a2a]" : "text-white/70"
        }`}
      />
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value)}
        aria-label={t("language.switchLabel")}
        className={`h-10 min-w-[108px] cursor-pointer appearance-none rounded-lg pl-8 pr-8 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#d9a441]/60 sm:pl-9 ${
          isLight
            ? "border border-[#f1e4d6] bg-white text-[#351112] ring-0 hover:bg-cream"
            : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 focus:bg-white/15"
        }`}
      >
        {localeOptions
          .filter((opt) => LOCALES.includes(opt.value))
          .map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-[#6b2323]">
              {t(opt.labelKey)}
            </option>
          ))}
      </select>
      <ChevronDown
        size={14}
        className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 ${
          isLight ? "text-slate-400" : "text-white/70"
        }`}
        aria-hidden
      />
    </div>
  );
}

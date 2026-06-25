"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LOCALE_COOKIE } from "@/lib/i18n/config";
import { getLocaleFromPath, localizePath } from "@/lib/i18n/paths";
import { useTranslation } from "@/components/providers/LanguageProvider";

function hasLocaleCookie() {
  return document.cookie.split("; ").some((item) => item.startsWith(`${LOCALE_COOKIE}=`));
}

export default function LanguageChoicePopup() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(locale);

  useEffect(() => {
    const pathLocale = getLocaleFromPath(pathname);
    setSelected(pathLocale);
    if (pathLocale !== locale) {
      setLocale(pathLocale);
    }
  }, [locale, pathname, setLocale]);

  useEffect(() => {
    if (!hasLocaleCookie()) {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const chooseLanguage = () => {
    setLocale(selected);
    setOpen(false);
    const query = searchParams.toString();
    const nextPath = localizePath(pathname, selected);
    router.push(query ? `${nextPath}?${query}` : nextPath);
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1b0f0f]/45 px-4" role="dialog" aria-modal="true" aria-label="Choose language">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl ring-1 ring-black/10">
        <h2 className="text-lg font-extrabold text-[#351112]">Choose Language</h2>
        <p className="mt-1 text-sm text-slate-600">Select the site language you want to open.</p>

        <div className="mt-5 space-y-3">
          {[
            { value: "hi", label: "Hindi", hint: "brahmatatva.com/hi/" },
            { value: "en", label: "English", hint: "brahmatatva.com/" }
          ].map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#f1e4d6] p-3 text-sm font-bold text-[#351112] transition hover:bg-[#fff8ed]">
              <input
                type="radio"
                name="site-language"
                value={option.value}
                checked={selected === option.value}
                onChange={() => setSelected(option.value)}
                className="h-4 w-4 accent-[#9b2c2c]"
              />
              <span className="flex-1">
                {option.label}
                <span className="block text-xs font-semibold text-slate-500">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={chooseLanguage}
          className="mt-5 w-full rounded-lg bg-[#6b2323] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#551818]"
        >
          Open Site
        </button>
      </div>
    </div>
  );
}

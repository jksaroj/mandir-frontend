"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { applyTranslations } from "@/lib/i18n/applyTranslations";
import { useTranslation } from "@/components/providers/LanguageProvider";

/** Re-apply translations after route changes and DOM updates. */
export default function LocaleObserver() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const localeRef = useRef(locale);

  localeRef.current = locale;

  useEffect(() => {
    const run = () => applyTranslations(localeRef.current);
    run();
    const frame = requestAnimationFrame(run);
    const timer = setTimeout(run, 120);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [pathname, locale]);

  useEffect(() => {
    let timer;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => applyTranslations(localeRef.current), 60);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [locale]);

  return null;
}

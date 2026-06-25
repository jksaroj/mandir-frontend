"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES } from "@/lib/i18n/config";
import { getLocaleFromPath } from "@/lib/i18n/paths";
import { applyTranslations } from "@/lib/i18n/applyTranslations";
import { getMessage } from "@/lib/i18n/getMessage";

const LanguageContext = createContext(null);

function readCookieLocale() {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match?.[1];
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

export function LanguageProvider({ children, initialLocale = DEFAULT_LOCALE }) {
  const [locale, setLocaleState] = useState(
    LOCALES.includes(initialLocale) ? initialLocale : DEFAULT_LOCALE
  );

  const setLocale = useCallback((next) => {
    if (!LOCALES.includes(next)) return;
    setLocaleState(next);
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`;
    applyTranslations(next);
  }, []);

  const t = useCallback((key) => getMessage(locale, key), [locale]);

  useEffect(() => {
    const pathLocale = getLocaleFromPath(window.location.pathname);
    const saved = pathLocale || readCookieLocale();
    setLocaleState(saved);
    document.cookie = `${LOCALE_COOKIE}=${saved};path=/;max-age=31536000;SameSite=Lax`;
    applyTranslations(saved);
  }, []);

  useEffect(() => {
    applyTranslations(locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
}

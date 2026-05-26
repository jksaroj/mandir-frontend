"use client";

import LocaleObserver from "@/components/i18n/LocaleObserver";
import { LanguageProvider } from "./LanguageProvider";

export default function AppProviders({ children, initialLocale }) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <LocaleObserver />
      {children}
    </LanguageProvider>
  );
}

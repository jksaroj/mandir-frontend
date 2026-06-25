"use client";

import { Suspense } from "react";
import LanguageChoicePopup from "@/components/i18n/LanguageChoicePopup";
import LocaleObserver from "@/components/i18n/LocaleObserver";
import { LanguageProvider } from "./LanguageProvider";

export default function AppProviders({ children, initialLocale }) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <LocaleObserver />
      <Suspense fallback={null}>
        <LanguageChoicePopup />
      </Suspense>
      {children}
    </LanguageProvider>
  );
}

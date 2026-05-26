"use client";

import WaveText from "@/components/animations/WaveText";
import { useTranslation } from "@/components/providers/LanguageProvider";

/** Animated heading that updates when language changes. */
export default function I18nWaveText({ k, className, as = "h1" }) {
  const { t } = useTranslation();
  return <WaveText as={as} text={t(k)} className={className} />;
}

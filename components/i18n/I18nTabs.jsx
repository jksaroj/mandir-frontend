"use client";

import Tabs from "@/components/ui/Tabs";
import { useTranslation } from "@/components/providers/LanguageProvider";

export default function I18nTabs({ tabKeys, ...props }) {
  const { t } = useTranslation();
  const tabs = tabKeys.map((key) => t(key));

  return <Tabs tabs={tabs} {...props} />;
}

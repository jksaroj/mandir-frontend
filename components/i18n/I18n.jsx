import { getMessage } from "@/lib/i18n/getMessage";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

/** Server-safe translated text node; client hydrator updates on locale change. */
export default function I18n({ k, as: Tag = "span", className, ...props }) {
  const text = getMessage(DEFAULT_LOCALE, k);
  return (
    <Tag data-i18n={k} className={className} {...props}>
      {text}
    </Tag>
  );
}

/** For input placeholders and aria-labels. */
export function I18nAttr({ k, attr = "placeholder", children, ...props }) {
  const text = getMessage(DEFAULT_LOCALE, k);
  return (
    <span data-i18n-attr={attr} data-i18n={k} {...props}>
      {children}
    </span>
  );
}

import { getMessage } from "./getMessage";

export function applyTranslations(locale) {
  if (typeof document === "undefined") return;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    node.textContent = getMessage(locale, key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (!key || !(node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement)) return;
    node.placeholder = getMessage(locale, key);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria-label");
    if (!key || !(node instanceof HTMLElement)) return;
    node.setAttribute("aria-label", getMessage(locale, key));
  });

  document.documentElement.lang = locale === "hi" ? "hi" : "en";
}

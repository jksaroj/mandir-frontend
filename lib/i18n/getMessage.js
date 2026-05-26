import { DEFAULT_LOCALE } from "./config";
import en from "./messages/en";
import hi from "./messages/hi";

const dictionaries = { en, hi };

export function getMessage(locale, key) {
  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
  const parts = key.split(".");
  let value = dict;

  for (const part of parts) {
    value = value?.[part];
    if (value === undefined) break;
  }

  if (typeof value === "string") return value;

  const fallback = dictionaries[DEFAULT_LOCALE];
  let fb = fallback;
  for (const part of parts) {
    fb = fb?.[part];
    if (fb === undefined) break;
  }

  return typeof fb === "string" ? fb : key;
}

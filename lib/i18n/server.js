import { cookies } from "next/headers";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES } from "./config";

export async function getServerLocale() {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale");
  if (LOCALES.includes(headerLocale)) return headerLocale;

  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

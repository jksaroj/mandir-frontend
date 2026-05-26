import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES } from "./config";

export async function getServerLocale() {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

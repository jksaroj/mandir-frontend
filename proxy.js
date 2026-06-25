import { NextResponse } from "next/server";
import { LOCALE_COOKIE } from "./lib/i18n/config";
import { HINDI_PREFIX, localizePath, normalizeInternalPath, stripLocalePrefix } from "./lib/i18n/paths";

const PUBLIC_FILE = /\.(.*)$/;
const ROUTE_ALIASES = {
  "/temple": "/temples",
  "/mantra": "/mantras"
};

function shouldIgnore(pathname) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/backend") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/sitemaps") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/rss.xml" ||
    PUBLIC_FILE.test(pathname)
  );
}

function getCanonicalPath(pathname) {
  const stripped = stripLocalePrefix(pathname);
  const normalized = normalizeInternalPath(stripped);
  return normalized || "/";
}

function isSingularAlias(pathname) {
  const stripped = stripLocalePrefix(pathname);
  const first = `/${stripped.split("/").filter(Boolean)[0] || ""}`;
  return Boolean(ROUTE_ALIASES[first]);
}

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  if (shouldIgnore(pathname)) {
    return NextResponse.next();
  }

  const isHindiPath = pathname === HINDI_PREFIX || pathname.startsWith(`${HINDI_PREFIX}/`);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const canonicalPath = getCanonicalPath(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", isHindiPath ? "hi" : "en");

  if (!isHindiPath && cookieLocale === "hi" && pathname !== "/login") {
    const url = request.nextUrl.clone();
    url.pathname = localizePath(pathname, "hi");
    return NextResponse.redirect(url);
  }

  if (isHindiPath || isSingularAlias(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = canonicalPath;
    url.search = search;
    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    response.cookies.set(LOCALE_COOKIE, isHindiPath ? "hi" : "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
    return response;
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (cookieLocale === "en") {
    response.cookies.set(LOCALE_COOKIE, "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

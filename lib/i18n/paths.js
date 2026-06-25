export const HINDI_PREFIX = "/hi";

const SINGULAR_ROUTE_ALIASES = {
  "/temple": "/temples",
  "/mantra": "/mantras"
};

const PUBLIC_ROUTE_ALIASES = {
  "/temples": "/temple",
  "/mantras": "/mantra"
};

export function stripLocalePrefix(pathname = "/") {
  if (pathname === HINDI_PREFIX) return "/";
  if (pathname.startsWith(`${HINDI_PREFIX}/`)) return pathname.slice(HINDI_PREFIX.length) || "/";
  return pathname || "/";
}

export function normalizeInternalPath(pathname = "/") {
  const [pathOnly, suffix = ""] = String(pathname).split(/(?=[?#])/);
  const stripped = stripLocalePrefix(pathOnly);
  const segments = stripped.split("/").filter(Boolean);
  const first = segments[0] ? `/${segments[0]}` : "/";
  const replacement = SINGULAR_ROUTE_ALIASES[first];

  if (!replacement) return `${stripped}${suffix}`;

  const nextPath = `/${[replacement.replace(/^\//, ""), ...segments.slice(1)].join("/")}`;
  return `${nextPath === "/" ? "/" : nextPath}${suffix}`;
}

export function localizePath(pathname = "/", locale = "en") {
  if (!pathname || pathname.startsWith("#")) return pathname || "/";
  if (/^(?:https?:|mailto:|tel:)/i.test(pathname)) return pathname;

  const [pathOnly, suffix = ""] = String(pathname).split(/(?=[?#])/);
  const stripped = stripLocalePrefix(pathOnly);
  const segments = stripped.split("/").filter(Boolean);
  const first = segments[0] ? `/${segments[0]}` : "/";
  const publicFirst = PUBLIC_ROUTE_ALIASES[first] || first;
  const publicPath =
    publicFirst === "/"
      ? "/"
      : `/${[publicFirst.replace(/^\//, ""), ...segments.slice(1)].join("/")}`;

  const withSuffix = `${publicPath}${suffix}`;
  if (locale !== "hi") return withSuffix || "/";
  if (withSuffix === "/") return HINDI_PREFIX;
  return `${HINDI_PREFIX}${withSuffix}`;
}

export function getLocaleFromPath(pathname = "/") {
  return pathname === HINDI_PREFIX || pathname.startsWith(`${HINDI_PREFIX}/`) ? "hi" : "en";
}

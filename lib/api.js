const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const LOCALE_COOKIE = "sd_locale";

function getApiBase() {
  if (!API_BASE) return "";
  if (typeof window === "undefined") {
    if (API_BASE.startsWith("/backend/api")) return "https://backend.brahmatatva.com/api";
    return API_BASE;
  }

  try {
    const url = new URL(API_BASE, window.location.origin);
    if (url.origin === window.location.origin) return API_BASE;

    // Route live backend calls through the Next.js rewrite to avoid browser CORS.
    if (url.hostname === "backend.brahmatatva.com" && url.pathname.replace(/\/$/, "") === "/api") {
      return "/backend/api";
    }
  } catch {
    return API_BASE;
  }

  return API_BASE;
}

export async function getCurrentLocale() {
  if (typeof window !== "undefined") {
    const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
    return match?.[1] === "hi" ? "hi" : "en";
  }

  try {
    const { headers } = await import("next/headers");
    const headerStore = await headers();
    const headerLocale = headerStore.get("x-locale");
    if (headerLocale === "hi") return "hi";
  } catch {
    return "en";
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(LOCALE_COOKIE)?.value === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

async function getLocalizedPath(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (/^\/(?:hi|en)(?:\/|$)/.test(normalizedPath) || normalizedPath.startsWith("/auth")) {
    return normalizedPath;
  }

  return (await getCurrentLocale()) === "hi" ? `/hi${normalizedPath}` : normalizedPath;
}

export async function apiGet(path, options = {}) {
  const base = getApiBase();
  if (!base) {
    return null;
  }

  try {
    const localizedPath = await getLocalizedPath(path);
    const response = await fetch(`${base}${localizedPath}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
      ...options
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export async function apiPost(path, body) {
  const base = getApiBase();
  if (!base) {
    return null;
  }

  try {
    const localizedPath = await getLocalizedPath(path);
    const response = await fetch(`${base}${localizedPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

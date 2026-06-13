const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

function getApiBase() {
  if (!API_BASE) return "";
  if (typeof window === "undefined") return API_BASE;

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

export async function apiGet(path, options = {}) {
  const base = getApiBase();
  if (!base) {
    return null;
  }

  try {
    const response = await fetch(`${base}${path}`, {
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
    const response = await fetch(`${base}${path}`, {
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

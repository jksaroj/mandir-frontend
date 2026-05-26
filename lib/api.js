const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

export async function apiGet(path, options = {}) {
  if (!API_BASE) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
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
  if (!API_BASE) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
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

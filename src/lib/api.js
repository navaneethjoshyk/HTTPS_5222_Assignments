// src/lib/api.js
const RAW_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
export const API_BASE_URL = RAW_BASE.replace(/\/+$/, "");

export async function apiGet(path, { signal } = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}

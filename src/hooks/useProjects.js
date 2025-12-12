// src/hooks/useProjects.js
import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");
        const json = await apiGet("/api/projects?sort=-createdAt", { signal: ac.signal });
        setProjects(json?.data || []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return { projects, loading, error };
}

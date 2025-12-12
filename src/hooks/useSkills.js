// src/hooks/useSkills.js
import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");
        const json = await apiGet("/api/skills?sort=name", { signal: ac.signal });
        setSkills(json?.data || []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return { skills, loading, error };
}

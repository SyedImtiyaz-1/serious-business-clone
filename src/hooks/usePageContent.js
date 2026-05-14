import { useEffect, useState } from "react";

const cache = new Map();
const inFlight = new Map();

function getCachedData(page) {
  if (cache.has(page)) {
    return cache.get(page);
  }
  try {
    const saved = localStorage.getItem(`cms_page_${page}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      cache.set(page, parsed);
      return parsed;
    }
  } catch (e) {
    // Ignore localStorage restrictions
  }
  return null;
}

export function usePageContent(page) {
  const [sections, setSections] = useState(() => getCachedData(page));
  const [loading, setLoading] = useState(() => !cache.has(page));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Even if cached, we do a silent background re-fetch to keep data fresh
    const cached = getCachedData(page);
    if (cached && !sections) {
      setSections(cached);
      setLoading(false);
    }

    const promise =
      inFlight.get(page) ||
      fetch(`/api/admin/pages/${page}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((doc) => {
          const next = doc?.sections || {};
          cache.set(page, next);
          try {
            localStorage.setItem(`cms_page_${page}`, JSON.stringify(next));
          } catch (e) {
            // Ignore storage errors
          }
          inFlight.delete(page);
          return next;
        })
        .catch((e) => {
          inFlight.delete(page);
          throw e;
        });

    inFlight.set(page, promise);

    promise
      .then((next) => {
        if (cancelled) return;
        setSections(next);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  return { sections, loading, error };
}

export function invalidatePageContent(page) {
  if (page) {
    cache.delete(page);
    try {
      localStorage.removeItem(`cms_page_${page}`);
    } catch (e) {}
  } else {
    cache.clear();
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cms_page_")) localStorage.removeItem(key);
      });
    } catch (e) {}
  }
}

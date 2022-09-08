import { useEffect, useState } from "react";

/**
 * Match media runs a media query and returns a boolean for whether or not
 * it matches. Returns undefined server-side when initialization not yet done.
 * Can only be initialized client-side.
 */
export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState<boolean | undefined>(
    _querycache.get(query)
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => {
      setMatches(media.matches);
      _querycache.set(query, media.matches);
    };
    media.addEventListener("change", handler);
    handler();
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Cache query results during session to withstand page transitions
const _querycache = new Map<string, boolean>();

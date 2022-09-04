import { useEffect, useState } from "react";

/**
 * Match media runs a media query and returns a boolean for whether or not
 * it matches. Returns undefined server-side when initialization not yet done.
 * Can only be initialized client-side.
 */
export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState<boolean | undefined>();

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", handler);
    handler();
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

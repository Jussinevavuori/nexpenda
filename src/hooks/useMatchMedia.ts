import { useEffect, useState } from "react";

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

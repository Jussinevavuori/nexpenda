import { useMatchMedia } from "./useMatchMedia";
import { useMemo } from "react";

export type Breakpoint = "sm" | "md" | "lg" | "desktop" | "xl" | "2xl";

export const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  desktop: 900,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Breakpoint query utility.
 */
export function useBreakpoint(breakpoint: `${"" | "!"}${Breakpoint}`) {
  const query = useMemo(() => {
    const cleanBreakpoint = breakpoint.replace("!", "") as Breakpoint;
    const width = breakpoints[cleanBreakpoint];
    const property = breakpoint.includes("!") ? "max-width" : "min-width";

    return `(${property}: ${width}px)`;
  }, [breakpoint]);
  return useMatchMedia(query);
}

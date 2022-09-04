import { useMatchMedia } from "./useMatchMedia";

/**
 * Does the user prefer color scheme dark.
 */
export function usePrefersColorSchemeDark() {
  return useMatchMedia("(prefers-color-scheme: dark)");
}

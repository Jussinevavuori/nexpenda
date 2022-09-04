import { useMatchMedia } from "./useMatchMedia";

/**
 * Runs the display-mode: standalone query.
 */
export function useIsStandalone() {
  return useMatchMedia("(display-mode: standalone)");
}

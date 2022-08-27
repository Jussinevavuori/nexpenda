import { useMatchMedia } from "./useMatchMedia";

export function useIsStandalone() {
  return useMatchMedia("(display-mode: standalone)");
}

import { useMatchMedia } from './useMatchMedia';

export function usePrefersColorSchemeDark() {
  return useMatchMedia("(prefers-color-scheme: dark)");
}

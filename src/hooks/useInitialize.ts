import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { enableMapSet } from "immer";
import { useEffect } from "react";

/**
 * Initialize all required properties.
 */
export function useInitialize() {
  // Apply palette
  const palette = usePreference("palette");
  // eslint-disable-next-line
  useEffect(() => setPrimaryColor(palette), []);

  // Map set plugin for immer
  useEffect(() => {
    enableMapSet();
  }, []);
}

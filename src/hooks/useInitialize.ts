import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";
import { offsetPalette } from "@/utils/color/offsetPalette";
import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { enableMapSet } from "immer";
import { useEffect } from "react";
import { useOnKeyCombination } from "./useOnKeyCombination";

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

  // Utility for toggling theme and palette
  const theme = usePreference("theme");
  const updateTheme = useUpdatePreference("theme");
  const updatePalette = useUpdatePreference("palette");
  useOnKeyCombination({ key: "arrowup", shift: true }, () => {
    updateTheme("system");
  });
  useOnKeyCombination({ key: "arrowdown", shift: true }, () => {
    updateTheme(theme === "dark" ? "light" : "dark");
  });
  useOnKeyCombination({ key: "arrowright", shift: true }, () => {
    updatePalette(offsetPalette(palette, 1));
    setPrimaryColor(offsetPalette(palette, 1));
  });
  useOnKeyCombination({ key: "arrowleft", shift: true }, () => {
    updatePalette(offsetPalette(palette, -1));
    setPrimaryColor(offsetPalette(palette, -1));
  });
}

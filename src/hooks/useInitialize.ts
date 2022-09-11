import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";
import { offsetPalette } from "@/utils/color/offsetPalette";
import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { setTheme } from "@/utils/color/setTheme";
import { exposeToWindow } from "@/utils/dom/exposeToWindow";
import { trpc } from "@/utils/trpc";
import { enableMapSet } from "immer";
import { useEffect } from "react";
import { useOnKeyCombination } from "./useOnKeyCombination";
import superjson from "superjson";

/**
 * Initialize all required properties.
 */
export function useInitialize() {
  // Apply palette and theme
  const palette = usePreference("palette");
  const theme = usePreference("theme");
  // eslint-disable-next-line
  useEffect(() => setPrimaryColor(palette), []);
  // eslint-disable-next-line
  useEffect(() => setTheme(theme), []);

  // Map set plugin for immer
  useEffect(() => {
    enableMapSet();
  }, []);

  // Utility to access TRPC for testing
  useEffect(
    () =>
      exposeToWindow({
        trpc: trpc.createClient({
          url: "http://localhost:3000/api/trpc",
          transformer: superjson,
        }),
      }),
    []
  );

  // Utility for toggling theme and palette
  const updateTheme = useUpdatePreference("theme");
  const updatePalette = useUpdatePreference("palette");
  useOnKeyCombination({ key: "arrowup", shift: true }, () => {
    updateTheme("system");
    setTheme("system");
  });
  useOnKeyCombination({ key: "arrowdown", shift: true }, () => {
    updateTheme(theme === "dark" ? "light" : "dark");
    setTheme(theme === "dark" ? "light" : "dark");
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

import { usePrefersColorSchemeDark } from "@/hooks/usePrefersColorSchemeDark";
import { useMemo } from "react";
import { useThemeContext } from "../Theme";

export function useCurrentTheme(theme?: SelectableTheme) {
  const defaultDarkModeContext = useThemeContext();
  const systemPrefersColorSchemeDark = usePrefersColorSchemeDark();

  return useMemo(() => {
    const system = systemPrefersColorSchemeDark ? "dark" : "light";
    if (theme) return theme === "system" ? system : theme;
    return defaultDarkModeContext.isDarkTheme ? "dark" : "light";
  }, [theme, systemPrefersColorSchemeDark, defaultDarkModeContext.isDarkTheme]);
}

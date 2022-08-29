import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { useEffect } from "react";

export function useInitialize() {
  const palette = usePreference("palette");
  useEffect(() => setPrimaryColor(palette), []);
}

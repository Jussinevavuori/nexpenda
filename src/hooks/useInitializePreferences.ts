import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { useEffect } from "react";

export function useInitializePreferences() {
  // Initialize color
  useEffect(() => {
    setPrimaryColor("blue");
  }, []);
}

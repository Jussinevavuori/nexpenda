import { getWindow } from "./getWindow";

export function getSystemThemeMode() {
  return getWindow()?.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

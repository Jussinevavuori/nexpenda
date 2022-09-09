import { getRoot } from "../dom/getRoot";

export function setTheme(targetTheme: SelectableTheme) {
  // Collapse "system" into either dark or light
  const realizedTheme =
    targetTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : targetTheme;

  // Add or remove "dark" class to root
  const root = getRoot();
  if (!root) {
    console.error("Could not find root to set", realizedTheme, "theme");
    return;
  }

  if (realizedTheme === "dark" && !root.classList.contains("dark")) {
    root.classList.add("dark");
  } else if (realizedTheme === "light" && !root.classList.contains("light")) {
    root.classList.remove("dark");
  }
}

export function getWindow() {
  if (typeof window !== "undefined") {
    return window;
  } else return undefined;
}

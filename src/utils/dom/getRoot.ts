export function getRoot() {
  if (typeof window === "undefined") {
    return undefined;
  } else {
    return document.documentElement;
  }
}

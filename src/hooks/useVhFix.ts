import { useEffect } from "react";

/**
 * On mobile 100vh has issues and it's better to use the "--full-vh"
 * and "--vh" custom properties (respectively correspond to 100vh and 1vh).
 * This hook handles keeping those values in sync.
 */
export function useVhFix() {
  useEffect(() => {
    const root = document.documentElement;
    const eventHandler = () => {
      const viewportHeight = window.innerHeight;
      root.style.setProperty("--full-vh", `${0.9999 * viewportHeight}px`);
      root.style.setProperty("--vh", `${viewportHeight / 100}px`);
    };
    eventHandler();
    window.addEventListener("resize", eventHandler);
    return () => {
      window.removeEventListener("resize", eventHandler);
    };
  }, []);
}

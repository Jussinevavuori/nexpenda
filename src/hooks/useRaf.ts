import { useEffect } from "react";

/**
 * Request animation frame. Runs given callback on every requested animation
 * frame. Returns a function to stop the loop.
 */
export function useRaf(callback: () => void) {
  useEffect(() => {
    let running = true;

    const fn = () => {
      callback();
      if (running) requestAnimationFrame(fn);
    };

    fn();

    return () => {
      running = false;
    };
  }, [callback]);
}

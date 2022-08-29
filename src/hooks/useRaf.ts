import { useEffect } from "react";

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

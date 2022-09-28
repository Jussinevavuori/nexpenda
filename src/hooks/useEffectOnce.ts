import { useEffect, useRef } from "react";

export function useEffectOnce(fn: () => void) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    fired.current = true;
    fn();
  }, []);
}

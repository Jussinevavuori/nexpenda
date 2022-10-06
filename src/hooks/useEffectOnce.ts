import { useEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

export function useEffectOnce(fn: () => void) {
  const fired = useRef(false);

  const callback = useCallbackRef(fn);

  useEffect(() => {
    if (fired.current) return;

    fired.current = true;
    callback.current();
  }, [callback]);
}

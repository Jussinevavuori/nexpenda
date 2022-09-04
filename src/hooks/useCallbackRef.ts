import { useEffect, useRef } from "react";

/**
 * Reference to callback for performance reasons.
 */
export function useCallbackRef<T extends Function>(fn: T) {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return ref;
}

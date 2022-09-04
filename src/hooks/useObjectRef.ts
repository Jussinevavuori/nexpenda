import { useEffect, useRef } from "react";

/**
 * Reference to object for performance reasons.
 */
export function useObjectRef<T extends {}>(fn: T) {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return ref;
}

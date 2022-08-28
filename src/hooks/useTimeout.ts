import { useCallback, useMemo, useRef } from "react";

export function useTimeout() {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, [timeout]);

  const set = useCallback(
    (callback: () => void, durationMs: number) => {
      clear();
      timeout.current = setTimeout(callback, durationMs);
    },
    [timeout, clear]
  );

  return useMemo(() => ({ set, timeout, clear }), [set, timeout, clear]);
}

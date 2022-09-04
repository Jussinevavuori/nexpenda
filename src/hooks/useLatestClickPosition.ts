import { useEffect, useState } from "react";

/**
 * Listens to the latest click position on the window.
 */
export function useLatestClickPosition() {
  const [pos, setPos] = useState<undefined | { x: number; y: number }>(
    undefined
  );

  useEffect(() => {
    const listener = (ev: MouseEvent) => {
      setPos({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("click", listener, true);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, [setPos]);

  return pos;
}

import { useEffect, useState } from "react";

/**
 * Client-side memo which begins off with the undefined value and is then
 * client-side initialized with the callback function.
 */
export function useClientSideMemo<T>(fn: () => T, deps: any[]) {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    setValue(fn());
  }, [...deps]);

  return value;
}

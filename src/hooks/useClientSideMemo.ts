/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useCallbackRef } from "./useCallbackRef";

/**
 * Client-side memo which begins off with the undefined value and is then
 * client-side initialized with the callback function.
 */
export function useClientSideMemo<T>(fn: () => T, deps: any[]) {
  const [value, setValue] = useState<T | undefined>(undefined);

  const fnRef = useCallbackRef(fn);

  useEffect(() => {
    setValue(fnRef.current());
    // eslint-disable-next-line
  }, [...deps]);

  return value;
}

import { useEffect, useState } from "react";

export function useClientSideMemo<T>(fn: () => T, deps: any[]) {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    setValue(fn());
  }, [...deps]);

  return value;
}

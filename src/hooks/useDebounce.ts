import { useEffect, useState } from "react";

/**
 * Debounce hook utility.
 */
export function useDebounce<T>(value: T, delayMs = 100) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delayMs]);

  return debouncedValue;
}

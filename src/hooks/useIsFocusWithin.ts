import { useEffect, useRef, useState } from "react";

export function useIsFocusWithin<El extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<El | null>(null);

  const [isFocusWithin, setIsFocusWithin] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const onFocusIn = () => setIsFocusWithin(true);
    const onFocusOut = () => setIsFocusWithin(false);

    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);

    return () => {
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [setIsFocusWithin, ref]);

  return { ref, isFocusWithin };
}

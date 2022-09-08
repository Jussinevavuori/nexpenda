import { useEffect, useState } from "react";

export function useIsPageScrolled(thresholdPx = 0) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const listener = () => {
      setIsScrolled(window.scrollY > thresholdPx);
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [setIsScrolled, thresholdPx]);

  return isScrolled;
}

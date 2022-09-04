import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Redirects after a certain timeout when called. Returns as number the
 * time left (in seconds) until the timeout for implementing custom countdowns.
 */
export function useRedirectWithTimeout(href: string, seconds: number = 3) {
  const router = useRouter();
  const [secondsToRedirect, setSecondsToRedirect] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsToRedirect((_) => _ - 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, [setSecondsToRedirect]);

  // When seconds to redirect reaches 0
  useEffect(() => {
    if (secondsToRedirect <= 0) {
      router.push(href);
    }
  }, [secondsToRedirect]);

  return secondsToRedirect;
}

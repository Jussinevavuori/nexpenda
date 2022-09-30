import { useEffect, useState } from "react";

export function useTimeSinceMount(updateMs = 500) {
  const [mountTime] = useState(Date.now());
  const [timeSinceMount, setTimeSinceMount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceMount(Date.now() - mountTime);
    });
    return () => clearInterval(interval);
  }, [updateMs, setTimeSinceMount, mountTime]);

  return timeSinceMount;
}

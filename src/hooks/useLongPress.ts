import { useVibration } from "./useVibration";
import {
  HTMLProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function useLongPress(
  callback: () => void,
  options?: {
    pressTimeInMs?: number;
    disableVibrate?: boolean;
  }
): {
  pressed: boolean;
  props: Partial<HTMLProps<HTMLDivElement>>;
  childlockProps: Partial<HTMLProps<HTMLDivElement>>;
} {
  const vibrate = useVibration();

  // Press time, default to 500 ms
  const pressTimeInMs = useMemo(() => {
    if (options?.pressTimeInMs !== undefined) {
      return options.pressTimeInMs;
    }
    return 300;
  }, [options]);

  // Vibrate not disabled by default
  const disableVibrate = useMemo(() => {
    if (options?.disableVibrate) return true;
    return false;
  }, [options]);

  // Track whether currently pressed
  const [pressed, setPressed] = useState(false);

  // Timeout reference
  const timeout = useRef<NodeJS.Timeout | null>(null);

  // Latest click position
  const origin = useRef<null | { x: number; y: number }>(null);

  // Start long press function
  const startLongPress = useCallback(
    (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
      // Set latest start position
      if ("clientX" in e && "clientY" in e) {
        // Only on primary click
        if (e.button !== 0) {
          return;
        }
        origin.current = {
          x: e.clientX,
          y: e.clientY,
        };
      } else {
        // Prevent double touching from activating long presses
        if (e.touches.length > 1) {
          return;
        }

        const touch = e.touches[0];

        if (!touch) return;

        origin.current = {
          x: touch.clientX,
          y: touch.clientY,
        };
      }

      // Clear any previous timeouts
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      // Set pressed state to true
      setPressed(true);

      // Set new timeout
      timeout.current = setTimeout(() => {
        callback();
        if (!disableVibrate) {
          vibrate("default");
        }
      }, pressTimeInMs);
    },
    [callback, setPressed, timeout, pressTimeInMs, disableVibrate, vibrate]
  );

  // End long press function
  const endLongPress = useCallback(() => {
    origin.current = null;

    setPressed(false);

    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, [setPressed, timeout]);

  // Cancel long press function
  const cancelLongPress = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, [timeout]);

  // Cancel long press on move
  const cancelLongPressOnMove = useCallback(
    (e: React.PointerEvent | React.TouchEvent | React.MouseEvent) => {
      let x = 0;
      let y = 0;

      if (!origin.current) {
        return;
      }

      if ("touches" in e) {
        if (e.touches.length > 1) {
          cancelLongPress();
        } else if (e.touches.length > 0) {
          // eslint-disable-next-line
          x = e.touches[0]!.clientX;
          // eslint-disable-next-line
          y = e.touches[0]!.clientY;
        }
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      /**
       * Calculate distance from touch origin
       */
      const dx = x - origin.current.x;
      const dy = y - origin.current.y;
      const d2 = dx * dx + dy * dy;

      if (d2 > movementCancelThreshold) {
        cancelLongPress();
      }
    },
    [cancelLongPress]
  );

  // Clean out timeouts
  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return {
    pressed,
    props: {
      onTouchStart: startLongPress,
      onTouchEnd: endLongPress,
      onTouchMove: cancelLongPressOnMove,
      onTouchCancel: cancelLongPress,

      onMouseDown: startLongPress,
      onMouseUp: endLongPress,
      onMouseLeave: endLongPress,
      onMouseOut: endLongPress,
    },
    childlockProps: {
      onTouchStart: (e) => e.stopPropagation(),
      onTouchEnd: (e) => e.stopPropagation(),
      onTouchMove: (e) => e.stopPropagation(),
      onTouchCancel: (e) => e.stopPropagation(),
      onMouseDown: (e) => e.stopPropagation(),
      onMouseUp: (e) => e.stopPropagation(),
      onMouseLeave: (e) => e.stopPropagation(),
      onMouseOut: (e) => e.stopPropagation(),
    },
  };
}

const movementCancelThresholdInPx = 10;
const movementCancelThreshold =
  movementCancelThresholdInPx * movementCancelThresholdInPx;

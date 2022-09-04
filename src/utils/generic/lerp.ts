import { clamp } from "./clamp";

/**
 * Lerp a value from a to b using the time from 0 to 1
 * Optionally clamp.
 */
export function lerp(a: number, b: number, t: number, shouldClamp = false) {
  const res = a + (b - a) * t;

  return shouldClamp ? clamp(res, a, b) : res;
}

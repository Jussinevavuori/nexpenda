import { clamp } from './clamp';

/**
 * Lerp a value from a to b using the time from 0 to 1
 * Optionally clamp.
 */
export function lerp(
  a: number,
  b: number,
  t: number,
  shouldClamp: boolean = false
) {
  const res = a + (b - a) * t;

  if (shouldClamp) {
    return clamp(res, a, b);
  } else {
    return res;
  }
}

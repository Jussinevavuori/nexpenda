/**
 * Utility clamp function. The minimum and maximum can be passed in either
 * order.
 *
 * @param value	Value to clamp
 * @param min 	Min or max value
 * @param max 	Max or max value
 * @returns 		Clamped value
 */
export function clamp(value: number, min: number, max: number) {
  const _min = Math.min(min, max);
  const _max = Math.max(min, max);
  if (value < _min) return _min;
  if (value > _max) return _max;
  return value;
}

/**
 * Format a schedule interval to for example
 * - 1 day
 * - 3 weeks
 * - 2 months
 * - 1 year
 * depending on the interval.
 */
export function formatInterval<S extends Schedule>(i: S) {
  const n = i.every;
  const interval = i.intervals.toLowerCase();
  return n > 1 ? `${n} ${interval}s` : `${interval}`;
}

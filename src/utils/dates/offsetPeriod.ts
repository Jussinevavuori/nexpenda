import { normalizePeriod } from "./normalizePeriod";

/**
 * Offsets a period by the smallest amount of time counted by the period. For
 * example offsetting a month period by 2 moves the period ahead by 2 months,
 * similarly offsetting a year period by -1 years moves the period backwards
 * by 1 year. "All" period can not be moved.
 */
export function offsetPeriod(period: Period, by: number): Period {
  // Add "by" to months and normalize
  if ("month" in period) {
    return normalizePeriod({ year: period.year, month: period.month + by });
  }

  // Add "by" to years
  if ("year" in period) {
    return { year: period.year + by };
  }

  // Return original all period
  else return period;
}

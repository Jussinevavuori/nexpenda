import { isPast } from "date-fns";
import { getPeriodEndDate } from "./getPeriodEndDate";

/**
 * Return true if a period is completely in the past. For example, if the
 * date is 15th Feb 2022,
 * ```ts
 * isPeriodPassed(Jan 2022) = true
 * isPeriodPassed(Feb 2022) = false
 * isPeriodPassed(Mar 2022) = false
 * isPeriodPassed(2021) = true
 * isPeriodPassed(2022) = false
 *```
 * Will always return false for all period.
 */
export function isPeriodPassed(period: Period) {
  return isPast(getPeriodEndDate(period));
}

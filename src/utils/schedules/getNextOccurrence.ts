import { startOfDay } from "date-fns";
import { fromDateIndex } from "../dates/fromDateIndex";
import { getDateIndex } from "../dates/getDateIndex";
import { getLastOccurrence } from "./getLastOccurrence";
import { getNextOccurrenceFrom } from "./getNextOccurrenceFrom";
import { LAST_CONSIDERED_DAY } from "./lastConsideredDay";

/**
 * Get next occurrence from today or from specified date.
 */
export function getNextOccurrence<S extends Schedule>(
  s: S,
  d: Date = new Date()
): Date | undefined {
  // Get index of first and given date and their diff
  const iFirst = getDateIndex(s.firstOccurrence);
  const iDate = getDateIndex(d);
  const iDiff = iDate - iFirst;

  // Get index of last or infinite
  const last = getLastOccurrence(s);
  const iLast = last ? getDateIndex(last) : Infinity;

  // If date is before first, first is next occurrence
  if (iDiff < 0) return new Date(s.firstOccurrence);
  // If last is today or passed, no next occurrence
  else if (iDate >= iLast) return last;
  // For days and weeks, the next can directly be calculated
  else if (s.intervals === "DAY" || s.intervals === "WEEK") {
    // Occurs every n days
    const defaultLength = s.intervals === "WEEK" ? 7 : 1;
    const nDays = defaultLength * s.every;

    // Days since last occurrence
    const daysSinceLast = iDiff % nDays;
    const daysUntilNext = nDays - daysSinceLast;
    return fromDateIndex(iDate + daysUntilNext);
  }

  // By default find next occurrence by looping
  else {
    // Loop until last occurrence or last considered day
    const limit = (last ?? LAST_CONSIDERED_DAY).getTime();

    // Date iterator
    let date = startOfDay(s.firstOccurrence);

    // Loop until limit
    while (date.getTime() < limit) {
      // Iterate to next: if jumps outside of interval, return undefined
      // for no found next interval
      const nextDate = getNextOccurrenceFrom(s, date);
      if (!nextDate) {
        return undefined;
      }
      date = nextDate;

      // If new date is in the future, it is the first in the future
      // and is thus the next occurrence
      if (getDateIndex(date) > iDate) {
        return date;
      }
    }

    // In case of none found
    return undefined;
  }
}

import { startOfDay } from "date-fns";
import { fromDateIndex } from "../dates/fromDateIndex";
import { getDateIndex } from "../dates/getDateIndex";
import { getLastOccurrence } from "./getLastOccurrence";
import { getNextOccurrenceFrom } from "./getNextOccurrenceFrom";
import { LAST_CONSIDERED_DAY } from "./lastConsideredDay";

/**
 * Get previous occurrence from today or from specified date.
 */
export function getPreviousOccurrence<S extends Schedule>(
  s: S,
  d: Date = new Date()
): Date | undefined {
  // Get index of first and given date and their diff
  const iFirst = getDateIndex(s.firstOccurrence);
  const iDate = getDateIndex(d);
  const iDiff = iDate - iFirst;

  // Get index of last or infinite
  const last = getLastOccurrence(s);
  const iLast = last ? getDateIndex(last) : Number.POSITIVE_INFINITY;

  // If today is before first, no previous occurrence exists
  if (iDiff < 0) {
    return undefined;
  }

  // If last is today or passed, last was previous occurrence
  else if (iDate >= iLast) {
    return last;
  }

  // For days and weeks, the previous can directly be calculated
  else if (s.intervals === "DAY" || s.intervals === "WEEK") {
    // Occurs every n days
    const defaultLength = s.intervals === "WEEK" ? 7 : 1;
    const nDays = defaultLength * s.every;

    // Days since last occurrence
    const daysSinceLast = iDiff % nDays;
    return fromDateIndex(iDate - daysSinceLast);
  }

  // By default find previous occurrence by looping
  else {
    // Loop until last occurrence or last considered day
    const limit = (last ?? LAST_CONSIDERED_DAY).getTime();

    // Record previous date. Start from first occurrence.
    let prev = startOfDay(s.firstOccurrence);

    // Loop until limit
    while (prev.getTime() < limit) {
      // Get next occurrence from previous occurrence. In case of next jumping
      // out of interval, use the latest prev date as the previous occurrence
      // if it is in the past or today.
      const next = getNextOccurrenceFrom(s, prev);
      if (!next) {
        if (getDateIndex(prev) <= iDate) {
          return prev;
        } else {
          return undefined;
        }
      }

      // If next is in the future and prev is today or in the past
      // we have found the previous occurrence.
      if (getDateIndex(prev) <= iDate && getDateIndex(next) > iDate) {
        return prev;
      }

      // Else assign next as previous
      prev = next;
    }

    // In case of none found
    return undefined;
  }
}

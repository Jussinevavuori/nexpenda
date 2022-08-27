import { addDays, addMonths, addWeeks, addYears, startOfDay } from "date-fns";

/**
 * Last occurrence. Returns undefined if there is no last occurrence.
 */
export function getLastOccurrence<S extends Schedule>(s: S): Date | undefined {
  if (!s.occurrences) return undefined;

  // Shorthand to first occurrence as first. Ensure first is set to start
  // of day for proper calculations.
  const first = startOfDay(s.firstOccurrence);

  // Number of occurrences. Forced to be an integer greater than one by flooring
  // and limiting to 1 at minimum.
  const occurrences = Math.max(1, Math.floor(s.occurrences));

  // Duration in units of time specified by interval
  const duration = s.every * (occurrences - 1);

  // Based on type of interval, add days, weeks, months or years to
  // first date to get correct terminate after date.
  switch (s.intervals) {
    case "DAY": {
      return addDays(first, duration);
    }
    case "WEEK": {
      return addWeeks(first, duration);
    }
    case "MONTH": {
      return addMonths(first, duration);
    }
    case "YEAR": {
      return addYears(first, duration);
    }
  }
}

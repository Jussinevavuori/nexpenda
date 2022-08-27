import { compareDate } from "../dates/compareDate";
import { getLastOccurrence } from "./getLastOccurrence";

/**
 * Check if the date is the first occurrence or after it and if a last date
 * exists, is the last date or before it.
 */
export function isDateInScheduleInterval<S extends Schedule>(s: S, date: Date) {
  const last = getLastOccurrence(s);
  return (
    compareDate(new Date(s.firstOccurrence), "<=", date) &&
    (!last || compareDate(last, ">=", date))
  );
}

import { compareDate } from "../dates/compareDate";

/**
 * Check if still active
 */
export function isScheduleActive<S extends Schedule>(s: S) {
  const last = getLastOccurrence(s);
  return !last || compareDate(last, ">=", new Date());
}

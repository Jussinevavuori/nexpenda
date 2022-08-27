import { addToScheduleInterval } from "./addToScheduleInterval";
import { isDateInScheduleInterval } from "./isDateInScheduleInterval";

/**
 * Assume occurrence is a valid occurrence and calculate the next occurrence
 * from that occurrence. If the next occurrence is outside the interval,
 * return undefined.
 */
export function getNextOccurrenceFrom<S extends Schedule>(
  s: S,
  occurrence: Date
) {
  const next = addToScheduleInterval(s, occurrence, 1);
  return isDateInScheduleInterval(s, next) ? next : undefined;
}

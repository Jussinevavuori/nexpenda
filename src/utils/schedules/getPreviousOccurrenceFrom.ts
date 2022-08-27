import { addToScheduleInterval } from "./addToScheduleInterval";
import { isDateInScheduleInterval } from "./isDateInScheduleInterval";

/**
 * Assume occurrence is a valid occurrence and calculate the previous
 * occurrence from that occurrence. If the previous occurrence is outside the
 * interval, return undefined.
 */
export function getPreviousOccurrenceFrom<S extends Schedule>(
  s: S,
  occurrence: Date
) {
  const prev = addToScheduleInterval(s, occurrence, -1);
  return isDateInScheduleInterval(s, prev) ? prev : undefined;
}

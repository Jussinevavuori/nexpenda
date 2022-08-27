import { differenceInDays } from "date-fns";
import { getNextOccurrence } from "./getNextOccurrence";
import { getPreviousOccurrence } from "./getPreviousOccurrence";

/**
 * Percentage until next occurrence as a number between 0 and 100.
 *
 * @param fallbackPrevious Provide a fallback for the previous date
 * 		which is used if no previous occurrence is found. For example the
 * 		`createdAt` timestamp of an object.
 * @param now Provide an alternative current moment if necessary. Defaults
 * 		to the real current moment.
 * @returns Number between 0 and 100
 */
export function getPercentageUntilNextOccurrence<S extends Schedule>(
  s: S,
  fallbackPrevious?: Date,
  now: Date = new Date()
) {
  const next = getNextOccurrence(s);
  const prev = getPreviousOccurrence(s) ?? fallbackPrevious;

  // If no next occurrence, percentage will always be zero
  // If no prev and no fallback prev provided, unable to calculate percentage
  if (!next) return 0;
  if (!prev) return 0;

  // Calculate days until next from previous and today
  const prevToNext = differenceInDays(next, prev);
  const todayToNext = differenceInDays(next, now);

  // If previous is on same day as next, no percentage can be calculated
  if (prevToNext === 0) return 0;

  // Calculate percentage
  return 100 * (1 - todayToNext / prevToNext);
}

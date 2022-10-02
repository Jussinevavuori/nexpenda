import { startOfDay } from "date-fns";

const MS_IN_DAY = 1000 * 60 * 60 * 24;

/**
 * Utility function for getting the date's index.
 *
 * What is a date index?
 * The date's index is the number of days between that day and epoch (1.1.1970).
 * Dates' indices have the property, that subsequent days have subsequent indices.
 */
export function getDateIndex(date: Date | number) {
  const normalized = startOfDay(new Date(date));
  return Math.floor(normalized.getTime() / MS_IN_DAY);
}

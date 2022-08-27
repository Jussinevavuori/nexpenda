const MS_IN_DAY = 1000 * 60 * 60 * 24;

/**
 * Utility function for getting a date corresponding to a date index.
 *
 * What is a date index?
 * The date's index is the number of days between that day and epoch (1.1.1970).
 * Dates' indices have the property, that subsequent days have subsequent indices.
 */
export function fromDateIndex(n: number): Date {
  return new Date(Math.floor(Math.max(n, 0)) * MS_IN_DAY);
}

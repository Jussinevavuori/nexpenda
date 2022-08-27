type IntervalType = "DAY" | "WEEK" | "MONTH" | "YEAR";

/**
 * From {firstOccurrence}, repeats every {every} {intervals} for
 * {occurrences} (if specified)
 */
type Schedule = {
  intervals: IntervalType;
  every: number;
  firstOccurrence: Date;
  occurrences?: number | undefined | null;
};

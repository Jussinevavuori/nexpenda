import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import addWeeks from "date-fns/addWeeks";
import addYears from "date-fns/addYears";

/**
 * Add intervals to date
 */
export function addToScheduleInterval<S extends Schedule>(
  schedule: S,
  date: Date,
  numIntervals = 1
) {
  switch (schedule.intervals) {
    case "DAY": {
      return addDays(date, numIntervals * schedule.every);
    }
    case "WEEK": {
      return addWeeks(date, numIntervals * schedule.every);
    }
    case "MONTH": {
      return addMonths(date, numIntervals * schedule.every);
    }
    case "YEAR": {
      return addYears(date, numIntervals * schedule.every);
    }
  }
}

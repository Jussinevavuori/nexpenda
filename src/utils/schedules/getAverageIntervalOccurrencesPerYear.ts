export function getAverageIntervalOccurrencesPerYear<S extends Schedule>(
  schedule: S
) {
  switch (schedule.intervals) {
    case "DAY": {
      return 365 / schedule.every;
    }
    case "WEEK": {
      return 365 / (7 * schedule.every);
    }
    case "MONTH": {
      return 12 / schedule.every;
    }
    case "YEAR": {
      return 1 / schedule.every;
    }
  }
}

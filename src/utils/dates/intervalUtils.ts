import { compareDate } from './compareDate';
import {
  addDays,
  differenceInDays,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  getDayOfYear,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  lastDayOfYear,
  startOfMonth,
  startOfToday,
  startOfYear,
  subDays,
} from 'date-fns';

export class IntervalUtils {
  /**
   * Minimum possible date (`0` or `01/01/1970`)
   */
  static MINIMUM_DATE = new Date(0);

  /**
   * Maximum possible date (`253370757600000` or `01/01/9999`)
   */
  static MAXIMUM_DATE = new Date(253370757600000);

  /**
   * Get the interval length in days
   */
  static getIntervalLength(start: Date, end: Date) {
    return differenceInDays(start, end);
  }

  /**
   * Get the interval of the same length set to include today
   */
  static getNowInterval(start: Date, end: Date): [Date, Date] {
    const today = new Date();
    if (this.isAllInterval(start, end)) {
      return [start, end];
    } else if (this.isYearInterval(start, end)) {
      return [startOfYear(today), endOfYear(today)];
    } else if (this.isMonthInterval(start, end)) {
      return [startOfMonth(today), endOfMonth(today)];
    } else {
      return [endOfDay(addDays(today, length)), startOfToday()];
    }
  }

  /**
   * Get the next interval of the same length starting after the
   * provided interval
   */
  static getNextInterval(
    start: Date,
    end: Date,
    skip: number = 0
  ): [Date, Date] {
    // Recursive inner function for looping skip + 1 times
    const _getNextInterval = (start: Date, end: Date): [Date, Date] => {
      const _start = addDays(end, 1);
      if (this.isAllInterval(start, end)) return [start, end];
      if (this.isYearInterval(start, end)) return [_start, endOfYear(_start)];
      if (this.isMonthInterval(start, end)) return [_start, endOfMonth(_start)];
      return [
        _start,
        endOfDay(addDays(_start, this.getIntervalLength(start, end))),
      ];
    };

    // Loop and skip specified amount of times
    let result: [Date, Date] = _getNextInterval(start, end);
    for (let i = 0; i < skip; i++) {
      result = _getNextInterval(...result);
    }
    return result;
  }

  /**
   * Get the previous interval of the same length starting beforethe
   * provided interval
   */
  static getPreviousInterval(
    start: Date,
    end: Date,
    skip: number = 0
  ): [Date, Date] {
    // Actual implementation of getting previous interval
    const _getPreviousInterval = (start: Date, end: Date): [Date, Date] => {
      const _end = subDays(start, 1);
      if (this.isAllInterval(start, end)) return [start, end];
      if (this.isYearInterval(start, end)) return [startOfYear(_end), _end];
      if (this.isMonthInterval(start, end)) return [startOfMonth(_end), _end];
      return [
        endOfDay(subDays(_end, this.getIntervalLength(start, end))),
        _end,
      ];
    };

    // Loop and skip specified amount of times
    let result: [Date, Date] = _getPreviousInterval(start, end);
    for (let i = 0; i < skip; i++) {
      result = _getPreviousInterval(...result);
    }
    return result;
  }

  /**
   * Moves an interval (internally uses getPreviousInterval and getNextInterval)
   */
  static moveInterval(start: Date, end: Date, by: number): [Date, Date] {
    if (by >= 1) return this.getNextInterval(start, end, Math.abs(by) - 1);
    if (by <= -1) return this.getPreviousInterval(start, end, Math.abs(by) - 1);
    return [start, end];
  }

  /**
   * Get the interval containing all days
   */
  static getAllInterval(start: Date, end: Date): [Date, Date] {
    return [this.MINIMUM_DATE, this.MAXIMUM_DATE];
  }

  /**
   * Get the closest interval to the provided one which has a length
   * of a month
   */
  static getMonthInterval(start: Date, end: Date): [Date, Date] {
    const date = this.isAllInterval(start, end) ? new Date() : start;
    return [startOfMonth(date), endOfMonth(date)];
  }
  /**
   * Get the closest interval to the provided one which has a length
   * of a year
   */
  static getYearInterval(start: Date, end: Date): [Date, Date] {
    const date = this.isAllInterval(start, end) ? new Date() : start;
    return [startOfYear(date), endOfYear(date)];
  }

  /**
   * Check if the provided interval contains all days
   */
  static isAllInterval(start: Date, end: Date) {
    return (
      compareDate(start, "=", this.MINIMUM_DATE) &&
      compareDate(end, "=", this.MAXIMUM_DATE)
    );
  }

  /**
   * Check if the provided interval is a month
   */
  static isMonthInterval(start: Date, end: Date) {
    return (
      isSameMonth(start, end) &&
      isFirstDayOfMonth(start) &&
      isLastDayOfMonth(end)
    );
  }

  /**
   * Check if the provided interval is a year
   */
  static isYearInterval(start: Date, end: Date) {
    return (
      isSameYear(start, end) &&
      getDayOfYear(start) === 1 &&
      isSameDay(end, lastDayOfYear(end))
    );
  }

  /**
   * Check if the provided interval includes today
   */
  static intervalIncludesToday(start: Date, end: Date) {
    const today = new Date();
    return compareDate(today, ">=", start) && compareDate(today, "<=", end);
  }

  /**
   * Format the interval either as a raw or a smart string.
   */
  static formatInterval(type: "raw" | "smart", start: Date, end: Date): string {
    switch (type) {
      case "raw":
        const d1 = format(start, isSameYear(start, end) ? "d.M" : "d.M.yyyy");
        const d2 = format(end, "d.M.yyyy");
        return `${d1} - ${d2}`;
      case "smart":
        const today = new Date();

        if (this.isAllInterval(start, end)) {
          return "All";
        } else if (this.isYearInterval(start, end)) {
          return format(start, "yyyy");
        } else if (this.isMonthInterval(start, end)) {
          return isSameYear(today, start)
            ? format(start, "MMMM")
            : format(start, "MMM yyyy");
        } else {
          return this.formatInterval("raw", start, end);
        }
    }
  }
}

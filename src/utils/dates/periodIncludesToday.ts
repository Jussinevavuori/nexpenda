import { isSameMonth, isSameYear } from "date-fns";
import { getPeriodLength } from "./getPeriodLength";
import { getPeriodStartDate } from "./getPeriodStartDate";

export function periodIncludesToday(period: Period) {
  const startDate = getPeriodStartDate(period);
  const length = getPeriodLength(period);
  const today = new Date();

  switch (length) {
    case "all":
      return true;
    case "month":
      return isSameMonth(startDate, today);
    case "year":
      return isSameYear(startDate, today);
  }
}

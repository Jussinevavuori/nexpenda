import { format, isSameYear } from "date-fns";
import { getPeriodLength } from "./getPeriodLength";
import { getPeriodStartDate } from "./getPeriodStartDate";

export function formatPeriod(period: Period): string {
  const startDate = getPeriodStartDate(period);
  const isThisYear = isSameYear(new Date(), startDate);

  switch (getPeriodLength(period)) {
    case "all":
      return "All";
    case "year":
      return format(startDate, "yyyy");
    case "month":
      return format(startDate, isThisYear ? "MMMM" : "MMM yyyy");
  }
}

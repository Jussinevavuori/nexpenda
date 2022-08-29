import { IntervalLength } from "@/features/Interval/store/useIntervalStore";
import { isSameMonth, isSameYear } from "date-fns";

export function intervalIncludesToday(
  date: Date,
  intervalLength: IntervalLength
) {
  const today = new Date();

  switch (intervalLength) {
    case "all":
      return true;
    case "month":
      return isSameMonth(date, today);
    case "year":
      return isSameYear(date, today);
  }
}

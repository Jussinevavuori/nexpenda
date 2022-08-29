import { IntervalLength } from "@/features/Interval/store/useIntervalStore";
import { format, isSameYear } from "date-fns";

/**
 * Format the interval either as a raw or a smart string.
 */
export function formatDateInterval(
  date: Date,
  intervalLength: IntervalLength
): string {
  const isThisYear = isSameYear(new Date(), date);

  switch (intervalLength) {
    case "all":
      return "All";
    case "year":
      return format(date, "yyyy");
    case "month":
      return format(date, isThisYear ? "MMMM" : "MMM yyyy");
  }
}

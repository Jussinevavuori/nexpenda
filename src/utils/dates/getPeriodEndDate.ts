import { endOfMonth, endOfYear } from "date-fns";
import { getPeriodStartDate } from "./getPeriodStartDate";

export function getPeriodEndDate(period: Period): Date {
  if ("month" in period) return endOfMonth(getPeriodStartDate(period));
  if ("year" in period) return endOfYear(getPeriodStartDate(period));
  else return new Date(8_640_000_000_000_000);
}

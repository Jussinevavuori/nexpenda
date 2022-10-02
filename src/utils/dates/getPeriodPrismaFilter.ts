import { getPeriodEndDate } from "./getPeriodEndDate";
import { getPeriodLength } from "./getPeriodLength";
import { getPeriodStartDate } from "./getPeriodStartDate";

export function getPeriodPrismaFilter(period?: Period) {
  if (!period) return undefined;

  if (getPeriodLength(period) === "all") return undefined;

  return {
    gte: getPeriodStartDate(period),
    lte: getPeriodEndDate(period),
  };
}

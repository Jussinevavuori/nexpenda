export function getPeriodStartDate(period: Period): Date {
  if ("month" in period) return new Date(period.year, period.month, 1);
  if ("year" in period) return new Date(period.year, 0, 1);
  else return new Date(0);
}

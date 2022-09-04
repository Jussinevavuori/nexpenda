export function getPeriodLength(period: Period): PeriodLength {
  if ("month" in period) return "month";
  if ("year" in period) return "year";
  return "all";
}

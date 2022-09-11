export function getPeriodFromDate(date: Date) {
  return {
    monthPeriod: (): MonthPeriod => ({
      year: date.getFullYear(),
      month: date.getMonth(),
    }),
    yearPeriod: (): YearPeriod => ({ year: date.getFullYear() }),
    allPeriod: (): AllPeriod => ({}),
  };
}

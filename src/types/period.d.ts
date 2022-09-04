type AllPeriod = {};
type YearPeriod = { year: number };
type MonthPeriod = { year: number; month: number };

type Period = AllPeriod | YearPeriod | MonthPeriod;

type PeriodLength = "all" | "year" | "month";

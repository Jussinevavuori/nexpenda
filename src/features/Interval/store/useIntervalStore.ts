import {
  addMonths,
  addYears,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import create from "zustand";

export type IntervalLength = "month" | "year" | "all";

export interface IntervalState {
  date: Date;
  intervalLength: IntervalLength;

  forward: (by?: number) => void;
  back: (by?: number) => void;
  reset: () => void;
  changeTo: (length: IntervalLength) => void;
}

export const useIntervalStore = create<IntervalState>()((set) => ({
  date: startOfMonth(new Date()),
  intervalLength: "month",

  forward: (by?: number) =>
    set((state) => {
      switch (state.intervalLength) {
        case "all":
          return {};
        case "year":
          return { date: addYears(state.date, by ?? 1) };
        case "month":
          return { date: addMonths(state.date, by ?? 1) };
      }
    }),

  back: (by?: number) =>
    set((state) => {
      switch (state.intervalLength) {
        case "all":
          return {};
        case "year":
          return { date: subYears(state.date, by ?? 1) };
        case "month":
          return { date: subMonths(state.date, by ?? 1) };
      }
    }),

  reset: () => set((state) => ({ date: new Date() })),

  changeTo: (intervalLength: IntervalLength) =>
    set(() => ({
      intervalLength,
    })),
}));

export function useInterval(): [Date, Date] {
  const date = useIntervalStore((_) => _.date);
  const intervalLength = useIntervalStore((_) => _.intervalLength);

  switch (intervalLength) {
    case "all": {
      return [new Date("1970-01-01"), new Date("2999-12-31")];
    }
    case "month": {
      return [startOfMonth(date), endOfMonth(date)];
    }
    case "year": {
      return [startOfYear(date), endOfYear(date)];
    }
  }
}

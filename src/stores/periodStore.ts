import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { offsetPeriod } from "@/utils/dates/offsetPeriod";
import { getMonth, getYear } from "date-fns";
import produce from "immer";
import create from "zustand";

export interface PeriodState {
  period: Period;

  forward: (by?: number) => void;
  back: (by?: number) => void;
  reset: () => void;
  changeLength: (length: PeriodLength) => void;
}

export const usePeriodStore = create<PeriodState>()((set) => ({
  period: {
    month: getMonth(new Date()),
    year: getYear(new Date()),
  },

  forward: (by: number = 1) =>
    set(
      produce((draft: PeriodState) => {
        draft.period = offsetPeriod(draft.period, by);
      })
    ),

  back: (by: number = 1) =>
    set(
      produce((draft: PeriodState) => {
        draft.period = offsetPeriod(draft.period, -by);
      })
    ),

  reset: () =>
    set(
      produce((draft: PeriodState) => {
        switch (getPeriodLength(draft.period)) {
          case "month": {
            draft.period = {
              month: getMonth(new Date()),
              year: getYear(new Date()),
            };
            break;
          }
          case "year": {
            draft.period = {
              year: getYear(new Date()),
            };
            break;
          }
          case "all": {
            draft.period = {};
            break;
          }
        }
      })
    ),

  changeLength: (targetLength: PeriodLength) =>
    set(
      produce((draft: PeriodState) => {
        switch (targetLength) {
          case "month": {
            draft.period = {
              month: _lastSelectedMonth,
              year:
                "year" in draft.period ? draft.period.year : _lastSelectedYear,
            };
            break;
          }

          // Set to currently selected year or current year if all perido
          // currently selected.
          case "year": {
            draft.period = {
              year:
                "year" in draft.period ? draft.period.year : _lastSelectedYear,
            };
            break;
          }

          // Set period to all period
          case "all": {
            draft.period = {};
            break;
          }
        }
      })
    ),
}));

// Memorize last selected month and year
let _lastSelectedMonth = getMonth(new Date());
let _lastSelectedYear = getYear(new Date());
usePeriodStore.subscribe(({ period }) => {
  if ("month" in period) _lastSelectedMonth = period.month;
  if ("year" in period) _lastSelectedYear = period.year;
});

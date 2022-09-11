import { formatPeriod } from "../dates/formatPeriod";
import { getPeriodFromDate } from "../dates/getPeriodFromDate";

export function formatBudgetDate(budget: BudgetItem | Date) {
  return formatPeriod(
    getPeriodFromDate("date" in budget ? budget.date : budget).monthPeriod()
  );
}

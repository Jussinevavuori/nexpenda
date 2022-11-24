import { usePeriodStore } from "@/stores/periodStore";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { isPeriodPassed } from "@/utils/dates/isPeriodPassed";
import { trpc } from "@/utils/trpc";
import { BudgetSummaryEmpty } from "./components/BudgetSummaryEmpty";
import { BudgetSummaryForceMonth } from "./components/BudgetSummaryForceMonth";
import { BudgetSummaryHeader } from "./components/BudgetSummaryHeader";
import { BudgetSummarySkeleton } from "./components/BudgetSummarySkeleton";
import { CompletePeriodBudgetSummary } from "./components/CompletePeriodBudgetSummary";
import { IncompletePeriodBudgetSummary } from "./components/IncompletePeriodBudgetSummary";

export function BudgetSummary() {

	const period = usePeriodStore(_ => _.period);
	const { data: budget, isLoading: isLoadingBudget } = trpc.useQuery(["budgets.get", { period }]);
	const { data: summary, isLoading: isLoadingSummary } = trpc.useQuery(["budgets.summary.get", { period }]);

	return <div className="relative">

		<BudgetSummaryHeader />

		{
			getPeriodLength(period) !== "month"
				? <BudgetSummaryForceMonth />
				: (isLoadingBudget || isLoadingSummary)
					? <BudgetSummarySkeleton />
					: (budget && summary)
						? isPeriodPassed(period)
							? <CompletePeriodBudgetSummary budget={budget} summary={summary} />
							: <IncompletePeriodBudgetSummary budget={budget} summary={summary} />
						: <BudgetSummaryEmpty />
		}
	</div>
}
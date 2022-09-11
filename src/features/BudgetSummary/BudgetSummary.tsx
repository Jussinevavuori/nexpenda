import { usePeriodStore } from "@/stores/periodStore";
import { isPeriodPassed } from "@/utils/dates/isPeriodPassed";
import { trpc } from "@/utils/trpc";
import { BudgetSummaryHeader } from "./components/BudgetSummaryHeader";
import { BudgetSummarySkeleton } from "./components/BudgetSummarySkeleton";
import { CompletePeriodBudgetSummary } from "./components/CompletePeriodBudgetSummary";
import { IncompletePeriodBudgetSummary } from "./components/IncompletePeriodBudgetSummary";

export function BudgetSummary() {

	const period = usePeriodStore(_ => _.period);
	const { data: budget } = trpc.useQuery(["budgets.get", { period }]);
	const { data: summary } = trpc.useQuery(["budgets.summary.get", { period }]);

	return <div className="relative">

		<BudgetSummaryHeader />

		{
			(budget && summary)
				? isPeriodPassed(period)
					? <CompletePeriodBudgetSummary budget={budget} summary={summary} />
					: <IncompletePeriodBudgetSummary budget={budget} summary={summary} />
				: <BudgetSummarySkeleton />
		}


		<pre className="font-mono text-sm my-16">
			{JSON.stringify({ summary, budget }, null, 2).replace(/(\ \ )/g, "· ")}
		</pre>
	</div>

}
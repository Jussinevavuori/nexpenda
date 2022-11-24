import { EditBudgetButton } from "@/features/BudgetActions/EditBudgetButton";
import { usePeriodStore } from "@/stores/periodStore";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { trpc } from "@/utils/trpc";

export function BudgetSummaryHeader() {
	const period = usePeriodStore(_ => _.period);
	const { data: budget, isLoading: isLoadingBudget } = trpc.useQuery(["budgets.get", { period }]);

	return <div className="flex justify-between flex-wrap gap-x-12 gap-y-4 ">
		<div>
			<h2 className="text-lg font-semibold">
				{
					getPeriodLength(period) === "month"
						? isLoadingBudget
							? "Loading budget..."
							: budget
								? `${budget.name ?? "Untitled budget"}`
								: `No budget`
						: "Go to month view"
				}
			</h2>
		</div>
		<EditBudgetButton budget={budget} />
	</div>

}
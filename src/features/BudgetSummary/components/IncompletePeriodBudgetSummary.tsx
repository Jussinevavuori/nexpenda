import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { usePeriodStore } from "@/stores/periodStore";
import { formatBudgetDate } from "@/utils/budgets/formatBudgetDate";
import { getPeriodStartDate } from "@/utils/dates/getPeriodStartDate";
import { BudgetSummaryField } from "./BudgetSummaryField";
import { BudgetSummaryFieldCollection } from "./BudgetSummaryFieldCollection";
import { PeriodBudgetSummaryEntry } from "./PeriodBudgetSummaryEntry";

export type IncompletePeriodBudgetSummaryProps = {
	budget: BudgetItem;
	summary: BudgetSummary;
}

export function IncompletePeriodBudgetSummary({ summary }: IncompletePeriodBudgetSummaryProps) {

	const period = usePeriodStore(_ => _.period);

	return <div className="py-8 flex flex-col gap-4">

		<div className="border rounded-lg flex items-start gap-4 p-4 mb-4 max-w-xl">
			<Icon.Material icon="announcement" className="text-warning-500" />
			<div className="flex flex-col gap-1">
				<p className="text-sm font-medium">Some values are being estimated</p>
				<p className="text-sm text-black-2 dark:text-white-2">
					As {formatBudgetDate(getPeriodStartDate(period))} is not yet over,
					the values are estimated based on your income and expense estimates.
				</p>
			</div>
		</div>

		<BudgetSummaryFieldCollection>
			<BudgetSummaryField
				title="Amount currently left"
				value={summary.digested.estimatedLeftToSpendAmount}
				description="How much you have left to use this month. Assumes you at the least hit the estimated total incomes."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated final amount left"
				value={summary.digested.estimatedFinalAmount}
				description="How much you estimated to end up with this month."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>

		<Divider />

		<BudgetSummaryFieldCollection title="Incomes">
			<BudgetSummaryField
				title="Current total incomes"
				value={summary.incomes.total.currentAmount}
				description="How much you've actually gained income this month."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated total incomes"
				value={summary.incomes.total.estimatedAmount}
				description="How much you expected to gain income this month."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>


		<p className="text-sm text-black-3 dark:text-white-3 mt-2">
			Categorized
		</p>
		<ul className="flex flex-col gap-4 pb-2">
			{summary.incomes.entries.map(entry => <PeriodBudgetSummaryEntry variant="inc" entry={entry} key={entry.id} />)}
		</ul>
		<p className="text-sm text-black-3 dark:text-white-3">
			Uncategorized
		</p>
		<PeriodBudgetSummaryEntry variant="inc" entry={summary.incomes.uncaught} />

		<Divider />

		<BudgetSummaryFieldCollection title="Expenses">
			<BudgetSummaryField
				title="Current total expenses"
				value={summary.expenses.total.currentAmount}
				description="How much you've actually spent this month."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated total  expenses"
				value={summary.expenses.total.estimatedAmount}
				description="How much you expected to spend this month."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>


		<p className="text-sm text-black-3 dark:text-white-3 mt-2">
			Categorized
		</p>
		<ul className="flex flex-col gap-4 pb-2">
			{summary.expenses.entries.map(entry => <PeriodBudgetSummaryEntry variant="exp" entry={entry} key={entry.id} />)}
		</ul>
		<p className="text-sm text-black-3 dark:text-white-3">
			Uncategorized
		</p>
		<PeriodBudgetSummaryEntry variant="exp" entry={summary.expenses.uncaught} />

		<Divider />

		<BudgetSummaryFieldCollection title="Savings estimates">
			<BudgetSummaryField
				title="Savings target"
				value={summary.digested.savingsTarget}
				description="How much of the amount left each month you want to save."
				color="neutral"
				type="percentage"
			/>
			<BudgetSummaryField
				title="Estimated amount to save"
				value={summary.digested.estimatedFinalSavingsAmount}
				description="How much you should save to hit your savings target, assuming you hit the estimated final amount."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated amount left to spend"
				value={summary.digested.estimatedFinalSpendingAmount}
				description="How much you will have money to spend at the end of each month after saving, assuming you hit the estimated final amount."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>
	</div>
}
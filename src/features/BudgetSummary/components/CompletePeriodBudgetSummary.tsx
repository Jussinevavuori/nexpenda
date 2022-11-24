import { Divider } from "@/components/Divider/Divider";
import { BudgetSummaryField } from "./BudgetSummaryField";
import { BudgetSummaryFieldCollection } from "./BudgetSummaryFieldCollection";
import { PeriodBudgetSummaryEntry } from "./PeriodBudgetSummaryEntry";

export type CompletePeriodBudgetSummaryProps = {
	budget: BudgetItem;
	summary: BudgetSummary;
}

export function CompletePeriodBudgetSummary({ summary }: CompletePeriodBudgetSummaryProps) {
	return <div className="py-8 flex flex-col gap-4">

		<BudgetSummaryFieldCollection>
			<BudgetSummaryField
				title="Final amount"
				value={summary.digested.realFinalAmount}
				description="How much you have left to use this month. Assumes you at the least hit the estimated total incomes."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated final amount"
				value={summary.digested.estimatedFinalAmount}
				description="How much you estimated to end up with this month."
				color="neutral"
				type="money"
			/>
		</BudgetSummaryFieldCollection>

		<Divider />

		<BudgetSummaryFieldCollection title="Incomes">
			<BudgetSummaryField
				title="Total income"
				value={summary.incomes.total.currentAmount}
				description="How much you've actually gained income this month."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated total"
				value={summary.incomes.total.estimatedAmount}
				description="How much you expected to gain income this month."
				color="neutral"
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
				title="Total expenses"
				value={summary.expenses.total.currentAmount}
				description="How much you've actually spent this month."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated total"
				value={summary.expenses.total.estimatedAmount}
				description="How much you expected to spend this month."
				color="neutral"
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
				title="Amount to save"
				value={summary.digested.realFinalSavingsAmount}
				description="How much you should save to hit your savings target, assuming you hit the estimated final amount."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated amount to save"
				value={summary.digested.estimatedFinalSavingsAmount}
				description="How much you should save to hit your savings target, assuming you hit the estimated final amount."
				color="neutral"
				type="money"
			/>
			<BudgetSummaryField
				title="Left to spend"
				value={summary.digested.realFinalSpendingAmount}
				description="How much you will have money to spend at the end of each month after saving, assuming you hit the estimated final amount."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated left to spend"
				value={summary.digested.estimatedFinalSpendingAmount}
				description="How much you will have money to spend at the end of each month after saving, assuming you hit the estimated final amount."
				color="neutral"
				type="money"
			/>
		</BudgetSummaryFieldCollection>
	</div>
}
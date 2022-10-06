import { Divider } from "@/components/Divider/Divider";
import { BudgetSummaryField } from "./BudgetSummaryField";
import { BudgetSummaryFieldCollection } from "./BudgetSummaryFieldCollection";

export type IncompletePeriodBudgetSummaryProps = {
	budget: BudgetItem;
	summary: BudgetSummary;
}

export function IncompletePeriodBudgetSummary({ summary }: IncompletePeriodBudgetSummaryProps) {

	return <div className="py-8 flex flex-col gap-4">

		<BudgetSummaryFieldCollection>
			<BudgetSummaryField
				title="Amount currently left"
				value={summary.digested.estimatedLeftToSpendAmount}
				description="How much you have left to use this month. Assumes you at the least hit the estimated total incomes."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated final amount"
				value={summary.digested.estimatedFinalAmount}
				description="How much you estimated to end up with this month."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>

		<Divider />

		<BudgetSummaryFieldCollection title="Incomes">
			<BudgetSummaryField
				title="Current total"
				value={summary.incomes.total.currentAmount}
				description="How much you've actually gained income this month."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated total"
				value={summary.incomes.total.estimatedAmount}
				description="How much you expected to gain income this month."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>

		<ul className="flex flex-col gap-4 py-2">
			{summary.incomes.entries.map(entry => <li key={entry.id}>
				{entry.category.name}
			</li>)}

			<li>
				{"Uncaught"}
			</li>
		</ul>

		<Divider />

		<BudgetSummaryFieldCollection title="Expenses">
			<BudgetSummaryField
				title="Current total"
				value={summary.expenses.total.currentAmount}
				description="How much you've actually spent this month."
				color="auto"
				type="money"
			/>
			<BudgetSummaryField
				title="Estimated total"
				value={summary.expenses.total.estimatedAmount}
				description="How much you expected to spend this month."
				color="auto"
				type="money"
			/>
		</BudgetSummaryFieldCollection>

		<ul className="flex flex-col gap-4 py-2">
			{summary.expenses.entries.map(entry => <li key={entry.id}>
				{entry.category.name}
			</li>)}

			<li>
				{"Uncaught"}
			</li>
		</ul>

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
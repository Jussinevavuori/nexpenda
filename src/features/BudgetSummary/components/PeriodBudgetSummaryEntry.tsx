import { Chip } from "@/components/Chip/Chip";
import { getCategoryLabel } from "@/utils/category/getCategoryLabel";
import { formatMoney } from "@/utils/currency/formatMoney";

export type PeriodBudgetSummaryEntryProps = {
	entry: Unwrap<BudgetSummary["incomes"]["entries"]> | BudgetSummary["incomes"]["uncaught"]
	variant: "inc" | "exp";
}

function flipVariant(variant: "inc" | "exp", flip: boolean) {
	return flip ? (variant === "inc" ? "exp" : "inc") : variant;
}

export function PeriodBudgetSummaryEntry({ entry, variant }: PeriodBudgetSummaryEntryProps) {

	if (!("category" in entry)) {
		return <li
			className="py-3 md:py-2 px-4 border rounded-lg flex flex-row items-center gap-3 justify-between"
		>
			<p className="flex items-center gap-2">
				<span className="font-medium d-exp:text-rose-600 d-inc:text-emerald-600" data-sign={flipVariant(variant, entry.amount < 0)}>
					{formatMoney(entry.amount)}
				</span>
			</p>
			<span className="text-sm font-medium text-black-4 dark:text-white-4">
				{entry.count} transactions
			</span>
		</li>
	}

	return <li
		className="border rounded-lg flex flex-col md:flex-row"
	>
		<div className="md:flex-1 bg-slate-50 border-b sm:border-b-0 border-r dark:bg-black-3 py-2 px-4">
			{getCategoryLabel(entry.category, variant === "exp" ? "-" : "+")}
		</div>
		<div className="md:flex-[3] py-2 px-4 flex flex-col justify-start md:flex-row md:justify-between gap-1">
			<p className="flex items-center gap-2">
				<span
					data-sign={entry.currentAmount >= entry.estimatedAmount ? "inc" : "exp"}
					className="font-medium d-exp:text-rose-600 d-inc:text-emerald-600"
				>
					{formatMoney(Math.abs(entry.currentAmount))}
				</span>
				<span className="text-black-4 dark:text-white-4 text-xs">
					/
				</span>
				<span className="font-medium text-black-3 dark:text-white-3">
					{formatMoney(Math.abs(entry.estimatedAmount))}
				</span>
			</p>

			<p className="flex items-center gap-6 w-full justify-between md:w-auto">
				<span className="text-sm font-medium text-black-4 dark:text-white-4">
					{entry.count} transactions
				</span>
				<span
					data-sign={(variant === "inc" ? entry.currentPercentage < 100 : entry.currentPercentage > 100) ? "exp" : "inc"}
					className="font-medium d-exp:text-rose-600 text-emerald-600"
				>
					{entry.currentPercentage.toFixed(1)} %
				</span>
			</p>
		</div>
	</li>
}
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";

export function BudgetSummarySkeleton() {

	return <div className="flex-col items-center absolute left-1/2 -translate-1/2 py-8">
		<div className="flex items-center justify-center">
			<LoadingSpinner variant="puff" />
		</div>
		<p className="text-black-2 dark:text-white-2 pt-2">Loading...</p>
	</div>

}
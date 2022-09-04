import { TransactionActions } from "@/features/TransactionActions/TransactionActions";
import { usePeriodStore } from "@/stores/periodStore";
import { formatPeriod } from "@/utils/dates/formatPeriod";

export function TransactionTableBodyEmpty() {
	const period = usePeriodStore(_ => _.period);

	return <div className="border border-slate-300 dark:border-slate-700 border-dashed rounded-lg p-6 mt-10 flex flex-col items-center gap-6 mx-auto text-center max-w-[300px]">
		<p className="text-slate-700 dark:text-slate-400">
			You don't have transactions for {formatPeriod(period)}
			{/* TODO: Add this back */}
			{/* {search.filter.isEmpty() ? " " : " matching your search "} */}
		</p>

		<TransactionActions.Create />
	</div>
}
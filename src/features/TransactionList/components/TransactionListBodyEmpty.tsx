import { TransactionActions } from "@/features/TransactionActions/TransactionActions";
import { usePeriodStore } from "@/stores/periodStore";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { formatPeriod } from "@/utils/dates/formatPeriod";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";

export interface TransactionListBodyEmptyProps {

}

export function TransactionListBodyEmpty(props: TransactionListBodyEmptyProps) {
	const period = usePeriodStore(_ => _.period);
	const query = useActiveQuery();

	return <div className="border border-slate-300 dark:border-slate-700 border-dashed rounded-lg p-4 mt-6 flex flex-col items-center gap-6 mx-auto text-center max-w-[300px]">
		<p className="text-slate-700 dark:text-slate-400">
			You don't have transactions
			{query.trim() ? "" : " matching your search"}
			{getPeriodLength(period) === "all" ? "" : ` ${formatPeriod(period)}`}
		</p>

		<TransactionActions.Create />
	</div>

}
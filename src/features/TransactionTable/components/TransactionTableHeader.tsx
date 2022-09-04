import { Icon } from '@/components/Icon/Icon';
import { usePeriodStore } from '@/stores/periodStore';
import { useTransactionSortStore } from '@/stores/transactionSortStore';
import { c } from '@/utils/generic/classnames';
import { trpc } from '@/utils/trpc';
import { useSelectedTransactions, useTransactionSelectionStore } from '../../../stores/transactionSelectionStore';
import { TransactionTableHeaderTab } from './TransactionTableHeaderTab';

export function TransactionTableHeader() {
	const period = usePeriodStore(_ => _.period)
	const { data: transactions } = trpc.useQuery(["transactions.list", { period }])

	const selectMany = useTransactionSelectionStore(_ => _.selectMany);
	const toggleSelectAll = () => selectMany((transactions ?? []).map(_ => _.id));

	const selectedTransactions = useSelectedTransactions((transactions ?? []))
	const noneSelected = selectedTransactions.length === 0;
	const allSelected = selectedTransactions.length === (transactions ?? []).length;

	const sort = useTransactionSortStore();

	return <div className="px-6 w-full h-full grid grid-cols-[3.5rem_6fr_4fr_8fr_3fr]">
		<TransactionTableHeaderTab onClick={() => toggleSelectAll()}>
			<Icon
				className={c.if(noneSelected)("text-slate-400 dark:text-slate-500").else("text-primary-600")}
				icon={c.if(noneSelected)("check_box_outline_blank").elseIf(allSelected)("check_box").else("indeterminate_check_box")}
			/>
		</TransactionTableHeaderTab>

		<TransactionTableHeaderTab
			label="Category"
			sortProperty="category"
			sortDirection={sort.property === "category" ? sort.direction : "none"}
			onClick={() => sort.toggle("category")}
		/>

		<TransactionTableHeaderTab
			label="Amount"
			sortProperty="amount"
			sortDirection={sort.property === "amount" ? sort.direction : "none"}
			onClick={() => sort.toggle("amount")}
		/>

		<TransactionTableHeaderTab
			label="Comment"
			sortProperty="comment"
			sortDirection={sort.property === "comment" ? sort.direction : "none"}
			onClick={() => sort.toggle("comment")}
		/>

		<TransactionTableHeaderTab
			label="Date"
			sortProperty="date"
			sortDirection={sort.property === "date" ? sort.direction : "none"}
			onClick={() => sort.toggle("date")}
		/>
	</div>

}
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { TransactionActions } from '@/features/TransactionActions/TransactionActions';
import { useTransactionsSummary } from '@/hooks/useTransactionsSummary';
import { formatMoney } from '@/utils/currency/formatMoney';
import { c } from '@/utils/generic/classnames';
import { pluralize } from '@/utils/generic/pluralize';
import { useTransactionSelectionStore } from '../../stores/transactionSelectionStore';

export type TransactionSelectionToolsProps = {
	transactions: TransactionItem[];
}

export function TransactionSelectionTools(props: TransactionSelectionToolsProps) {
	const selection = useTransactionSelectionStore(_ => _.selection);
	const clear = useTransactionSelectionStore(_ => _.clear);
	const summary = useTransactionsSummary(props.transactions, selection);

	return <div className="pt-2 pb-3 px-4 bg-white dark:bg-slate-800 flex flex-col gap-2 shadow-lg border border-slate-100 dark:border-slate-840 rounded-lg">

		<div className="flex items-center justify-between">
			<p className="flex items-baseline gap-2">
				<span className="text-sm">
					Selected {selection.size} {pluralize(selection.size === 1, "transaction")}
				</span>
				<span className={c("text-sm font-semibold", summary.total.selected >= 0 ? "text-emerald-600" : "text-rose-500")}>
					({formatMoney(summary.total.selected)})
				</span>
			</p>

			<IconButton variant="text" className="-mt-1 -mr-2" onClick={() => clear()}>
				<Icon.Material icon="close" />
			</IconButton>
		</div>

		<div className="flex gap-4">
			<TransactionActions.Edit transactions={props.transactions} />
			<TransactionActions.Copy transactions={props.transactions} />
			<TransactionActions.Delete transactions={props.transactions} />
		</div>
	</div >
}
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
	list?: boolean;
}

export function TransactionSelectionTools(props: TransactionSelectionToolsProps) {
	const selection = useTransactionSelectionStore(_ => _.selection);
	const clear = useTransactionSelectionStore(_ => _.clear);
	const summary = useTransactionsSummary(props.transactions, selection);

	return <div className="pt-2 pb-3 px-4 bg-white-bg dark:bg-black-bg flex flex-col gap-2 shadow-lg border border-white-bg-2 dark:border-black-bg-1 rounded-t-lg d:rounded-lg">

		<div className="flex items-baseline d:items-center justify-between m:gap-2 m:pb-1">
			<p className="flex flex-1 items-baseline m:justify-between gap-2">
				<span className="d:text-sm text-black-3 dark:text-white-3">
					Selected {selection.size} {pluralize(selection.size, "transaction")}
				</span>
				<span className={c("d:text-sm font-semibold m:ml-auto", summary.total.selected >= 0 ? "text-success" : "text-danger")}>
					{formatMoney(summary.total.selected)}
				</span>
			</p>

			{
				!props.list &&
				<IconButton variant="text" className="-mt-1 -mr-2" onClick={() => clear()}>
					<Icon.Material icon="close" />
				</IconButton>
			}
		</div>

		<div className="flex items-center gap-4">
			<TransactionActions.Edit icon={props.list} transactions={props.transactions} />
			<TransactionActions.Copy icon={props.list} transactions={props.transactions} />
			<TransactionActions.Delete icon={props.list} transactions={props.transactions} />
			{
				props.list && <TransactionActions.SelectAll icon={props.list} transactions={props.transactions} />
			}

			{
				props.list &&
				<IconButton
					variant="flat"
					className="ml-auto"
					color="monochrome"
					onClick={() => clear()}
				>
					<Icon.Material icon="close" />
				</IconButton>
			}
		</div>
	</div >
}
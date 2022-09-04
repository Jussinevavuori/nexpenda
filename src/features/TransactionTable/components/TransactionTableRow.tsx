import { Icon } from '@/components/Icon/Icon';
import { useShouldFlashTransaction } from '@/stores/transactionFlashStore';
import { getCategoryLabel } from '@/utils/category/getCategoryLabel';
import { formatMoney } from '@/utils/currency/formatMoney';
import { formatDateString } from '@/utils/dates/formatDateString';
import { c } from '@/utils/generic/classnames';
import { isFuture } from 'date-fns';
import { useTransactionSelectionStore } from '../../../stores/transactionSelectionStore';
import { TransactionTableCell } from './TransactionTableCell';

export interface TransactionTableRowProps {
	transaction: TransactionItem;
}

export function TransactionTableRow(props: TransactionTableRowProps) {
	const isSelected = useTransactionSelectionStore(_ => _.selection).has(props.transaction.id);
	const select = useTransactionSelectionStore(_ => _.select);
	const isFlashing = useShouldFlashTransaction(props.transaction)

	return <div
		data-transactionid={props.transaction.id}
		onClick={(ev) => {
			if (ev.shiftKey) ev.preventDefault();
			select(props.transaction.id, ev.ctrlKey || ev.metaKey)
		}}
		className={c("px-6 relative w-full h-full grid grid-cols-[3.5rem_6fr_4fr_8fr_3fr] hover:bg-slate-100 dark:hover:bg-slate-860")}
	>

		{isFlashing && <div className={c("flasher")} />}

		<TransactionTableCell className="cursor-pointer">
			<Icon.Material
				className={isSelected ? "text-primary-600" : "text-slate-400 dark:text-slate-500"}
				icon={isSelected ? "check_box" : "check_box_outline_blank"}
			/>
		</TransactionTableCell>

		<TransactionTableCell>
			<p className={c("max-w-full truncate text-sm font-semibold dark:text-slate-100")}>
				{getCategoryLabel(props.transaction.category, props.transaction.amount)}
			</p>
		</TransactionTableCell>

		<TransactionTableCell>
			<p className={c("max-w-full truncate text-sm ml-auto font-semibold", props.transaction.amount < 0 ? "text-rose-500" : "text-emerald-600")}>
				{formatMoney(props.transaction.amount)}
			</p>
		</TransactionTableCell>

		<TransactionTableCell>
			<p className="max-w-full truncate flex items-center gap-2">
				{
					isFuture(props.transaction.time) &&
					<span className="text-xs bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-300 px-2 py-1 rounded">
						Upcoming
					</span>
				}
				<span className="text-sm text-slate-600 dark:text-slate-400">
					{props.transaction.comment}
				</span>
			</p>
		</TransactionTableCell>

		<TransactionTableCell>
			{
				props.transaction.scheduleId &&
				<Icon.Material icon="update" className="text-slate-400 dark:text-slate-600" />
			}
			<p className="max-w-full truncate text-sm ml-auto mr-4 dark:text-slate-100">
				{formatDateString(props.transaction.time)}
			</p>
		</TransactionTableCell>
	</div>
}
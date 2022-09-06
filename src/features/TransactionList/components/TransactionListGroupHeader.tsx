import useLongPress from "@/hooks/useLongPress";
import { useTransactionSelectionStore } from "@/stores/transactionSelectionStore";
import { compareDate } from "@/utils/dates/compareDate";
import { formatDateString } from "@/utils/dates/formatDateString";
import { c } from "@/utils/generic/classnames";

export interface TransactionListGroupHeaderProps {
	date: Date;
	transactions: TransactionItem[];
}

export function TransactionListGroupHeader(props: TransactionListGroupHeaderProps) {
	const selectMany = useTransactionSelectionStore(_ => _.selectMany)

	const longPress = useLongPress(() => {
		selectMany(props.transactions.filter(_ => compareDate(_.time, "=", props.date)).map(_ => _.id), true)
	})

	return <div
		{...longPress.props}
		className={c(c.if(longPress.pressed)("bg-white-bg-2 dark:bg-black-bg-2 transition-colors duration-[300ms]"))}
	>
		<p className="text-sm text-slate-500 px-6 pb-1 pt-3">
			{formatDateString(props.date)}
		</p>
	</div>

}
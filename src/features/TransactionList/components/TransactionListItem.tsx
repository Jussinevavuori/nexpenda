import { HoverOverlay } from "@/components/HoverOverlay/HoverOverlay";
import { Icon } from "@/components/Icon/Icon";
import { useShouldFlashTransaction } from "@/stores/transactionFlashStore";
import { useTransactionSelectionStore } from "@/stores/transactionSelectionStore";
import { getDefaultedCategoryIcon } from "@/utils/category/getDefaultedCategoryIcon";
import { formatMoney } from "@/utils/currency/formatMoney";
import { c } from "@/utils/generic/classnames";
import { lineClamp } from "@/utils/styles/lineClamp";
import { isFuture } from "date-fns";

const { motion, AnimatePresence } = require("framer-motion")

export interface TransactionListItemProps {
	transaction: TransactionItem;
}

export function TransactionListItem({ transaction }: TransactionListItemProps) {

	const select = useTransactionSelectionStore(_ => _.select);
	const selection = useTransactionSelectionStore(_ => _.selection);
	const isSelected = selection.has(transaction.id);
	const isUpcoming = isFuture(transaction.time);
	const isFlashing = useShouldFlashTransaction(transaction)

	return <div
		className={c(
			"px-6 py-2 relative group flex items-center gap-4 hover:bg-white-bg-2 dark:hover:bg-black-bg-3",
			c
				.if(isSelected)("bg-white-bg-3 dark:bg-black-bg-4")
				.elseIf(isUpcoming)("opacity-80")
		)}
		onClick={(ev) => {
			if (ev.shiftKey) ev.preventDefault();
			select(transaction.id, true)
		}}
	>
		{isFlashing && <div className={c("flasher")} />}

		<div className={c(
			"relative w-12 h-12 bg-white-bg-4 dark:bg-black-bg-4 rounded-full flex items-center justify-center",
		)}>
			<span className={c(
				"text-2xl",
				c.if(isSelected)("opacity-0").else("opacity-70"),
				c.if(!isSelected && isUpcoming)("grayscale")
			)}>
				{getDefaultedCategoryIcon(transaction.category, transaction.amount)}
			</span>

			<AnimatePresence>
				{
					isSelected && <motion.div
						initial={{ opacity: 0, scale: 0, transition: { delay: 0.0 } }}
						animate={{ opacity: 1, scale: 1, transition: { delay: 0.0 } }}
						exit={{ opacity: 0, scale: 0, transition: { delay: 0.1 } }}
						className="rounded-full absolute inset-0 bg-primary-500 flex items-center justify-center"
					>
						<motion.span
							initial={{ opacity: 0, rotate: "0deg", scale: 0, transition: { delay: 0.1 } }}
							animate={{ opacity: 1, rotate: "360deg", scale: 1, transition: { delay: 0.1 } }}
							exit={{ opacity: 0, rotate: "720deg", scale: 0, transition: { delay: 0.0 } }}
						>
							<Icon icon="check" className="text-white" />
						</motion.span>
					</motion.div>
				}
			</AnimatePresence>
		</div>

		<div className={c(
			"flex-1 flex flex-col items-stretch"
		)}>
			<p className="text-black dark:text-white font-semibold" style={lineClamp(1)}>
				{transaction.category.name}
			</p>
			<p className="text-slate-700 dark:text-slate-300" style={lineClamp(1)}>
				{
					isUpcoming &&
					<span className="mr-2 text-xs bg-white-bg-3 dark:bg-black-bg-5 text-slate-800 dark:text-slate-300 px-2 py-1 rounded">
						Upcoming
					</span>
				}
				{transaction.comment}
			</p>
		</div>

		<div className={c(
			"text-xl font-semibold whitespace-nowrap",
			transaction.amount > 0 ? "text-success" : "text-danger"
		)}>
			{formatMoney(transaction.amount)}
		</div>

	</div >

}
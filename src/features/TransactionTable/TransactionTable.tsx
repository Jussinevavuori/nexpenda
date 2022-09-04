/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { trpc } from "@/utils/trpc";
import { useMemo, useRef } from "react";
import { usePeriodStore } from "../../stores/periodStore";
import { TransactionTableLoadingBar } from "./components/TransactionTableLoadingBar";
import { useVirtual } from '@tanstack/react-virtual';
import { TransactionTableBodyEmpty } from "./components/TransactionTableBodyEmpty";
import { useSelectedTransactions } from "../../stores/transactionSelectionStore";
import { TransactionContextMenu } from "../TransactionContextMenu/TransactionContextMenu";
import { TransactionTableRow } from "./components/TransactionTableRow";
import { TransactionTableHeader } from "./components/TransactionTableHeader";
import { TransactionSelectionTools } from "../TransactionSelectionTools/TransactionSelectionTools";
import { useTransactionSortStore } from "@/stores/transactionSortStore";
import { sortTransactions } from "@/utils/transaction/sortTransactions";
import { filterTransactions } from "@/utils/transaction/filterTransactions";
import { useAtomValue } from "jotai";
import { transactionSearchAtom } from "@/stores/transactionSearchAtom";

// eslint-disable-next-line
const { motion, AnimatePresence } = require("framer-motion")

export type TransactionTableProps = {
	disableBottomPadding?: boolean;
	disableTools?: boolean;
}

const estimateSize = () => 40

export const TransactionTable = Object.assign(function TransactionTable(props: TransactionTableProps) {
	const period = usePeriodStore(_ => _.period)
	const sortDirection = useTransactionSortStore(_ => _.direction);
	const sortProperty = useTransactionSortStore(_ => _.property);
	const query = useAtomValue(transactionSearchAtom);

	// Fetch, filter and sort transactions
	const { data: transactions, isFetching } = trpc.useQuery(["transactions.list", { period }])
	const filteredTransactions = useMemo(() => filterTransactions(transactions ?? [], query), [transactions, query])
	const sortedTransactions = useMemo(() => sortTransactions(filteredTransactions ?? [], sortDirection, sortProperty), [filteredTransactions, sortDirection, sortProperty])
	const selectedTransactions = useSelectedTransactions(transactions ?? []);

	// Virtualized list
	const parentRef = useRef<HTMLDivElement | null>(null);
	const virtualList = useVirtual({
		size: sortedTransactions?.length ?? 0,
		parentRef,
		estimateSize,
		overscan: 2,
		paddingEnd: props.disableBottomPadding ? 0 : 120
	});


	return <div
		ref={parentRef}
		className="dark:bg-slate-820 relative w-full h-full overflow-auto"
	>
		<TransactionTableLoadingBar isFetching={isFetching} />

		<ul
			className="absolute inset-0 min-h-full"
			style={{ height: virtualList.totalSize }}
		>
			{
				transactions?.length === 0
					? <TransactionTableBodyEmpty />
					: transactions && virtualList.virtualItems.map(row => {
						return <li
							key={row.index}
							className="absolute top-0 left-0 w-full"
							style={{ height: row.size, transform: `translateY(${row.start}px)` }}
						>
							<TransactionContextMenu transaction={sortedTransactions[row.index]!}>
								<TransactionTableRow transaction={sortedTransactions[row.index]!} />
							</TransactionContextMenu>
						</li>
					})
			}

			<p className="absolute py-12 w-full text-sm text-center bottom-0 text-slate-400 dark:text-slate-600">
				No more transactions.
			</p>
		</ul>

		<AnimatePresence>
			{
				!props.disableTools && selectedTransactions.length > 0 &&
				<motion.div className="fixed bottom-0 p-4" initial={{ y: 200, opacity: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 200 }}>
					<TransactionSelectionTools transactions={transactions ?? []} />
				</motion.div>
			}
		</AnimatePresence>
	</div>

}, {
	Header: TransactionTableHeader,
});
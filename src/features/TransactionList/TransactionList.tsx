import { useVirtual } from '@tanstack/react-virtual';
import { useOpenState } from "@/hooks/useOpenState";
import { usePeriodStore } from "@/stores/periodStore";
import { useSelectedTransactions, useTransactionSelectionStore } from "@/stores/transactionSelectionStore";
import { flatGroupByDate } from "@/utils/dates/flatGroupByDate";
import { periodIncludesToday } from "@/utils/dates/periodIncludesToday";
import { divide } from "@/utils/generic/group";
import { sortTransactions } from "@/utils/transaction/sortTransactions";
import { trpc } from "@/utils/trpc";
import { isFuture } from "date-fns";
import { memo, useCallback, useMemo, useRef } from "react";
import { TransactionListLoadingBar } from './components/TransactionListLoadingBar';
import { IconButton } from '@/components/IconButton/IconButton';
import { Icon } from '@/components/Icon/Icon';
import { TransactionListBodyEmpty } from './components/TransactionListBodyEmpty';
import { TransactionListGroupHeader } from './components/TransactionListGroupHeader';
import { TransactionListItem } from './components/TransactionListItem';
import { TransactionSelectionTools } from '../TransactionSelectionTools/TransactionSelectionTools';
import { useActiveQuery } from '@/stores/transactionSearchAtom';
import { useOnKeyCombination } from '@/hooks/useOnKeyCombination';

// eslint-disable-next-line
const { motion, AnimatePresence } = require("framer-motion")

export interface TransactionListProps {
	disableBottomPadding?: boolean;
	disableTools?: boolean;
}

export const TransactionList = Object.assign(memo(function TransactionList(props: TransactionListProps) {
	const period = usePeriodStore(_ => _.period)
	const query = useActiveQuery();

	// Fetch, filter and sort transactions
	const { data: transactions, isFetching } = trpc.useQuery(["transactions.list", query ? { query } : { period }])
	const sortedTransactions = useMemo(() => sortTransactions(transactions ?? [], "desc", "date"), [transactions])
	const selectedTransactions = useSelectedTransactions(transactions ?? []);

	// Upcoming toggle: open state for upcoming items and enable upcoming items
	// when there are some and the user is in the current interval
	const upcomingSection = useOpenState();
	const upcomingCount = useMemo(() => sortedTransactions.filter(_ => isFuture(_.time)).length, [sortedTransactions])
	const enableUpcomingToggle = useMemo(() => periodIncludesToday(period) && upcomingCount > 0, [period, upcomingCount]);

	// Group transactions into always shown transactions and upcoming transactions
	// if the upcoming transactions section has been enabled
	const { visible: visibleTransactions, upcoming: upcomingTransactions } = useMemo(() => {
		return divide(
			sortedTransactions,
			(t) => enableUpcomingToggle && isFuture(t.time) ? "upcoming" : "visible"
		)
	}, [sortedTransactions, enableUpcomingToggle])

	// Grouped transactions, where upcoming items have been removed if they
	// are enabled and grouped transactions for upcoming transaction group items
	const transactionGroupItems = useMemo(() => {
		return flatGroupByDate(visibleTransactions ?? [], t => t.time, { sort: true })
	}, [visibleTransactions])
	const upcomingTransactionGroupItems = useMemo(() => {
		return flatGroupByDate(upcomingTransactions ?? [], t => t.time, { sort: true })
	}, [upcomingTransactions])

	// Size estimators for transaction group items
	const estimateSize = useCallback((index: number) => {
		const item = transactionGroupItems[index];
		return item?.type === "groupHeader" ? 40 : 64;
	}, [transactionGroupItems])

	// Virtualized list
	const listContainerRef = useRef<HTMLDivElement | null>(null);
	const virtualList = useVirtual({
		size: transactionGroupItems.length,
		parentRef: listContainerRef,
		estimateSize,
		overscan: 2,
		paddingEnd: props.disableBottomPadding ? 0 : 120
	});

	// Select / deselect all
	const selectMany = useTransactionSelectionStore(_ => _.selectMany);
	const clearSelection = useTransactionSelectionStore(_ => _.clear);
	const selectAll = () => selectMany(sortedTransactions.map(_ => _.id), true)
	useOnKeyCombination({ key: "a", shift: true }, selectAll)
	useOnKeyCombination({ key: "d", shift: true }, clearSelection)

	return <div
		ref={listContainerRef}
		className="relative w-full h-full overflow-auto"
	>
		<TransactionListLoadingBar isFetching={isFetching} />

		{
			enableUpcomingToggle &&
			<div onClick={() => upcomingSection.toggle()} className="cursor-pointer px-6 flex items-center justify-between">
				<p className="text-sm text-black-3 dark:text-white-3">
					{upcomingSection.isOpen ? "Hide" : "Show"} {upcomingCount} upcoming
				</p>
				<IconButton variant="text" className="-mr-4" color="primary">
					<motion.div animate={{ rotate: upcomingSection.isOpen ? "0deg" : "180deg" }}>
						<Icon icon="expand_less" />
					</motion.div>
				</IconButton>
			</div>
		}

		<AnimatePresence>
			{
				upcomingSection.isOpen && enableUpcomingToggle &&
				<motion.ul
					initial={{ scaleY: 0, opacity: 0 }}
					animate={{ scaleY: 1, opacity: 1 }}
					exit={{ scaleY: 0, opacity: 0, height: 0, padding: 0 }}
					className="origin-top flex flex-col items-stretch overflow-y-auto pb-4 after:bg-slate-200 dark:after:bg-slate-760 after:h-px after:mx-6 after:w-[calc(100%_-_48px)] after:translate-y-2"
				>
					{
						upcomingTransactionGroupItems.map((item) => {
							return <li key={item.type === "item" ? item.value.id : item.value.toUTCString()}>
								{
									item.type === "groupHeader"
										? <TransactionListGroupHeader transactions={sortedTransactions} date={item.value} />
										: <TransactionListItem transaction={item.value} />
								}
							</li>
						})
					}
				</motion.ul>
			}
		</AnimatePresence>

		<motion.ul
			initial={false}
			layout="position"
			className="flex flex-col items-stretch overflow-y-auto relative"
			style={{ height: Math.max(virtualList.totalSize, 200) }}
		>
			{
				transactions?.length === 0
					? <TransactionListBodyEmpty />
					: transactions && virtualList.virtualItems.map((row) => {
						// eslint-disable-next-line
						const item = transactionGroupItems[row.index]!
						return <li
							key={row.index}
							className="absolute top-0 left-0 w-full"
							style={{ height: row.size, transform: `translateY(${row.start}px)` }}
						>
							{
								item.type === "groupHeader"
									? <TransactionListGroupHeader transactions={sortedTransactions} date={item.value} />
									: <TransactionListItem transaction={item.value} />
							}
						</li>
					})
			}

			{
				(transactions?.length ?? 0) > 0 &&
				<p className="absolute py-12 w-full text-sm text-center bottom-0 text-slate-400 dark:text-slate-600">
					No more transactions.
				</p>
			}

		</motion.ul>

		<AnimatePresence>
			{
				!props.disableTools && selectedTransactions.length > 0 &&
				<motion.div
					className="fixed bottom-0 pb-tabs w-full"
					initial={{ y: 50 }}
					animate={{ y: 0 }}
					exit={{ y: 200 }}
				>
					<TransactionSelectionTools list transactions={sortedTransactions} />
				</motion.div>
			}
		</AnimatePresence>
	</div>
}), {

})
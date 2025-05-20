/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { trpc } from "@/utils/trpc";
import { useMemo, useRef } from "react";
import { usePeriodStore } from "../../stores/periodStore";
import { TransactionTableLoadingBar } from "./components/TransactionTableLoadingBar";
import { useVirtual } from "@tanstack/react-virtual";
import { TransactionTableBodyEmpty } from "./components/TransactionTableBodyEmpty";
import {
  useSelectedTransactions,
  useTransactionSelectionStore,
} from "../../stores/transactionSelectionStore";
import { TransactionContextMenu } from "../TransactionContextMenu/TransactionContextMenu";
import { TransactionTableRow } from "./components/TransactionTableRow";
import { TransactionTableHeader } from "./components/TransactionTableHeader";
import { TransactionSelectionTools } from "../TransactionSelectionTools/TransactionSelectionTools";
import { useTransactionSortStore } from "@/stores/transactionSortStore";
import { sortTransactions } from "@/utils/transaction/sortTransactions";
import { filterTransactions } from "@/utils/transaction/filterTransactions";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { useOnKeyCombination } from "@/hooks/useOnKeyCombination";

const {
  motion,
  AnimatePresence,
}: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export type TransactionTableProps = {
  disableBottomPadding?: boolean;
  disableTools?: boolean;
};

const estimateSize = () => 40;

export const TransactionTable = Object.assign(
  function TransactionTable(props: TransactionTableProps) {
    const period = usePeriodStore((_) => _.period);
    const sortDirection = useTransactionSortStore((_) => _.direction);
    const sortProperty = useTransactionSortStore((_) => _.property);
    const query = useActiveQuery();

    // Fetch, filter and sort transactions
    const { data: transactions, isFetching } = trpc.useQuery([
      "transactions.list",
      query ? { query } : { period },
    ]);
    const filteredTransactions = useMemo(
      () => filterTransactions(transactions ?? [], query),
      [transactions, query]
    );
    const sortedTransactions = useMemo(
      () =>
        sortTransactions(
          filteredTransactions ?? [],
          sortDirection,
          sortProperty
        ),
      [filteredTransactions, sortDirection, sortProperty]
    );
    const selectedTransactions = useSelectedTransactions(transactions ?? []);

    // Virtualized list
    const parentRef = useRef<HTMLDivElement | null>(null);
    const virtualList = useVirtual({
      size: sortedTransactions?.length ?? 0,
      parentRef,
      estimateSize,
      overscan: 2,
      paddingEnd: props.disableBottomPadding ? 0 : 120,
    });

    // Select / deselect all
    const selectMany = useTransactionSelectionStore((_) => _.selectMany);
    const clearSelection = useTransactionSelectionStore((_) => _.clear);
    const selectAll = () =>
      selectMany(
        sortedTransactions.map((_) => _.id),
        true
      );
    useOnKeyCombination({ key: "a", shift: true }, selectAll);
    useOnKeyCombination({ key: "d", shift: true }, clearSelection);

    return (
      <div ref={parentRef} className="relative w-full h-full overflow-auto">
        <TransactionTableLoadingBar isFetching={isFetching} />

        <ul
          className="absolute inset-0 min-h-full"
          style={{ height: virtualList.totalSize }}
        >
          {transactions?.length === 0 ? (
            <TransactionTableBodyEmpty />
          ) : (
            transactions &&
            virtualList.virtualItems.map((row) => {
              return (
                <li
                  key={row.index}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: row.size,
                    transform: `translateY(${row.start}px)`,
                  }}
                >
                  <TransactionContextMenu
                    transaction={sortedTransactions[row.index]!}
                  >
                    <TransactionTableRow
                      transaction={sortedTransactions[row.index]!}
                    />
                  </TransactionContextMenu>
                </li>
              );
            })
          )}

          {(transactions?.length ?? 0) > 0 && (
            <p className="absolute py-12 w-full text-sm text-center bottom-0 text-slate-400 dark:text-slate-600">
              No more transactions.
            </p>
          )}
        </ul>

        <AnimatePresence>
          {!props.disableTools && selectedTransactions.length > 0 && (
            <motion.div
              className="fixed bottom-0 p-4"
              initial={{ y: 200, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
            >
              <TransactionSelectionTools transactions={transactions ?? []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
  {
    Header: TransactionTableHeader,
  }
);

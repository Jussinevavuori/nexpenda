import { sum } from "@/utils/generic/sum";
import { useMemo } from "react";

const _emptyArray: TransactionItem[] = [];

export function useTransactionsSummary(
  transactions: TransactionItem[],
  selection?: Set<string>
) {
  // Filter out selected transactions if selection exists.
  const selectedTransactions =
    selection && selection.size > 0
      ? transactions.filter((_) => selection.has(_.id))
      : _emptyArray;

  // Amounts
  const amounts = useMemo(
    () => transactions.map((_) => _.amount),
    [transactions]
  );
  const selectedAmounts = useMemo(
    () => selectedTransactions.map((_) => _.amount),
    [selectedTransactions]
  );

  // Counts
  const allCount = useMemo(() => transactions.length, [transactions]);
  const selectedCount = useMemo(
    () => selectedTransactions.length,
    [selectedTransactions]
  );

  // Totals
  const allTotal = useMemo(() => sum(amounts), [amounts]);
  const negativesTotal = useMemo(
    () => sum(amounts.filter((_) => _ < 0)),
    [amounts]
  );
  const positivesTotal = useMemo(
    () => sum(amounts.filter((_) => _ > 0)),
    [amounts]
  );
  const selectedTotal = useMemo(() => sum(selectedAmounts), [selectedAmounts]);

  return {
    total: {
      all: allTotal,
      negatives: negativesTotal,
      positives: positivesTotal,
      selected: selectedTotal,
    },
    count: {
      all: allCount,
      selected: selectedCount,
    },
  };
}

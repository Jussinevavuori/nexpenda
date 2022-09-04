import { Transaction } from '@lib/client/models/Transaction';
import { flatGroupByDate } from '@lib/shared/dates/flatGroupByDate';
import { useMemo } from 'react';

export function useFlatGroupedTransactions(transactions: Transaction[]) {
  return useMemo(() => {
    return flatGroupByDate(transactions, (t) => t.date, { sort: true });
  }, [transactions]);
}

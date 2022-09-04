import { formatMoney } from "../currency/formatMoney";
import { formatDateString } from "../dates/formatDateString";

export function filterTransactions(
  transactions: TransactionItem[],
  query: string
) {
  const q = query.trim().toLowerCase();

  if (!q) return transactions;

  return transactions.filter((transaction) => {
    return (
      formatMoney(transaction.amount).includes(q) ||
      transaction.category.name.toLowerCase().includes(q) ||
      (transaction.comment ?? "").toLowerCase().includes(q) ||
      formatDateString(transaction.time).includes(q)
    );
  });
}

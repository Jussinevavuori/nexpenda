import { TransactionSortProperty } from "@/stores/transactionSortStore";
import { compareDate } from "../dates/compareDate";

export function sortTransactions(
  transactions: TransactionItem[],
  direction: SortDirection,
  property: TransactionSortProperty
) {
  return transactions.sort(
    (a, b) => getSign(direction) * getDifference(a, b, property)
  );
}

function getDifference(
  a: TransactionItem,
  b: TransactionItem,
  property: TransactionSortProperty
) {
  switch (property) {
    case "amount": {
      return a.amount - b.amount;
    }
    case "category": {
      return a.category.name.localeCompare(b.category.name);
    }
    case "comment": {
      return a.category.name.localeCompare(b.category.name);
    }
    case "date": {
      return (
        compareDate(a.time, b.time) ||
        a.createdAt.getTime() - b.createdAt.getTime()
      );
    }
  }
}

function getSign(direction: SortDirection) {
  switch (direction) {
    case "none":
      return 0;
    case "asc":
      return -1;
    case "desc":
      return 1;
  }
}

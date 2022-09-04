import create from "zustand";
import produce from "immer";

export type TransactionSortProperty =
  | "amount"
  | "date"
  | "category"
  | "comment";

export interface TransactionSortState {
  property: TransactionSortProperty;
  direction: SortDirection;
  toggle: (property: TransactionSortProperty) => void;
}

export const useTransactionSortStore = create<TransactionSortState>()(
  (set) => ({
    property: "date",
    direction: "asc",
    toggle: (property: TransactionSortProperty) =>
      set(
        produce((draft: TransactionSortState) => {
          draft.direction =
            draft.property === property
              ? getNextSortDirection(draft.direction)
              : "asc";
          draft.property = property;
        })
      ),
  })
);

function getNextSortDirection(direction: SortDirection): SortDirection {
  switch (direction) {
    case "none":
      return "asc";
    case "asc":
      return "desc";
    case "desc":
      return "none";
  }
}

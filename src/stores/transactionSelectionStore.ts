import create from "zustand";
import produce from "immer";
import { usePeriodStore } from "./periodStore";

export interface TransactionelectionState {
  selection: Set<string>;
  clear: () => void;
  select: (id: string, toggle?: boolean) => void;
  selectMany: (ids: string[], toggle?: boolean) => void;
}

export const useTransactionSelectionStore = create<TransactionelectionState>()(
  (set) => ({
    selection: new Set<string>(),

    selectMany: (ids: string[], toggle?: boolean) =>
      set(
        produce((draft: TransactionelectionState) => {
          const allTargetsSelected = ids.every((id) => draft.selection.has(id));

          // If appending, don't touch other selections. If not, clear all.
          // We either deselect them (by not adding them back) or select them
          // by adding them later
          if (toggle) ids.forEach((id) => draft.selection.delete(id));
          else draft.selection.clear();

          // Select all selected, unless all targets are already selected in which
          // case toggle them (by not adding them back)
          if (!allTargetsSelected) ids.forEach((id) => draft.selection.add(id));
        })
      ),

    select: (id: string, toggle?: boolean) =>
      set(
        produce((draft: TransactionelectionState) => {
          // When toggling, select if not yet selected and vice versa.
          if (toggle) {
            if (draft.selection.has(id)) draft.selection.delete(id);
            else draft.selection.add(id);
          }

          // If not toggling, deselect all others and select the target item.
          // If the target was the only selected item, deselect it.
          else {
            const targetOnlySelected =
              draft.selection.has(id) && draft.selection.size === 1;
            draft.selection.clear();
            if (!targetOnlySelected) {
              draft.selection.add(id);
            }
          }
        })
      ),

    clear: () =>
      set(
        produce((draft: TransactionelectionState) => {
          // Clear selection
          draft.selection.clear();
        })
      ),
  })
);

export function useSelectedTransactions(transactions: TransactionItem[]) {
  const selection = useTransactionSelectionStore((_) => _.selection);
  return transactions.filter((_) => selection.has(_.id));
}

/**
 * Clear selection whenever period changes
 */
usePeriodStore.subscribe(() => useTransactionSelectionStore.getState().clear());

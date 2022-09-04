import produce from "immer";
import { useEffect, useState } from "react";
import create from "zustand";

export interface TransactionFlashState {
  threshold: number;
  reset: () => void;
}

export const useTransactionFlashStore = create<TransactionFlashState>()(
  (set, get) => ({
    threshold: Date.now(),

    reset: () =>
      set(
        produce((draft: TransactionFlashState) => {
          draft.threshold = Date.now();
        })
      ),
  })
);

// Map from transaction ID to updated at timestamp that is used to
// prevent the same transaction from being flashed twice with the
// same updated at timestamp. A new update (which also updated the
// updatedAt timestamp) is required for a new flash.
const flashes = new Map<string, number>();

// Function to determine whether a transaction should be flashed.
function shouldFlash(transaction: TransactionItem) {
  const updatedAt = transaction.updatedAt.getTime();
  const flash = flashes.get(transaction.id);

  if (
    updatedAt > useTransactionFlashStore.getState().threshold &&
    flash !== updatedAt
  ) {
    flashes.set(transaction.id, updatedAt);
    return true;
  }

  return false;
}

// Hook to determine whether a transaction should be flashed
export function useShouldFlashTransaction(transaction: TransactionItem) {
  const [isFlashing, setIsFlashing] = useState(false);

  // When flashed, sustain true state for one second
  useEffect(() => {
    if (shouldFlash(transaction)) {
      setIsFlashing(true);
      const timeout = setTimeout(() => {
        setIsFlashing(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  });

  return isFlashing;
}

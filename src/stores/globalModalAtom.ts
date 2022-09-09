import { atom, useAtom } from "jotai";
import { useCallback } from "react";

// Define all possible global modals (by key) with their state (by value).
export type GlobalModalStatesMap = {
  createTransaction: {};
  editTransaction: { id: string };
};

// Derived: All possible keys
export type GlobalModalKey = keyof GlobalModalStatesMap;

// Derived: All possible states
export type GlobalModalState = GlobalModalStatesMap[GlobalModalKey];

// Derived: All possible { key, state } variants by key
export type GlobalModalsMap = {
  [Key in GlobalModalKey]: { key: Key; state: GlobalModalStatesMap[Key] };
};

// Derived: All possible { key, state } variants as list
export type GlobalModal = GlobalModalsMap[GlobalModalKey];

// Atom to contain key and state of currently opened modal
export const globalModalAtom = atom<GlobalModal | undefined>(undefined);

export function useGlobalModal<Key extends GlobalModalKey>(key: Key) {
  const [value, setValue] = useAtom(globalModalAtom);

  const open = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: GlobalModalStatesMap[Key]) => setValue({ key, state } as any),
    [setValue, key]
  );

  const close = useCallback(() => {
    setValue(undefined);
  }, [setValue]);

  const isOpen = value?.key === key;

  const state =
    value && value.key === key
      ? (value.state as GlobalModalStatesMap[Key])
      : undefined;

  return { isOpen, state, open, close };
}

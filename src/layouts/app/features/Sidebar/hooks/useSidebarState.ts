import { useCallback } from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

const sidebarAtom = atomWithStorage("@nexpenda/sidebar", true);

export function useSidebarState() {
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);

  const toggleIsOpen = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen, setIsOpen]
  );

  return {
    isOpen,
    setIsOpen,
    toggleIsOpen,
  };
}

import { useCallback } from "react";
import { sidebarMemory } from "../utils/sidebarMemory";

export function useSidebarState() {
  const isOpen = sidebarMemory.useValue() ?? false;

  const toggleIsOpen = useCallback(() => sidebarMemory.set(!isOpen), [isOpen]);
  const setIsOpen = useCallback((v: boolean) => sidebarMemory.set(v), []);

  return {
    isOpen,
    setIsOpen,
    toggleIsOpen,
  };
}

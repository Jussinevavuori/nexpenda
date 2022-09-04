import { useCallback, useState } from "react";

/**
 * useState wrapper with utility functions for handling a boolean open state.
 * Instead of setIsOpen(...) you are given also functions open(), close() and
 * toggle().
 */
export function useOpenState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen((_) => !_);
  }, [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    toggle,
    open,
    close,
  };
}

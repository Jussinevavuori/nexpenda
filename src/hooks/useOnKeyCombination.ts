import { useListenToKeypress } from "./useListenToKeypress";

export function useOnKeyCombination(
  combination: KeyCombination,
  handler: (ev: KeyboardEvent) => void,
  options: {
    enableOnInputFocused?: boolean;
    disable?: boolean;
  } = {}
) {
  return useListenToKeypress((ev) => {
    if (
      ev.code
        ?.toLowerCase()
        .replace(/^digit/, "")
        .replace(/^key/, "") === combination.key.toLowerCase() &&
      !!ev.shiftKey === !!combination.shift &&
      !!ev.altKey === !!combination.alt &&
      !!ev.ctrlKey === !!combination.ctrl
    ) {
      handler(ev);
    }
  }, options);
}

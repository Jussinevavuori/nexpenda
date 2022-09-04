import { useListenToKeypress } from "./useListenToKeypress";

/**
 * When the given key is pressed, run the handler function.
 */
export function useOnKey(
  key: string,
  handler: (ev: KeyboardEvent) => void,
  options: {
    enableOnInputFocused?: boolean;
    disable?: boolean;
  } = {}
) {
  return useListenToKeypress((ev) => {
    if (ev.key?.toLowerCase() === key.toLowerCase()) {
      handler(ev);
    }
  }, options);
}

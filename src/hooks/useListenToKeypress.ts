import { useCallbackRef } from "./useCallbackRef";
import { useObjectRef } from "./useObjectRef";
import { useEffect } from "react";

export function useListenToKeypress(
  handler: (ev: KeyboardEvent) => void,
  options: { enableOnInputFocused?: boolean; disable?: boolean } = {}
) {
  // References to options
  const handlerRef = useCallbackRef(handler);
  const optionsRef = useObjectRef(options);

  useEffect(() => {
    // Create event handler
    const eventHandler = (ev: KeyboardEvent) => {
      // Get current handler and options
      const _handler = handlerRef.current;
      const _options = optionsRef.current;

      // When disabled, do nothing
      if (_options.disable) return;

      // When focused on input (or text area), only run if
      // enabled on input focused option is set
      if (
        (ev.target instanceof HTMLInputElement ||
          ev.target instanceof HTMLTextAreaElement) &&
        !_options.enableOnInputFocused
      )
        return;

      // If no disabling conditions met, run handler
      _handler(ev);
    };

    // Set event listener and automatically unsubscribe
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [handlerRef, optionsRef]);
}

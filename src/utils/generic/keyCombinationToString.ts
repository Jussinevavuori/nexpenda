import { isMacOs } from "react-device-detect";

function capitalizeFirst(str: string) {
  const [first, ...rest] = str.split("");
  return (first ?? "").toUpperCase() + rest.join("");
}

export function keyCombinationToString(keyCombination: KeyCombination) {
  const _ = keyCombination;

  const shiftKey = isMacOs ? "↑" : "Shift + ";
  const altKey = isMacOs ? "⌥" : "Alt + ";
  const ctrlKey = isMacOs ? "⌘" : "Ctrl + ";

  return [
    _.shift ? shiftKey : "",
    _.alt ? altKey : "",
    _.ctrl ? ctrlKey : "",
    capitalizeFirst(_.key),
  ].join("");
}

import { capitalize } from "@/utils/generic/capitalize";
import { isMacOs } from "react-device-detect";

export type KeySymbolProps = {
	symbol: string | "ctrl" | "shift" | "alt";
}

export function KeySymbol({ symbol }: KeySymbolProps) {
	return <span className="border border-b-2 border-black-border dark:border-white-border border-opacity-20 px-1 rounded">
		{capitalize(getKeySymbol(symbol))}
	</span >
}

function getKeySymbol(symbol: string) {
	const _key = symbol.toLowerCase()
	if (_key === "ctrl") return isMacOs ? "⌘" : "ctrl"
	if (_key === "shift") return isMacOs ? "↑" : "Shift"
	if (_key === "alt") return isMacOs ? "⌥" : "Alt"
	return _key.replace(/digit/g, "").replace(/symbol/g, "");
}
import { capitalize } from "@/utils/generic/capitalize";
import { isMacOs } from "react-device-detect";

export type KeySymbolProps = {
	symbol: string | "ctrl" | "shift" | "alt";
}

export function KeySymbol({ symbol }: KeySymbolProps) {
	return <span className="border border-b-2 border-black dark:border-white border-opacity-20 px-1 rounded">
		{capitalize(getKeySymbol(symbol))}
	</span >
}

function getKeySymbol(symbol: string) {
	const _key = symbol.toLowerCase()

	// Get mac key if mac os and mapping exists
	const macKey = macKeys[_key];
	if (isMacOs && macKey) return macKey;

	return _key.replace(/digit/g, "").replace(/symbol/g, "");
}

// List of mac key mappings
const macKeys: Record<string, string> = {
	ctrl: "⌘",
	shift: "⇧",
	alt: "⌥",
	delete: "⌫"
}
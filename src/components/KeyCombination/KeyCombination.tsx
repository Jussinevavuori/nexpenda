import { KeySymbol } from "../KeySymbol/KeySymbol";

export type KeyCombinationProps = {
	keyCombination: KeyCombination;
}

export function KeyCombination(props: KeyCombinationProps) {
	return <span className="inline-flex gap-1 text-sm text-black-3 dark:text-white-3">
		{props.keyCombination.ctrl && <KeySymbol symbol="ctrl" />}
		{props.keyCombination.shift && <KeySymbol symbol="shift" />}
		{props.keyCombination.alt && <KeySymbol symbol="alt" />}
		<KeySymbol symbol={props.keyCombination.key} />
	</span>
}
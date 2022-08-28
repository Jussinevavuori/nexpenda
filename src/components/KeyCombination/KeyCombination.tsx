import { KeySymbol } from "../KeySymbol/KeySymbol";

export type KeyCombinationProps = {
	keyCombination: KeyCombination;
}

export function KeyCombination(props: KeyCombinationProps) {
	return <span className="inline-flex gap-1 text-sm text-black-secondary dark:text-white-secondary">
		{props.keyCombination.ctrl && <KeySymbol symbol="ctrl" />}
		{props.keyCombination.shift && <KeySymbol symbol="shift" />}
		{props.keyCombination.alt && <KeySymbol symbol="alt" />}
		<KeySymbol symbol={props.keyCombination.key} />
	</span>
}
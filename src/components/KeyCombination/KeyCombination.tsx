import { isMacOs } from "react-device-detect";

export type KeyCombinationProps = {
	keyCombination: KeyCombination;
}

export function KeyCombination(props: KeyCombinationProps) {
	return <span className="inline-flex gap-1 text-sm text-black-secondary dark:text-white-secondary">
		{
			props.keyCombination.ctrl && <span className="border border-b-2 border-black-border dark:border-white-border border-opacity-20 px-1 rounded">
				{isMacOs ? "⌘" : "Ctrl"}
			</span >
		}
		{
			props.keyCombination.shift && <span className="border border-b-2 border-black-border dark:border-white-border border-opacity-20 px-1 rounded">
				{isMacOs ? "↑" : "Shift"}
			</span >
		}
		{
			props.keyCombination.alt && <span className="border border-b-2 border-black-border dark:border-white-border border-opacity-20 px-1 rounded">
				{isMacOs ? "⌥" : "Alt"}
			</span >
		}
		<span className="border border-b-2 border-black-border dark:border-white-border border-opacity-20 px-1 rounded">
			{props.keyCombination.key}
		</span >
	</span>
}
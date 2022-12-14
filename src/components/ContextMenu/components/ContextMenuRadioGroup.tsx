import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuRadioGroupProps = RadixContextMenu.ContextMenuRadioGroupProps

export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {

	const { className, ...ContextMenuGroupProps } = props;


	return <RadixContextMenu.ContextMenuRadioGroup
		{...ContextMenuGroupProps}
		className={c("bg-white-bg-2 dark:bg-black-bg-2 p-1 flex flex-col items-stretch gap-1", className)}
	/>
}
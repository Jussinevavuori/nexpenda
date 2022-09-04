import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuGroupProps = RadixContextMenu.ContextMenuGroupProps

export function ContextMenuGroup(props: ContextMenuGroupProps) {

	const { className, ...ContextMenuGroupProps } = props;

	return <RadixContextMenu.ContextMenuGroup
		{...ContextMenuGroupProps}
		className={c("bg-white dark:bg-slate-800 p-1 flex flex-col items-stretch gap-1", className)}
	/>
}
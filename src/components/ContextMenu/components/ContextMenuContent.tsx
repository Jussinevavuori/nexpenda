import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuContentProps = RadixContextMenu.ContextMenuContentProps

export function ContextMenuContent(props: ContextMenuContentProps) {
	return <RadixContextMenu.ContextMenuContent
		{...props}
		className={c(
			"min-w-[200px] max-w-[400px] bg-white dark:bg-slate-800 rounded-lg shadow-lg p-1",
			props.className,
		)}
	/>
}
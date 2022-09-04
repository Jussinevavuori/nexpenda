import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export interface ContextMenuSeparatorProps extends RadixContextMenu.ContextMenuSeparatorProps {
}

export function ContextMenuSeparator(props: ContextMenuSeparatorProps) {
	const { className, ...ContextMenuSeparatorProps } = props;

	return <RadixContextMenu.ContextMenuSeparator
		{...ContextMenuSeparatorProps}
		className={c("my-1 h-px w-full bg-slate-200 dark:bg-slate-700", className)}
	/>
}
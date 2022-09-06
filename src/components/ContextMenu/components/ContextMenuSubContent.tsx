import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuSubContentProps = RadixContextMenu.ContextMenuSubContentProps

export function ContextMenuSubContent(props: ContextMenuSubContentProps) {
	return <RadixContextMenu.ContextMenuSubContent
		{...props}
		className={c(
			"min-w-[200px] max-w-[400px] bg-white-bg-2 dark:bg-black-bg-2 rounded-lg shadow-lg p-1",
			props.className,
		)}
	/>
}
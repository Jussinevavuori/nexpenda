import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuSubTrigger = RadixContextMenu.ContextMenuSubTriggerProps & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

export function ContextMenuSubTrigger(props: ContextMenuSubTrigger) {
	const { children, className, startIcon, endIcon, ...ContextMenuTriggerItemProps } = props;

	return <RadixContextMenu.SubTrigger
		{...ContextMenuTriggerItemProps}
		className={c(
			"hover:outline-none focus:outline-none active:outline-none bg-white-bg-2 dark:bg-black-bg-2 rounded-lg",
			"hover:bg-white-bg-3 dark:hover:bg-black-bg-3",
			"focus:bg-white-bg-3 dark:focus:bg-black-bg-3",
			"active:bg-white-bg-3 dark:focus:bg-black-bg-4",
			"group relative text-sm text-black-3 dark:text-white-3 rounded-sm py-1 px-2 flex items-center",
			className,
		)}
	>

		{
			startIcon &&
			<span className="pr-2	">
				{startIcon}
			</span>
		}

		{children}

		{
			endIcon &&
			<span className="ml-auto pl-4">
				{endIcon}
			</span>
		}


	</RadixContextMenu.SubTrigger>
}
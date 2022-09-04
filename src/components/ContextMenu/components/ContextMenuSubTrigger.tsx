import { HoverOverlay } from '../../HoverOverlay/HoverOverlay';
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
			"hover:outline-none focus:outline-none active:outline-none bg-white dark:bg-slate-800",
			"group relative text-sm text-slate-700 dark:text-slate-300 rounded-sm py-1 px-2 flex items-center",
			className,
		)}
	>
		<HoverOverlay opacity={0.15} />

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
import { HoverOverlay } from '../../HoverOverlay/HoverOverlay';
import { Icon } from '../../Icon/Icon';
import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export interface ContextMenuSubTrigger extends RadixContextMenu.ContextMenuSubTriggerProps {
	startIcon?: React.ReactNode;
	startIconClassName?: string;
	endIcon?: React.ReactNode;
	endIconClassName?: string;
}

export function ContextMenuSubTrigger(props: ContextMenuSubTrigger) {
	const { children, className, startIconClassName, endIconClassName, startIcon, endIcon, ...ContextMenuTriggerItemProps } = props;

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
			props.startIcon &&
			<span className="pr-2	">
				{
					typeof props.startIcon === "string"
						? <Icon.Material size={20} icon={props.startIcon} className={startIconClassName} />
						: props.startIcon
				}
			</span>
		}

		{props.children}

		{
			props.endIcon &&
			<span className="ml-auto pl-4">
				{
					typeof props.endIcon === "string"
						? <Icon.Material size={28} icon={props.endIcon} className={endIconClassName} />
						: props.endIcon
				}
			</span>
		}


	</RadixContextMenu.SubTrigger>
}
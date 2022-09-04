import { c } from '@/utils/generic/classnames';
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { KeyCombination } from '../../KeyCombination/KeyCombination';

export type ContextMenuItemProps = RadixContextMenu.ContextMenuItemProps & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	keyCombination?: KeyCombination;
}

export function ContextMenuItem(props: ContextMenuItemProps) {
	const { children, className, startIcon, endIcon, keyCombination, ...ContextMenuItemProps } = props;

	return <RadixContextMenu.ContextMenuItem
		{...ContextMenuItemProps}
		className={c(
			"hover:outline-none focus:outline-none active:outline-none bg-white dark:bg-slate-800 rounded-lg",
			"hover:bg-white-hover dark:hover:bg-slate-820",
			"focus:bg-white-hover dark:focus:bg-slate:820",
			"active:bg-white-pressed dark:focus:bg-slate-840",
			"group relative text-sm text-slate-700 dark:text-slate-300 rounded-sm py-1 px-2 flex items-center",
			className,
		)}
	>
		{
			startIcon &&
			<span className="pr-2">
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

		{
			keyCombination &&
			<span className="ml-auto pl-10 text-slate-500 text-xs">
				<KeyCombination keyCombination={keyCombination} />
			</span>
		}
	</RadixContextMenu.ContextMenuItem>
}
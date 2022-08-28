import { HoverOverlay } from "@/components/HoverOverlay/HoverOverlay";
import { Icon } from "@/components/Icon/Icon";
import { c } from "@/utils/generic/classnames";

export type PaletteSelectorButtonProps = {
	children: string;
	icon: React.ReactNode;
	onClick?(): void;
	isSelected?: boolean;
}

export function PaletteSelectorButton(props: PaletteSelectorButtonProps) {
	return <button
		onClick={props.onClick}
		className={c(
			"group relative flex items-center justify-between px-4 py-3 rounded transition-colors w-full mx-auto",
			props.isSelected
				? "bg-primary-500"
				: "bg-slate-100 dark:bg-slate-780 hover:bg-slate-200 dark:hover:bg-slate-740 focus:bg-slate-200 dark:focus:bg-slate-740 active:bg-slate-300 dark:active:bg-slate-700"
		)}
	>

		<HoverOverlay />

		<span className="flex items-center gap-4">
			{props.icon}
			<p className={props.isSelected ? "text-slate-100 dark:text-slate-900" : "dark:text-slate-100"}>
				{props.children}
			</p>
		</span>

		<span >
			<Icon.Material
				icon={props.isSelected ? "task_alt" : "radio_button_unchecked"}
				className={props.isSelected ? "text-slate-100 dark:text-slate-900" : "text-slate-800 dark:text-slate-100"}
			/>
		</span>
	</button>
}
import { HoverOverlay } from "@/components/HoverOverlay/HoverOverlay";
import { Icon } from "@/components/Icon/Icon";
import { c } from "@/utils/generic/classnames";

export interface SidebarToggleProps {
	onClick?(): void;
	isSidebarOpen?: boolean;
}

export function SidebarToggle(props: SidebarToggleProps) {

	return <button
		onClick={props.onClick}
		className="absolute group top-0 left-0 bottom-0 w-6 hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
	>

		<HoverOverlay />
		<div className={c("opacity-0 group-hover:opacity-100 transition-[opacity,transform]", props.isSidebarOpen ? "rotate-0" : "rotate-180")}>
			<Icon.Material icon="chevron_left" className="text-slate-500" />
		</div>
	</button>
}
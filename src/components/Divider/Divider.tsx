import { c } from "@/utils/generic/classnames";

export interface DividerProps {
	variant?: "horizontal" | "vertical";
	className?: string;
	children?: string;
}

export function Divider(props: DividerProps) {

	return <div
		className={c(
			"relative bg-slate-200 dark:bg-slate-760",
			c.variant(props.variant ?? "horizontal")({
				horizontal: "w-full h-px my-4",
				vertical: "w-px mx-4"
			}),
			props.className
		)}
	>
		{
			props.children && <span className="absolute-centered text-sm text-slate-500 bg-white dark:bg-slate-800 px-2 py-0">
				{props.children}
			</span>
		}
	</div>
}
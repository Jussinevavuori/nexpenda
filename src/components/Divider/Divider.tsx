import { c } from "@/utils/generic/classnames";

export interface DividerProps {
	variant?: "horizontal" | "vertical";
	className?: string;
}

export function Divider(props: DividerProps) {

	return <div
		className={c(
			"relative bg-divider",
			c.variant(props.variant ?? "horizontal")({
				horizontal: "w-full h-px my-4",
				vertical: "w-px mx-4"
			}),
			props.className
		)}
	/>
}
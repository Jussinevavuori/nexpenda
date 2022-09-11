import { c } from "@/utils/generic/classnames";

export interface DividerProps {
	vertical?: boolean;
	className?: string;
	disableMargin?: boolean;
}

export function Divider(props: DividerProps) {

	return <div
		className={c(
			"relative bg-divider",
			c.variant(props.vertical ? "vertical" : "horizontal")({
				horizontal: "w-full h-px",
				vertical: "w-px"
			}),
			c.if(!props.disableMargin)(c.variant(props.vertical ? "vertical" : "horizontal")({
				horizontal: "my-4",
				vertical: "mx-4"
			})),
			props.className
		)}
	/>
}
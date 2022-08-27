import { c } from "@/utils/generic/classnames";
import * as Icon from "react-feather";

export type FeatherIconProps = {
	icon: string;
	size?: number;
	className?: string;
	inline?: boolean;
}

const defaultSize = 24;

export const FeatherIcon = Object.assign(function FeatherIcon(props: FeatherIconProps) {

	const IconComponent = Icon[props.icon.charAt(0).toUpperCase() + props.icon.slice(1) as keyof typeof Icon];

	return <span className={c("relative items-center user-select-none", c.if(props.inline)("inline-flex align-middle").else("flex"))}>
		<IconComponent className={props.className} size={props.size ?? defaultSize} />
	</span>
}, { defaultSize })
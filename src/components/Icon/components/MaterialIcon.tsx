import { c } from "@/utils/generic/classnames";

export type MaterialIconProps = {
	icon: string;
	size?: number;
	className?: string;
	inline?: boolean;
}

export function MaterialIcon(props: MaterialIconProps) {
	return <span className={c("relative items-center", c.if(props.inline)("inline-flex align-middle").else("flex"))}>
		<i
			className={c("material-icons user-select-none font-normal", props.className)}
			style={{
				fontSize: props.size ?? 24,
				width: props.size ?? 24,
				height: props.size ?? 24
			}}
		>
			{props.icon}
		</i>
	</span>
}

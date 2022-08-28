import { c } from "@/utils/generic/classnames";

export interface HoverOverlayProps {
	opacity?: number;
	className?: string;
}

export function HoverOverlay(props: HoverOverlayProps) {
	const opacity = props.opacity ?? 0.3;

	return <span className="absolute inset-0" style={{ opacity }}>
		<span className={c(
			`absolute pointer-events-none inset-0 rounded bg-slate-500 dark:bg-slate-700 transition-all duration-[200ms]`,
			"opacity-20 group-hover:opacity-60 group-focus:opacity-60 group-active:opacity-100",
			"[clip-path:circle(0)] group-hover:[clip-path:circle(100%)] group-focus:[clip-path:circle(100%)]",
			props.className
		)} />
	</span>
}
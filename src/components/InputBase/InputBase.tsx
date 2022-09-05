import { c } from "@/utils/generic/classnames";
export type InputBaseVariant = "default" | "bordered" | "underlined";

export type ExtensionInputBaseProps = {
	startIcon?: React.ReactNode;
	startLabel?: string;
	endIcon?: React.ReactNode;
	endLabel?: string;
	variant?: InputBaseVariant;
	error?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
}

export type InputBaseProps = ExtensionInputBaseProps & {
	readOnly?: boolean;
	children?: React.ReactNode;
}

export const InputBase = Object.assign(function InputBase(props: InputBaseProps) {

	return <div className={c(
		"relative flex items-center group",

		// Variant specific styles
		c.variant(props.variant ?? "default")({
			default: "rounded-lg",
			bordered: "rounded-lg border",
			underlined: "border-b",
		}),

		// Full width
		c.if(props.fullWidth)("w-full"),

		// Disabled and read only
		c.if(props.disabled)("opacity-60")
			.elseIf(props.readOnly)("cursor-text")
			.else("cursor-pointer"),

		// Default styles
		c.if(!props.error)(c.variant(props.variant ?? "default")({
			default: "bg-slate-500/10",
			bordered: "border-slate-300 dark:border-slate-600",
			underlined: "border-slate-300 dark:border-slate-600",
		})),

		// Error state
		c.if(props.error)(c.variant(props.variant ?? "default")({
			default: "bg-danger/10",
			bordered: "border-danger",
			underlined: "border-danger",
		})),
	)}>

		{/* Interactivity */}
		{
			!props.readOnly && !props.disabled &&
			<div className={c(
				"absolute inset-0 pointer-events-none transition-[clip-path] duration-250",
				"[clip-path:circle(0)] group-hover:[clip-path:circle(100%)] group-focus-within:[clip-path:circle(100%)]",
				c.if(props.error)("border-danger").else("border-slate-300"),
				c.variant(props.variant ?? "default")({
					bordered: "border rounded-lg",
					default: "border rounded-lg",
					underlined: "border-b"
				})
			)} />
		}

		{props.startIcon && <span className="px-2 text-slate-500">
			{props.startIcon}
		</span>}

		{props.startLabel && <span className="px-2 whitespace-nowrap text-black-disabled dark:text-white-disabled">
			{props.startLabel}
		</span>}

		{props.children}

		{props.endLabel && <span className="ml-auto px-2 whitespace-nowrap text-black-disabled dark:text-white-disabled">
			{props.endLabel}
		</span>}

		{props.endIcon && <span className="ml-auto px-2 text-slate-500">
			{props.endIcon}
		</span>}
	</div>
}, {
	extractInputBaseProps<T extends InputBaseProps>(props: T): InputBaseProps {
		/* eslint-disable-next-line */
		const { children, readOnly, fullWidth, startIcon, startLabel, endIcon, endLabel, variant, error, disabled } = props;
		return { children, readOnly, fullWidth, startIcon, startLabel, endIcon, endLabel, variant, error, disabled }
	},
	removeExtensionInputBaseProps<T extends ExtensionInputBaseProps>(props: T): Omit<T, keyof ExtensionInputBaseProps> {
		/* eslint-disable-next-line */
		const { fullWidth, startIcon, startLabel, endIcon, endLabel, variant, error, disabled, ...rest } = props;
		return rest;
	},
	removeInputBaseProps<T extends InputBaseProps>(props: T): Omit<T, keyof InputBaseProps> {
		/* eslint-disable-next-line */
		const { children, readOnly, fullWidth, startIcon, startLabel, endIcon, endLabel, variant, error, disabled, ...rest } = props;
		return rest;
	}
})

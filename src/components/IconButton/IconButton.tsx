import { c } from "@/utils/generic/classnames";
import Link, { LinkProps } from "next/link";
import React, { forwardRef } from "react"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export type IconButtonVariant = "default" | "flat" | "bordered" | "flat" | "text";

export type IconButtonColor = "monochrome" | ColorVariant;

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	variant?: IconButtonVariant;
	color?: IconButtonColor;
	children?: React.ReactNode;
	startLabel?: string;
	endLabel?: string;
	inputAdornment?: "start" | "end";
}

export type IconButtonLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	variant?: IconButtonVariant;
	color?: IconButtonColor;
	children?: React.ReactNode;
	startLabel?: string;
	endLabel?: string;
}

export const IconButton = Object.assign(forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({
	loading,
	variant,
	color,
	children,
	className,
	inputAdornment,
	startLabel,
	endLabel,
	...htmlProps
}, ref) {

	return <button
		{...htmlProps}
		ref={ref}
		disabled={loading || htmlProps.disabled}
		className={getClassName({ loading, variant, color, className, inputAdornment, disabled: htmlProps.disabled })}
	>
		{
			// Loading icon
			loading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<LoadingSpinner variant="puff" />
			</div>
		}

		{
			startLabel && <p className="-mr-2 pl-1 text-sm">
				{startLabel}
			</p>
		}

		{children}

		{
			endLabel && <p className="-ml-2 pr-1 text-sm">
				{endLabel}
			</p>
		}
	</button>
}), {
	Link: function LinkButton({
		variant,
		color,
		className,
		children,
		startLabel,
		endLabel,
		...htmlProps
	}: IconButtonLinkProps) {

		return <Link
			{...htmlProps}
			className={getClassName({ variant, color, className })}
		>
			{
				startLabel && <p className="-mr-2 pl-1 text-sm">
					{startLabel}
				</p>
			}

			{children}

			{
				endLabel && <p className="-ml-2 pr-1 text-sm">
					{endLabel}
				</p>
			}
		</Link>
	},

})

/**
 * Large custom tailwind styles are extracted into this function.
 */
function getClassName(props: {
	loading?: boolean;
	disabled?: boolean;
	variant?: IconButtonVariant;
	color?: IconButtonColor;
	className?: string;
	inputAdornment?: "start" | "end";
}) {
	return c(
		"relative flex flex-row gap-4 items-center justify-center p-2",
		c.variant(props.inputAdornment ?? "none")({
			none: "rounded-full",
			start: "-ml-2 pl-3 rounded-lg",
			end: "-mr-2 pr-3 rounded-lg"
		}),
		c.variant(props.variant ?? "default")({
			default: c(c.variant(props.color ?? "primary")({
				primary: "bg-primary text-white enabled:hover:bg-primary-hover enabled:active:bg-primary-pressed",
				danger: "bg-danger text-white enabled:hover:bg-danger-hover enabled:active:bg-danger-pressed",
				success: "bg-success text-white enabled:hover:bg-success-hover enabled:active:bg-success-pressed",
				warning: "bg-warning text-white enabled:hover:bg-warning-hover enabled:active:bg-warning-pressed",
				monochrome: "bg-black dark:bg-white text-white dark:text-black enabled:hover:bg-opacity-85 enabled:active:bg-opacity-75"
			})),
			bordered: c("border", c.variant(props.color ?? "primary")({
				primary: "bg-primary/0 text-primary border-primary/50 enabled:hover:bg-primary/10 enabled:hover:border-primary/60 enabled:active:bg-primary/20 enabled:hover:border-primary/70",
				danger: "bg-danger/0 text-danger border-danger/50 enabled:hover:bg-danger/10 enabled:hover:border-danger/60 enabled:active:bg-danger/20 enabled:hover:border-danger/70",
				success: "bg-success/0 text-success border-success/50 enabled:hover:bg-success/10 enabled:hover:border-success/60 enabled:active:bg-success/20 enabled:hover:border-success/70",
				warning: "bg-warning/0 text-warning border-warning/50 enabled:hover:bg-warning/10 enabled:hover:border-warning/60 enabled:active:bg-warning/20 enabled:hover:border-warning/70",
				monochrome: "bg-black/0 dark:bg-white/0 border-black/40 dark:border-white/40 enabled:hover:bg-black/10 enabled:hover:border-black/50 enabled:active:bg-black/20 enabled:hover:border-black/60 dark:enabled:hover:bg-white/10 dark:enabled:hover:border-white/50 dark:enabled:active:bg-white/20 dark:enabled:hover:border-white/60"
			})),
			flat: c(c.variant(props.color ?? "primary")({
				primary: "bg-primary/30 dark:bg-opacity-20 text-primary dark:text-primary-300 enabled:hover:bg-primary/40 enabled:active:bg-primary/50",
				danger: "bg-danger/30 dark:bg-opacity-20 text-danger dark:text-danger-300 enabled:hover:bg-danger/40 enabled:active:bg-danger/50",
				success: "bg-success/30 dark:bg-opacity-20 text-success dark:text-success-300 enabled:hover:bg-success/40 enabled:active:bg-success/50",
				warning: "bg-warning/30 dark:bg-opacity-20 text-warning dark:text-warning-300 enabled:hover:bg-warning/40 enabled:active:bg-warning/50",
				monochrome: "bg-black/15 dark:bg-white/15  enabled:hover:bg-black/25 enabled:active:bg-black/30  dark:enabled:hover:bg-white/25 dark:enabled:active:bg-white/30"
			})),
			text: c(c.variant(props.color ?? "primary")({
				primary: "bg-primary/0 text-primary enabled:hover:bg-primary/10 enabled:active:bg-primary/20",
				danger: "bg-danger/0 text-danger enabled:hover:bg-danger/10 enabled:active:bg-danger/20",
				success: "bg-success/0 text-success enabled:hover:bg-success/10 enabled:active:bg-success/20",
				warning: "bg-warning/0 text-warning enabled:hover:bg-warning/10 enabled:active:bg-warning/20",
				monochrome: "bg-black/0 dark:bg-white/0 enabled:hover:bg-black/10 enabled:active:bg-black/20 dark:enabled:hover:bg-white/10 dark:enabled:active:bg-white/20"
			})),
		}),
		c.if(props.disabled)("opacity-40"),
		c.if(props.loading)("opacity-80"),
		props.className,
	)
}
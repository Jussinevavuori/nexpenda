import { c } from "@/utils/generic/classnames";
import Link, { LinkProps } from "next/link";
import React, { forwardRef } from "react"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export type ChipVariant = "default" | "flat" | "bordered" | "flat" | "text";

export type ChipColor = "monochrome" | ColorVariant;

export type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	variant?: ChipVariant;
	color?: ChipColor;
	children?: React.ReactNode;
}

export type ChipLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	variant?: ChipVariant;
	color?: ChipColor;
	children?: React.ReactNode;
}

export const Chip = Object.assign(forwardRef<HTMLButtonElement, ChipProps>(function Chip({
	loading,
	startIcon,
	endIcon,
	variant,
	color,
	children,
	className,
	...htmlProps
}, ref) {

	return <button
		{...htmlProps}
		ref={ref}
		tabIndex={htmlProps.onClick ? undefined : -1}
		disabled={loading || htmlProps.disabled}
		className={getClassName({ loading, variant, color, className, disabled: htmlProps.disabled, startIcon, endIcon })}
	>
		{
			// Loading icon
			loading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<LoadingSpinner variant="puff" />
			</div>
		}

		{startIcon}
		{children}
		{endIcon}
	</button>
}), {
	Link: function LinkChip({
		startIcon,
		endIcon,
		variant,
		color,
		className,
		children,
		...htmlProps
	}: ChipLinkProps) {

		return <Link
			{...htmlProps}
			className={getClassName({ variant, color, className, startIcon, endIcon })}
		>
			{startIcon}
			{children}
			{endIcon}
		</Link>
	},

})

/**
 * Large custom tailwind styles are extracted into this function.
 */
function getClassName(props: {
	loading?: boolean;
	disabled?: boolean;
	variant?: ChipVariant;
	color?: ChipColor;
	className?: string;

	// eslint-disable-next-line
	startIcon?: any;

	// eslint-disable-next-line
	endIcon?: any;
}) {
	return c(
		"relative flex flex-row gap-4 items-center justify-center px-3 py-1 rounded-full text-[0.9rem] font-medium",
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
import { c } from "@/utils/generic/classnames";
import Link, { LinkProps } from "next/link";
import React from "react"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export type ButtonVariant = "default" | "flat" | "bordered" | "ghost" | "flat" | "text";

export type ButtonColor = "monochrome" | ColorVariant;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	variant?: ButtonVariant;
	color?: ButtonColor;
	children?: React.ReactNode;
}

export type ButtonLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	variant?: ButtonVariant;
	color?: ButtonColor;
	children?: React.ReactNode;
}

export const Button = Object.assign(function Button({
	loading,
	startIcon,
	endIcon,
	variant,
	color,
	children,
	className,
	...htmlProps
}: ButtonProps) {

	return <button
		{...htmlProps}
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
}, {
	Link: function LinkButton({
		startIcon,
		endIcon,
		variant,
		color,
		className,
		children,
		...htmlProps
	}: ButtonLinkProps) {

		return <Link
			{...htmlProps}
			className={getClassName({ variant, color, className, startIcon, endIcon })}
		>

			{children}
		</Link>
	},

})

/**
 * Large custom tailwind styles are extracted into this function.
 */
function getClassName(props: {
	loading?: boolean;
	disabled?: boolean;
	variant?: ButtonVariant;
	color?: ButtonColor;
	className?: string;

	// eslint-disable-next-line
	startIcon?: any;

	// eslint-disable-next-line
	endIcon?: any;
}) {
	return c(
		"relative flex flex-row gap-4 items-center justify-center px-4 py-2 rounded-lg text-[0.9rem]",
		"font-medium transition-colors active:transition-none",
		c.if(props.loading)("opacity-60"),
		c.if(props.disabled)(
			c("cursor-default", c.variant(props.variant ?? "default")({
				default: "text-black-4 bg-slate-200 dark:text-white-4 dark:bg-slate-800",
				bordered: "text-black-4 border border-slate-300 dark:text-white-4 dark:border-slate-700",
				ghost: "text-black-4 border border-slate-300 dark:text-white-4 dark:border-slate-700",
				text: "text-black-4 dark:text-white-4",
				flat: "text-black-4 bg-slate-100 dark:text-white-4 dark:bg-slate-800/50"
			}))
		).elseIf(props.loading)(
			c("cursor-default", c.variant(props.variant ?? "default")({
				default: c("text-white", c.variant(props.color ?? "primary")({
					primary: "bg-primary",
					monochrome: "bg-black dark:bg-white dark:text-black",
					success: "bg-success",
					warning: "bg-warning",
					danger: "bg-danger",
				})),
				bordered: c("border", c.variant(props.color ?? "primary")({
					primary: "border-primary text-primary :border-primary-pressed",
					monochrome: "border-black text-black dark:border-white-pressed dark:text-white-pressed",
					success: "border-success text-success",
					warning: "border-warning text-warning",
					danger: "border-danger text-danger",
				})),
				flat: c("bg-opacity-30", c.variant(props.color ?? "primary")({
					primary: "bg-primary text-primary-hover dark:text-primary-300",
					monochrome: "bg-slate-500 text-black-hover dark:text-white-pressed",
					success: "bg-success text-success-hover dark:text-success-400",
					warning: "bg-warning text-warning-hover dark:text-warning-400",
					danger: "bg-danger text-danger-hover dark:text-danger-400",
				})),
				ghost: c("border", c.variant(props.color ?? "primary")({
					primary: "border-primary text-primary",
					monochrome: "border-black text-black dark:border-white-pressed dark:text-white-pressed",
					success: "border-success text-success",
					warning: "border-warning text-warning",
					danger: "border-danger text-danger",
				})),
				text: c("bg-opacity-0", c.variant(props.color ?? "primary")({
					primary: "text-primary",
					monochrome: "text-black-hover dark:text-white-hover",
					success: "text-success-hover",
					warning: "text-warning-hover",
					danger: "text-danger-hover",
				})),
			})),
		).else(
			c("cursor-pointer", c.variant(props.variant ?? "default")({
				default: c("text-white", c.variant(props.color ?? "primary")({
					primary: "bg-primary hover:bg-primary-hover active:bg-primary-pressed",
					monochrome: "bg-black hover:bg-black-hover active:bg-black-pressed dark:bg-white dark:hover:bg-white-hover dark:active:bg-white-pressed dark:text-black",
					success: "bg-success hover:bg-success-hover active:bg-success-pressed",
					warning: "bg-warning hover:bg-warning-hover active:bg-warning-pressed",
					danger: "bg-danger hover:bg-danger-hover active:bg-danger-pressed",
				})),
				bordered: c("border hover:ring-1 hover:ring-inset", c.variant(props.color ?? "primary")({
					primary: "border-primary text-primary hover:ring-primary active:text-primary-pressed active:ring-primary-pressed active:border-primary-pressed",
					monochrome: "border-black text-black hover:ring-black active:text-black-pressed active:ring-black-pressed active:border-black-pressed active:bg-black active:bg-opacity-5 dark:border-white-pressed dark:text-white-pressed dark:hover:ring-white-pressed dark:active:border-slate-400 dark:active:ring-slate-400",
					success: "border-success text-success hover:ring-success active:text-success-pressed active:ring-success-pressed active:border-success-pressed",
					warning: "border-warning text-warning hover:ring-warning active:text-warning-pressed active:ring-warning-pressed active:border-warning-pressed",
					danger: "border-danger text-danger hover:ring-danger active:text-danger-pressed active:ring-danger-pressed active:border-danger-pressed",
				})),
				flat: c("bg-opacity-30 hover:bg-opacity-40 active:bg-opacity-50", c.variant(props.color ?? "primary")({
					primary: "bg-primary text-primary-hover dark:text-primary-300",
					monochrome: "bg-slate-500 text-black-hover dark:text-white-pressed",
					success: "bg-success text-success-hover dark:text-success-400",
					warning: "bg-warning text-warning-hover dark:text-warning-400",
					danger: "bg-danger text-danger-hover dark:text-danger-400",
				})),
				ghost: c("border hover:text-white active:text-white", c.variant(props.color ?? "primary")({
					primary: "border-primary text-primary hover:bg-primary active:bg-primary-hover",
					monochrome: "border-black text-black hover:bg-black active:bg-black-pressed dark:border-white-pressed dark:text-white-pressed dark:hover:text-black dark:hover:bg-white-pressed dark:active:border-slate-400 dark:active:bg-slate-400",
					success: "border-success text-success hover:bg-success active:bg-success-hover",
					warning: "border-warning text-warning hover:bg-warning active:bg-warning-hover",
					danger: "border-danger text-danger hover:bg-danger active:bg-danger-hover",
				})),
				text: c("bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20", c.variant(props.color ?? "primary")({
					primary: "text-primary hover:bg-primary-100 active:bg-primary-200",
					monochrome: "bg-slate-900 dark:bg-white text-black-hover dark:text-white-hover",
					success: "bg-success text-success-hover",
					warning: "bg-warning text-warning-hover",
					danger: "bg-danger text-danger-hover",
				})),
			})),
		),
		props.className,
	)
}
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
		className={getClassName({ loading, variant, color, className, disabled: htmlProps.disabled })}
	>
		{
			// Loading icon
			loading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<LoadingSpinner variant="puff" />
			</div>
		}

		{children}
	</button>
}, {
	Link: function LinkButton({
		startIcon,
		endIcon,
		variant,
		color,
		className,
		...htmlProps
	}: ButtonLinkProps) {

		return <Link
			{...htmlProps}
			className={getClassName({ variant, color, className })}
		/>
	},

})

function getClassName({ className, loading, disabled, variant, color }: {
	loading?: boolean;
	disabled?: boolean;
	variant?: ButtonVariant;
	color?: ButtonColor;
	className?: string;
}) {
	return c(
		"relative px-4 py-2 rounded-lg transition-colors active:transition-none",
		c.if(loading)("opacity-60"),
		c.if(disabled)(
			c("cursor-default", c.variant(variant ?? "default")({
				default: "text-black-disabled bg-slate-200",
				bordered: "text-black-disabled border border-slate-300",
				ghost: "text-black-disabled border border-slate-300",
				text: "text-black-disabled",
				flat: "text-black-disabled bg-slate-100"
			}))
		).elseIf(loading)(
			c("cursor-default", c.variant(variant ?? "default")({
				default: c("border text-white", c.variant(color ?? "primary")({
					primary: "bg-primary",
					monochrome: "bg-black",
					success: "bg-success",
					warning: "bg-warning",
					danger: "bg-danger",
				})),
				bordered: c("border", c.variant(color ?? "primary")({
					primary: "border-primary text-primary",
					monochrome: "border-black text-black",
					success: "border-success text-success",
					warning: "border-warning text-warning",
					danger: "border-danger text-danger",
				})),
				flat: c("border bg-opacity-30", c.variant(color ?? "primary")({
					primary: "bg-primary-200 text-primary",
					monochrome: "bg-slate-900 text-black-hover",
					success: "bg-success text-success-hover",
					warning: "bg-warning text-warning-hover",
					danger: "bg-danger text-danger-hover",
				})),
				ghost: c("border", c.variant(color ?? "primary")({
					primary: "border-primary text-primary",
					monochrome: "border-black text-black",
					success: "border-success text-success",
					warning: "border-warning text-warning",
					danger: "border-danger text-danger",
				})),
				text: c("bg-opacity-0", c.variant(color ?? "primary")({
					primary: "text-primary",
					monochrome: "bg-slate-900 text-black-hover",
					success: "bg-success text-success-hover",
					warning: "bg-warning text-warning-hover",
					danger: "bg-danger text-danger-hover",
				})),
			})),
		).else(
			c("cursor-pointer", c.variant(variant ?? "default")({
				default: c("border text-white", c.variant(color ?? "primary")({
					primary: "bg-primary hover:bg-primary-hover active:bg-primary-pressed",
					monochrome: "bg-black hover:bg-black-hover active:bg-black-pressed",
					success: "bg-success hover:bg-success-hover active:bg-success-pressed",
					warning: "bg-warning hover:bg-warning-hover active:bg-warning-pressed",
					danger: "bg-danger hover:bg-danger-hover active:bg-danger-pressed",
				})),
				bordered: c("border hover:ring-1 hover:ring-inset", c.variant(color ?? "primary")({
					primary: "border-primary text-primary hover:ring-primary active:text-primary-pressed active:ring-primary-pressed active:border-primary-pressed",
					monochrome: "border-black text-black hover:ring-black active:text-black-pressed active:ring-black-pressed active:border-black-pressed",
					success: "border-success text-success hover:ring-success active:text-success-pressed active:ring-success-pressed active:border-success-pressed",
					warning: "border-warning text-warning hover:ring-warning active:text-warning-pressed active:ring-warning-pressed active:border-warning-pressed",
					danger: "border-danger text-danger hover:ring-danger active:text-danger-pressed active:ring-danger-pressed active:border-danger-pressed",
				})),
				flat: c("border bg-opacity-30 hover:bg-opacity-40 active:bg-opacity-50", c.variant(color ?? "primary")({
					primary: "bg-primary-200 hover:bg-primary-300 active:bg-primary-400 text-primary",
					monochrome: "bg-slate-900 text-black-hover",
					success: "bg-success text-success-hover",
					warning: "bg-warning text-warning-hover",
					danger: "bg-danger text-danger-hover",
				})),
				ghost: c("border hover:text-white active:text-white", c.variant(color ?? "primary")({
					primary: "border-primary text-primary hover:bg-primary active:bg-primary-hover",
					monochrome: "border-black text-black hover:bg-black active:bg-black-pressed",
					success: "border-success text-success hover:bg-success active:bg-success-hover",
					warning: "border-warning text-warning hover:bg-warning active:bg-warning-hover",
					danger: "border-danger text-danger hover:bg-danger active:bg-danger-hover",
				})),
				text: c("bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20", c.variant(color ?? "primary")({
					primary: "text-primary hover:bg-primary-100 active:bg-primary-200",
					monochrome: "bg-slate-900 text-black-hover",
					success: "bg-success text-success-hover",
					warning: "bg-warning text-warning-hover",
					danger: "bg-danger text-danger-hover",
				})),
			})),
		),
		className,
	)
}
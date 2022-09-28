import { c } from "@/utils/generic/classnames";
import { Listbox } from "@headlessui/react"
import React from "react";
import { Icon } from "../Icon/Icon";
import { ExtensionInputBaseProps, InputBase } from "../InputBase/InputBase";

export type SelectProps<T> =
	Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange">
	& ExtensionInputBaseProps
	& {
		children?: React.ReactNode;
		value: T;
		renderValue: (t: T) => React.ReactNode;
		onChange: (t: T) => void;
	}

export type SelectOptionProps<T> =
	React.LiHTMLAttributes<HTMLLIElement>
	& {
		value: T;
		disabled?: boolean;
		children?: React.ReactNode;
	}

export const Select = Object.assign(function Select<T>(props: SelectProps<T>) {
	const { value, onChange, children, ...htmlProps } = InputBase.removeExtensionInputBaseProps(props)

	return <Listbox value={value} onChange={onChange} disabled={props.disabled}>
		<div className="relative">
			<Listbox.Button className="w-full">
				<InputBase {...props}>
					<div
						{...htmlProps}
						className={c(
							"bg-transparent py-2 text-black dark:text-white outline-none",
							"placeholder:text-black-4 dark:placeholder:text-white-4 w-full",
							"flex items-center justify-between gap-2 w-full",
							c.variant(props.variant ?? "default")({
								bordered: "px-2",
								default: "px-4",
								underlined: "px-0"
							}),
							htmlProps.className
						)}
					>
						<span>
							{props.renderValue(value)}
						</span>
						<Icon.Material icon="unfold_more" className="-mr-2" />
					</div>
				</InputBase>
			</Listbox.Button>

			<Listbox.Options
				className="z-10 absolute right-0 max-w-sm lg:max-w-2xl transform mt-2 min-w-full bg-white dark:bg-dark-bg-2 border border-white-bg-3 dark:border-black-bg-3 text-black dark:text-white rounded-xl d:rounded-lg shadow-lg"
			>
				{children}
			</Listbox.Options>
		</div>
	</Listbox >
}, {
	Option: function SelectOption<T>({ children, ...props }: SelectOptionProps<T>) {
		return <Listbox.Option {...props}>
			{({ active, disabled, selected }) => (
				<div className={c("w-full hover:bg-hover-overlay active:bg-active-overlay p-2",
					c.if(active)("bg-hover-overlay"),
					c.if(selected)("text-primary"),
					c.if(disabled)("opacity-50")
				)}>
					{children}
				</div>
			)}
		</Listbox.Option>
	}
})
import { Combobox, Transition } from "@headlessui/react"
import { c } from "@/utils/generic/classnames"
import { Fragment } from "react"
import React from "react";

export type AutocompleteOptionsProps = Parameters<typeof Combobox.Options>[0] & {
	onResetQuery?(): void;
	maxHeight?: number;
}

export function AutocompleteOptions({ onResetQuery, maxHeight, children, ...props }: AutocompleteOptionsProps) {
	return <Transition
		as={Fragment}
		leave="transition ease-in duration-100"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		afterLeave={onResetQuery}
	>
		<Combobox.Options
			{...props}
			style={{ maxHeight }}
			className={c("absolute top-[100%] mt-1 max-h-60 w-full overflow-auto",
				"rounded-lg z-10 bg-white-bg dark:bg-black-bg py-1 text-base shadow-lg",
				"ring-1 ring-divider focus:outline-none sm:text-sm",
			)}
		>
			{
				React.Children.count(children) === 0
					? <div className="cursor-default select-none py-2 px-4 text-black-4 dark:text-white-4">
						Nothing found
					</div>
					: children
			}
		</Combobox.Options>
	</Transition>
}
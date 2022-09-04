import { Icon } from "@/components/Icon/Icon"
import { c } from "@/utils/generic/classnames"
import { Combobox } from "@headlessui/react"
import React from "react"

export type AutocompleteOptionProps = Parameters<typeof Combobox.Option>[0]

export function AutocompleteOption(props: AutocompleteOptionProps) {
	return <Combobox.Option {...props}
		className={({ active, disabled }) => c(
			"w-full relative flex items-center px-4 py-2 text-sm",
			c.if(active)("bg-slate-100 dark:bg-slate-740")
				.else("bg-white dark:bg-slate-700 "),
			c.if(disabled)("opacity-50"),
			props.className
		)}
	>
		{({ selected }) => <>
			{props.children}
			{selected && <span className="text-primary-500 absolute right-4">
				<Icon.Material icon="check" />
			</span>}
		</>
		}
	</Combobox.Option >
}
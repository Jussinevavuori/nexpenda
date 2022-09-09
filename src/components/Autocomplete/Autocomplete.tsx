import { Combobox } from "@headlessui/react"
import React from "react"
import { AutocompleteInput } from "./components/AutocompleteInput"
import { AutocompleteOption } from "./components/AutocompleteOption"
import { AutocompleteOptions } from "./components/AutocompleteOptions"

export type AutocompleteProps = Parameters<typeof Combobox>[0]

export const Autocomplete = Object.assign(function Autocomplete({ children, ...props }: AutocompleteProps) {

	if (typeof children === "function") {
		return <Combobox {...props} className={"relative " + props.className}>
			{(renderProps) => <div className="relative">
				{children(renderProps)}
			</div>}
		</Combobox>
	}

	return <Combobox {...props} className={"relative " + props.className} >
		<div className="relative">
			{children}
		</div>
	</Combobox>
}, {
	Input: AutocompleteInput,
	Option: AutocompleteOption,
	Options: AutocompleteOptions
})
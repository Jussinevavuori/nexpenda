import { Autocomplete } from "@/components/Autocomplete/Autocomplete";
import { Button } from "@/components/Button/Button";
import { KeySymbol } from "@/components/KeySymbol/KeySymbol";
import { themeMemory } from "@/utils/themes/themeMemory";
import { useState } from "react";

const allOptions = [
	{
		value: "alpha",
		number: 1,
		char: "ɑ",
		disabled: false,
	},
	{
		value: "beta",
		number: 2,
		char: "β",
		disabled: false,
	},
	{
		value: "gamma",
		number: 3,
		char: "Ɣ",
		disabled: true,
	},
	{
		value: "delta",
		number: 4,
		char: "Δ",
		disabled: false,
	},
] as const

type Value = typeof allOptions[number]["value"];

export default function TestInputsPage() {
	const theme = themeMemory.useValue();
	const [input, setInput] = useState("")
	const [value, setValue] = useState<Value | undefined>(undefined)

	const options = allOptions.filter(
		op => op.value.toLowerCase().includes(input.toLowerCase())
	)

	return (
		<div className="p-8 bg-white dark:bg-slate-800">
			<div className="flex gap-4">
				<Button color={theme === "dark" ? "primary" : "monochrome"} onClick={() => themeMemory.set(theme === "dark" ? "light" : "dark")}>Dark Mode</Button>
			</div>

			<div className="p-4" />
			<table className="">
				<tbody>
					<tr>
						<td>
							<Autocomplete value={value} onChange={setValue}>
								<Autocomplete.Input onChange={e => setInput(e.target.value)} />
								<Autocomplete.Options>
									{
										options.map(op => (
											<Autocomplete.Option
												key={op.value}
												value={op.value}
												className="flex gap-2"
												disabled={op.disabled}
											>
												<KeySymbol symbol={op.number.toString()} />
												{op.value}
												<KeySymbol symbol={op.char} />
											</Autocomplete.Option>
										))
									}
								</Autocomplete.Options>
							</Autocomplete>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
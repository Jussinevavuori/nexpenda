import { Switch } from "@/components/Switch/Switch";
import { setTheme } from "@/utils/color/setTheme";
import React, { useState } from "react"
import { usePreference } from "../Preferences/hooks/usePreference";
import { useUpdatePreference } from "../Preferences/hooks/useUpdatePreference";
import { PaletteSelector } from "../PreferencesSettings/components/PaletteSelector";

export type UITesterProps<Toggle extends string, Col extends string, Row extends string> = {

	toggles: string[],

	columns: Col[],
	rows: Row[],

	renderInstance(opts: {
		row: Row,
		col: Col,
		toggles: Partial<Record<Toggle, boolean>>;
	}): React.ReactNode;

}

export function UITester<Toggle extends string, Col extends string, Row extends string>(props: UITesterProps<Toggle, Col, Row>) {

	const [toggles, setToggles] = useState<Partial<Record<Toggle, boolean>>>({});

	const theme = usePreference("theme");
	const updateTheme = useUpdatePreference("theme")

	return <div className="bg-white dark:bg-black min-h-screen w-full">
		<div className="mx-auto max-w-4xl">

			<div>
				<section className="flex justify-between items-center py-2 border-t border-t-divider w-full	">
					<PaletteSelector disableSplash />
				</section>

				<section className="flex justify-between items-center py-2 border-t border-t-divider w-full	">
					<p>
						Dark Theme
					</p>
					<Switch value={theme === "dark"} onChange={v => { updateTheme(v ? "dark" : "light"); setTheme(v ? "dark" : "light") }} />
				</section>

				{
					props.toggles.map(toggle => (
						<section key={toggle} className="flex justify-between items-center py-2 border-t border-t-divider w-full	">
							<p className="capitalize">
								{toggle}
							</p>
							<Switch value={!!toggles[toggle as Toggle]} onChange={v => setToggles(_ => ({ ..._, [toggle]: v }))} />
						</section >
					))
				}
			</div>

			<table>
				<thead>
					<tr>
						<th />
						{props.columns.map(col => (
							<th className="text-left capitalize p-2 text-sm" key={col}>
								{col}
							</th>
						))}
					</tr>
				</thead>

				<tbody>

					{
						props.rows.map(row => (
							<tr key={row}>
								<td className="p-2 capitalize text-sm">
									{row}
								</td>
								{
									props.columns.map(col => (
										<td className="p-2" key={col}>
											{props.renderInstance({ col, row, toggles })}
										</td>
									))
								}
							</tr>
						))
					}

				</tbody>
			</table>
		</div>
	</div>
}
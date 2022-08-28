import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";

export default function TestButtonsPage() {
	return (
		<div className="flex">

			<div className="bg-white dark:bg-slate-900">
				<table className="">
					<tbody>
						<tr>
							<td className="p-2 text-black dark:text-white">Buttons</td>
							<td className="p-2 text-black dark:text-white"><b>Default</b></td>
							<td className="p-2 text-black dark:text-white"><b>Flat</b></td>
							<td className="p-2 text-black dark:text-white"><b>Ghost</b></td>
							<td className="p-2 text-black dark:text-white"><b>Bordered</b></td>
							<td className="p-2 text-black dark:text-white"><b>Text</b></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Primary</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Success</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

					</tbody>
				</table>

				<table className="mt-8">
					<tbody>
						<tr>
							<td className="p-2 text-black dark:text-white">Disabled</td>
							<td className="p-2 text-black dark:text-white"><b>Default</b></td>
							<td className="p-2 text-black dark:text-white"><b>Flat</b></td>
							<td className="p-2 text-black dark:text-white"><b>Ghost</b></td>
							<td className="p-2 text-black dark:text-white"><b>Bordered</b></td>
							<td className="p-2 text-black dark:text-white"><b>Text</b></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Primary</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Success</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

					</tbody>
				</table>

				<table className="mt-8">
					<tbody>
						<tr>
							<td className="p-2 text-black dark:text-white">Disabled</td>
							<td className="p-2 text-black dark:text-white"><b>Default</b></td>
							<td className="p-2 text-black dark:text-white"><b>Flat</b></td>
							<td className="p-2 text-black dark:text-white"><b>Ghost</b></td>
							<td className="p-2 text-black dark:text-white"><b>Bordered</b></td>
							<td className="p-2 text-black dark:text-white"><b>Text</b></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Primary</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Success</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="default"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="flat"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
							<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="text"><Icon.Material icon="check" /></IconButton></td>
						</tr>

					</tbody>
				</table>
			</div>

			<div className="dark">
				<div className="bg-white dark:bg-slate-900">
					<table className="">
						<tbody>
							<tr>
								<td className="p-2 text-black dark:text-white">Buttons</td>
								<td className="p-2 text-black dark:text-white"><b>Default</b></td>
								<td className="p-2 text-black dark:text-white"><b>Flat</b></td>
								<td className="p-2 text-black dark:text-white"><b>Ghost</b></td>
								<td className="p-2 text-black dark:text-white"><b>Bordered</b></td>
								<td className="p-2 text-black dark:text-white"><b>Text</b></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Primary</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="primary" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="monochrome" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Success</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="success" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="warning" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton color="danger" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

						</tbody>
					</table>

					<table className="mt-8">
						<tbody>
							<tr>
								<td className="p-2 text-black dark:text-white">Disabled</td>
								<td className="p-2 text-black dark:text-white"><b>Default</b></td>
								<td className="p-2 text-black dark:text-white"><b>Flat</b></td>
								<td className="p-2 text-black dark:text-white"><b>Ghost</b></td>
								<td className="p-2 text-black dark:text-white"><b>Bordered</b></td>
								<td className="p-2 text-black dark:text-white"><b>Text</b></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Primary</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="primary" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="monochrome" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Success</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="success" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="warning" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton disabled color="danger" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

						</tbody>
					</table>

					<table className="mt-8">
						<tbody>
							<tr>
								<td className="p-2 text-black dark:text-white">Disabled</td>
								<td className="p-2 text-black dark:text-white"><b>Default</b></td>
								<td className="p-2 text-black dark:text-white"><b>Flat</b></td>
								<td className="p-2 text-black dark:text-white"><b>Ghost</b></td>
								<td className="p-2 text-black dark:text-white"><b>Bordered</b></td>
								<td className="p-2 text-black dark:text-white"><b>Text</b></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Primary</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="primary" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="monochrome" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Success</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="success" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="warning" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="default"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="flat"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="ghost"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="bordered"><Icon.Material icon="check" /></IconButton></td>
								<td className="p-2 text-black dark:text-white"><IconButton loading color="danger" variant="text"><Icon.Material icon="check" /></IconButton></td>
							</tr>

						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
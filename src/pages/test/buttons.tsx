import { Button } from "@/components/Button/Button";

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
							<td className="p-2 text-black dark:text-white"><Button color="primary" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="primary" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="primary" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="primary" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="primary" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
							<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Success</b></td>
							<td className="p-2 text-black dark:text-white"><Button color="success" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="success" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="success" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="success" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="success" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
							<td className="p-2 text-black dark:text-white"><Button color="warning" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="warning" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="warning" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="warning" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="warning" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
							<td className="p-2 text-black dark:text-white"><Button color="danger" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="danger" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="danger" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="danger" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button color="danger" variant="text">Click me</Button></td>
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
							<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Success</b></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="text">Click me</Button></td>
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
							<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Success</b></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="text">Click me</Button></td>
						</tr>

						<tr>
							<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="default">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="flat">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="ghost">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="bordered">Click me</Button></td>
							<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="text">Click me</Button></td>
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
								<td className="p-2 text-black dark:text-white"><Button color="primary" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="primary" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="primary" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="primary" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="primary" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
								<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="monochrome" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Success</b></td>
								<td className="p-2 text-black dark:text-white"><Button color="success" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="success" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="success" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="success" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="success" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
								<td className="p-2 text-black dark:text-white"><Button color="warning" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="warning" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="warning" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="warning" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="warning" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
								<td className="p-2 text-black dark:text-white"><Button color="danger" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="danger" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="danger" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="danger" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button color="danger" variant="text">Click me</Button></td>
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
								<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="primary" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="monochrome" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Success</b></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="success" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="warning" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button disabled color="danger" variant="text">Click me</Button></td>
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
								<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="primary" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Monochrome</b></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="monochrome" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Success</b></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="success" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Warning</b></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="warning" variant="text">Click me</Button></td>
							</tr>

							<tr>
								<td className="p-2 text-black dark:text-white"><b>Danger</b></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="default">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="flat">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="ghost">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="bordered">Click me</Button></td>
								<td className="p-2 text-black dark:text-white"><Button loading color="danger" variant="text">Click me</Button></td>
							</tr>

						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
import { Button } from "@/components/Button/Button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const session = useSession();
	return (
		<>
			<div className="p-2 mb-8">
				{
					session.status === "unauthenticated"
						? <>
							<Button onClick={() => signIn("google")}>
								Sign in (google)
							</Button>
							<Button color="monochrome" onClick={() => signIn("github")}>
								Sign in (github)
							</Button>
						</>
						: <>
							<Button onClick={() => signOut()}>
								Log out
							</Button>
							<p>{session.data?.user?.name}</p>
						</>
				}
			</div>
			<table className="">
				<tbody>
					<tr>
						<td className="p-2">Buttons</td>
						<td className="p-2"><b>Default</b></td>
						<td className="p-2"><b>Flat</b></td>
						<td className="p-2"><b>Ghost</b></td>
						<td className="p-2"><b>Bordered</b></td>
						<td className="p-2"><b>Text</b></td>
					</tr>

					<tr>
						<td className="p-2"><b>Primary</b></td>
						<td className="p-2"><Button color="primary" variant="default">Click me</Button></td>
						<td className="p-2"><Button color="primary" variant="flat">Click me</Button></td>
						<td className="p-2"><Button color="primary" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button color="primary" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button color="primary" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Monochrome</b></td>
						<td className="p-2"><Button color="monochrome" variant="default">Click me</Button></td>
						<td className="p-2"><Button color="monochrome" variant="flat">Click me</Button></td>
						<td className="p-2"><Button color="monochrome" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button color="monochrome" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button color="monochrome" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Success</b></td>
						<td className="p-2"><Button color="success" variant="default">Click me</Button></td>
						<td className="p-2"><Button color="success" variant="flat">Click me</Button></td>
						<td className="p-2"><Button color="success" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button color="success" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button color="success" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Warning</b></td>
						<td className="p-2"><Button color="warning" variant="default">Click me</Button></td>
						<td className="p-2"><Button color="warning" variant="flat">Click me</Button></td>
						<td className="p-2"><Button color="warning" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button color="warning" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button color="warning" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Danger</b></td>
						<td className="p-2"><Button color="danger" variant="default">Click me</Button></td>
						<td className="p-2"><Button color="danger" variant="flat">Click me</Button></td>
						<td className="p-2"><Button color="danger" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button color="danger" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button color="danger" variant="text">Click me</Button></td>
					</tr>

				</tbody>
			</table>

			<table className="mt-8">
				<tbody>
					<tr>
						<td className="p-2">Disabled</td>
						<td className="p-2"><b>Default</b></td>
						<td className="p-2"><b>Flat</b></td>
						<td className="p-2"><b>Ghost</b></td>
						<td className="p-2"><b>Bordered</b></td>
						<td className="p-2"><b>Text</b></td>
					</tr>

					<tr>
						<td className="p-2"><b>Primary</b></td>
						<td className="p-2"><Button loading color="primary" variant="default">Click me</Button></td>
						<td className="p-2"><Button loading color="primary" variant="flat">Click me</Button></td>
						<td className="p-2"><Button loading color="primary" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button loading color="primary" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button loading color="primary" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Monochrome</b></td>
						<td className="p-2"><Button loading color="monochrome" variant="default">Click me</Button></td>
						<td className="p-2"><Button loading color="monochrome" variant="flat">Click me</Button></td>
						<td className="p-2"><Button loading color="monochrome" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button loading color="monochrome" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button loading color="monochrome" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Success</b></td>
						<td className="p-2"><Button loading color="success" variant="default">Click me</Button></td>
						<td className="p-2"><Button loading color="success" variant="flat">Click me</Button></td>
						<td className="p-2"><Button loading color="success" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button loading color="success" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button loading color="success" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Warning</b></td>
						<td className="p-2"><Button loading color="warning" variant="default">Click me</Button></td>
						<td className="p-2"><Button loading color="warning" variant="flat">Click me</Button></td>
						<td className="p-2"><Button loading color="warning" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button loading color="warning" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button loading color="warning" variant="text">Click me</Button></td>
					</tr>

					<tr>
						<td className="p-2"><b>Danger</b></td>
						<td className="p-2"><Button loading color="danger" variant="default">Click me</Button></td>
						<td className="p-2"><Button loading color="danger" variant="flat">Click me</Button></td>
						<td className="p-2"><Button loading color="danger" variant="ghost">Click me</Button></td>
						<td className="p-2"><Button loading color="danger" variant="bordered">Click me</Button></td>
						<td className="p-2"><Button loading color="danger" variant="text">Click me</Button></td>
					</tr>

				</tbody>
			</table>
		</>
	);
};
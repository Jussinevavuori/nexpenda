import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { c } from "@/utils/generic/classnames";
import { pages } from "@/utils/pages";

export type AdminLayoutProps = {
	children?: React.ReactNode;
	title?: string;
}

export function AdminLayout(props: AdminLayoutProps) {
	return <div className="relative px-6 d:px-10 py-6">
		<header className="-mt-6 mb-4 p-4 bg-danger rounded-b-lg flex items-center">
			<IconButton.Link href={pages.settings.root} variant="text" className="mr-4">
				<Icon.Material icon="arrow_back" className="text-white" />
			</IconButton.Link>
			<h1 className="text-white font-bold">
				{props.title}
			</h1>
			<p className="text-white-3 text ml-auto">
				Admin only area
			</p>
		</header>

		<div>
			{props.children}
		</div>
	</div>

}
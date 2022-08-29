import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { c } from "@/utils/generic/classnames";
import { pages } from "@/utils/pages";

export type AdminLayoutProps = {
	children?: React.ReactNode;
	title?: string;
}

export function AdminLayout(props: AdminLayoutProps) {
	return <div className={c("relative px-6 d:px-10 py-6")}>
		<header className="-mt-6 mb-4 p-4 bg-danger rounded-b-lg flex items-center">
			<IconButton.Link href={pages.settings.root} variant="text" className="mr-4">
				<Icon.Material icon="arrow_back" className="text-white-text" />
			</IconButton.Link>
			<div>
				<h1 className="text-white text-2xl font-bold">
					{props.title}
				</h1>
				<p className="text-white-secondary text">
					Admin only area.
				</p>
			</div>
		</header>

		{props.children}
	</div>

}
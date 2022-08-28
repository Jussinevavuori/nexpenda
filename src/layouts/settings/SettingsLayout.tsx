import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { c } from "@/utils/generic/classnames";
import { pages } from "@/utils/pages";
import { SettingsScreen } from "./components/SettingsScreen/SettingsScreen";

export type SettingsLayoutProps = {
	children?: React.ReactNode;
	title?: string;
}

export function SettingsLayout(props: SettingsLayoutProps) {
	const isPanelOpen = !!props.children
	const isLargeScreen = useBreakpoint("xl")

	// Split screen
	if (isLargeScreen) {
		return <div className="px-10 py-6 flex items-stretch">
			<div className={c("", isPanelOpen ? "w-1/2" : "w-full")}>
				<SettingsScreen />
			</div>
			{
				isPanelOpen && <>
					<Divider variant="vertical" className="mx-10" />
					<div className={c("w-1/2", isPanelOpen ? "" : "")}>
						<div className="bg-white dark:bg-slate-800 h-full">
							{props.children}
						</div>
					</div>
				</>
			}
		</div>
	}

	// Default
	return <div className={c("relative px-6 d:px-10 py-6")}>
		{
			isPanelOpen
				? <div className="bg-white dark:bg-slate-800 h-full">

					<header className="flex gap-4 items-center">
						<IconButton.Link href={pages.settings.root} variant="bordered">
							<Icon.Material icon="arrow_back" />
						</IconButton.Link>
						<p className="">
							{props.title}
						</p>
					</header>

					{props.children}
				</div>
				: <SettingsScreen />
		}
	</ div>
}
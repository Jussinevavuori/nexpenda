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
		return <div className="px-10 py-6 flex">
			<div className="flex-[1]">
				<SettingsScreen />
			</div>
			<Divider variant="vertical" className={c("mx-10", isPanelOpen ? "opacity-100" : "opacity-0")} />
			<div className={c("flex-[2]", isPanelOpen ? "" : "")}>
				<div className="bg-white dark:bg-slate-800 h-full pt-10">
					{
						props.children ?? <div className="flex flex-col items-center">
							<div className="border border-slate-300 dark:border-slate-700 border-dashed rounded-lg p-6 flex flex-col items-center gap-6 mx-auto text-center w-full">
								<Icon.Feather icon="sliders" />
								<p className="text-slate-700 dark:text-slate-400 text-sm max-w-xs">
									Manage all your settings here. Start by selecting a category.
								</p>
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	}

	// Default
	return <div className={c("relative px-6 d:px-10 py-6")}>
		{
			isPanelOpen
				? <div className="bg-white dark:bg-slate-800 h-full">

					<header className="flex gap-4 items-center pb-4">
						<IconButton.Link href={pages.settings.root} variant="bordered">
							<Icon.Material icon="arrow_back" />
						</IconButton.Link>
						<h1>
							{props.title}
						</h1>
					</header>

					{props.children}
				</div>
				: <SettingsScreen />
		}
	</ div>
}
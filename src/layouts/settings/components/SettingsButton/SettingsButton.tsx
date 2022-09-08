import { Icon } from "@/components/Icon/Icon";
import { c } from "@/utils/generic/classnames";
import Link from "next/link";
import { useRouter } from "next/router";

export type SettingsButtonProps = {
	children: string;
	icon: React.ReactNode;
	indicator?: React.ReactNode;
	href: string;
}

export function SettingsButton(props: SettingsButtonProps) {

	const router = useRouter();
	const isSelected = props.href.includes("/settings") && router.pathname.includes(props.href);

	return <Link
		href={props.href}
		className={c(
			"flex items-center justify-between px-4 py-3 rounded-lg w-full mx-auto",
			isSelected
				? "bg-primary-500"
				: "bg-white-bg-2 dark:bg-black-bg-3 hover:bg-white-bg-3 dark:hover:bg-black-bg-4 active:bg-white-bg-4 dark:active:bg-black-bg-5"
		)}
	>

		{/* Label and icon */}
		<p className={c("flex items-center gap-4", isSelected ? "text-white" : "text-black dark:text-white")}>
			{props.icon}
			{props.children}
		</p>

		{/* Indicator */}
		<span className={isSelected ? "text-white" : "text-black dark:text-white"}>
			{
				props.indicator
					? props.indicator
					: <Icon.Material icon="chevron_right" />
			}
		</span>

	</Link>

}
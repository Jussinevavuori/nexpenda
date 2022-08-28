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
			"flex items-center justify-between px-4 py-3 rounded transition-colors w-full mx-auto",
			isSelected
				? "bg-primary-500"
				: "bg-slate-100 dark:bg-slate-780 hover:bg-slate-200 dark:hover:bg-slate-740 focus:bg-slate-200 dark:focus:bg-slate-740 active:bg-slate-300 dark:active:bg-slate-700"
		)}
	>

		{/* Label and icon */}
		<span className="flex items-center gap-4">
			{props.icon}
			<p className={isSelected ? "text-slate-100 dark:text-slate-900" : "dark:text-slate-100"}>
				{props.children}
			</p>
		</span>

		{/* Indicator */}
		<span className={isSelected ? "text-slate-100 dark:text-slate-900" : "text-slate-800 dark:text-slate-100"}>
			{
				props.indicator
					? props.indicator
					: <Icon.Material icon="chevron_right" />
			}
		</span>

	</Link>

}
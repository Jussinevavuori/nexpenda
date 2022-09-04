import { Icon } from "@/components/Icon/Icon";
import { usePrefersColorSchemeDark } from "@/hooks/usePrefersColorSchemeDark";
import { capitalize } from "@/utils/generic/capitalize";
import { c } from "@/utils/generic/classnames";

export type ThemeSelectorButtonProps = {
	variant: SelectableTheme;
	onClick?(): void;
	isSelected?: boolean;
}

export function ThemeSelectorButton(props: ThemeSelectorButtonProps) {
	const prefersDark = usePrefersColorSchemeDark();
	const theme = props.variant === "system" ? (prefersDark ? "dark" : "light") : props.variant;

	return <button
		onClick={props.onClick}
		className={c("flex flex-col gap-2")}
	>

		<div className={c("w-48 h-36 rounded-lg overflow-hidden relative", c.variant(theme)({
			dark: "bg-slate-850",
			light: "bg-slate-200",
		}), c.if(props.isSelected)("ring ring-primary"))}>

			<div
				className={c("absolute h-36 w-12", c.variant(theme)({
					dark: "bg-slate-900",
					light: "bg-slate-300"
				}))}
			/>

			<div
				className={c("absolute rounded h-28 w-12 left-14 top-2", c.variant(theme)({
					dark: "bg-slate-900",
					light: "bg-slate-100"
				}))}
			>
				<div className={c("absolute rounded h-4 w-8 left-2 top-2", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-8", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-14", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-20", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
			</div>

			<div
				className={c("absolute rounded h-20 w-12 left-28 top-2", c.variant(theme)({
					dark: "bg-slate-900",
					light: "bg-slate-100"
				}))}
			>
				<div className={c("absolute rounded h-4 w-8 left-2 top-2", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-8", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-14", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
			</div>

			<div
				className={c("absolute rounded h-20 w-12 left-28 top-24", c.variant(theme)({
					dark: "bg-slate-900",
					light: "bg-slate-100"
				}))}
			>
				<div className={c("absolute rounded h-4 w-8 left-2 top-2", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-8", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-14", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
			</div>

			<div
				className={c("absolute rounded h-28 w-12 left-[10.5rem] top-2", c.variant(theme)({
					dark: "bg-slate-900",
					light: "bg-slate-100"
				}))}
			>
				<div className={c("absolute rounded h-4 w-8 left-2 top-2", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-8", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-14", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
				<div className={c("absolute rounded h-4 w-8 left-2 top-20", c.variant(theme)({ dark: "bg-slate-850", light: "bg-slate-200" }))} />
			</div>

			<div
				className={c("absolute rounded h-36 w-12", c.variant(theme)({
					dark: "bg-slate-900",
					light: "bg-slate-300"
				}))}
			/>

			{
				props.variant === "system" && <span className="absolute left-0 top-0 m-2">
					<Icon.Material icon="desktop_windows" className={prefersDark ? "text-white" : "text-black"} size={20} />
				</span>
			}

			{
				props.isSelected && <span className="absolute right-0 bottom-0 m-2 rounded-full bg-primary p-1">
					<Icon.Material icon="check" className="text-white" size={20} />
				</span>
			}

		</div>

		<p className="text-sm text-black-secondary dark:text-white-secondary">
			{capitalize(props.variant)} theme
		</p>

	</button >
}
import { FullscreenSplash, useFullscreenSplashController } from "@/components/FullscreenSplash/FullscreenSplash";
import { Icon } from "@/components/Icon/Icon";
import { getSystemThemeMode } from "@/utils/dom/getSystemThemeMode";
import { c } from "@/utils/generic/classnames";
import { themeMemory } from "@/utils/themes/themeMemory"
import { ThemeSelectorButton } from "./components/ThemeSelectorButton";

export type ThemeSelectorProps = {

}

const EFFECT_DURATION = 1200;

export function ThemeSelector(props: ThemeSelectorProps) {

	const currentTheme = themeMemory.useValue();

	const splash = useFullscreenSplashController();

	const select = (theme: SelectableTheme) => {
		splash.animate({ color: theme === "system" ? getSystemThemeMode() : theme })
		setTimeout(() => themeMemory.set(theme), EFFECT_DURATION / 2)
	}

	return <ul className="flex flex-col gap-4">

		<FullscreenSplash ref={splash.ref} />

		<ThemeSelectorButton
			icon={<Icon.Material
				icon={"light_mode"}
				className={
					c.if(currentTheme === "light")("text-white")
						.else("text-yellow-500")}
			/>}
			onClick={() => select("light")}
			isSelected={currentTheme === "light"}
		>
			Light mode
		</ThemeSelectorButton>

		<ThemeSelectorButton
			icon={<Icon.Material
				icon={"dark_mode"}
				className={
					c.if(currentTheme === "dark")("text-black")
						.else("text-blue-500")}
			/>}
			onClick={() => select("dark")}
			isSelected={currentTheme === "dark"}
		>
			Dark mode
		</ThemeSelectorButton>

		<ThemeSelectorButton
			icon={<Icon.Material
				icon={"desktop_windows"}
				className={
					c.if(currentTheme === "system")("text-white")
						.else("text-black dark:text-white")}
			/>}
			onClick={() => select("system")}
			isSelected={currentTheme === "system"}
		>
			System default
		</ThemeSelectorButton>

	</ul>

}
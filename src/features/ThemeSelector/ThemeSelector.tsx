import { FullscreenSplash, useFullscreenSplashController } from "@/components/FullscreenSplash/FullscreenSplash";
import { getSystemThemeMode } from "@/utils/dom/getSystemThemeMode";
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

	return <ul className="flex flex-row flex-wrap gap-6">

		<FullscreenSplash ref={splash.ref} />

		<ThemeSelectorButton
			variant="light"
			onClick={() => select("light")}
			isSelected={currentTheme === "light"}
		/>

		<ThemeSelectorButton
			variant="dark"
			onClick={() => select("dark")}
			isSelected={currentTheme === "dark"}
		/>

		<ThemeSelectorButton
			variant="system"
			onClick={() => select("system")}
			isSelected={currentTheme === "system"}
		/>

	</ul>

}
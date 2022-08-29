import { FullscreenSplash, useFullscreenSplashController } from "@/components/FullscreenSplash/FullscreenSplash";
import { getSystemThemeMode } from "@/utils/dom/getSystemThemeMode";
import { usePreference } from "../Preferences/hooks/usePreference";
import { useUpdatePreference } from "../Preferences/hooks/useUpdatePreference";
import { ThemeSelectorButton } from "./components/ThemeSelectorButton";

export type ThemeSelectorProps = {

}

const EFFECT_DURATION = 1200;

export function ThemeSelector(props: ThemeSelectorProps) {
	const theme = usePreference("theme");
	const setTheme = useUpdatePreference("theme");

	const splash = useFullscreenSplashController();

	const select = (next: SelectableTheme) => {
		splash.animate({ color: next === "system" ? getSystemThemeMode() : next })
		setTimeout(() => setTheme(next), EFFECT_DURATION / 2);
	}

	return <ul className="flex flex-row flex-wrap gap-6">

		<FullscreenSplash ref={splash.ref} />

		<ThemeSelectorButton
			variant="light"
			onClick={() => select("light")}
			isSelected={theme === "light"}
		/>

		<ThemeSelectorButton
			variant="dark"
			onClick={() => select("dark")}
			isSelected={theme === "dark"}
		/>

		<ThemeSelectorButton
			variant="system"
			onClick={() => select("system")}
			isSelected={theme === "system"}
		/>

	</ul>

}
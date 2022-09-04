import { FullscreenSplash, useFullscreenSplashController } from "@/components/FullscreenSplash/FullscreenSplash";
import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";
import { getSystemThemeMode } from "@/utils/dom/getSystemThemeMode";
import { ThemeSelectorButton } from "./ThemeSelectorButton";

const EFFECT_DURATION = 1200;

export function ThemeSelector() {
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
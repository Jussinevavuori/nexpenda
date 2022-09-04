import { Color } from "@/components/Color/Color";
import { FullscreenSplash, useFullscreenSplashController } from "@/components/FullscreenSplash/FullscreenSplash";
import { palettes } from "@/utils/color/palettes";
import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { usePreference } from "../Preferences/hooks/usePreference";
import { useUpdatePreference } from "../Preferences/hooks/useUpdatePreference";
import { PaletteSelectorButton } from "./components/PaletteSelectorButton";


const EFFECT_DURATION = 900;

export function PaletteSelector() {
	const palette = usePreference("palette")
	const setPalette = useUpdatePreference("palette")

	const splash = useFullscreenSplashController();

	const select = (next: StaticPalette) => {
		splash.animate({ color: next })
		setTimeout(() => {
			setPalette(next);
			setPrimaryColor(next)
		}, EFFECT_DURATION / 2)
	}

	return <ul className="flex flex-row flex-wrap gap-4">

		<FullscreenSplash ref={splash.ref} defaultDurationMs={EFFECT_DURATION} />

		{
			palettes.staticColor.map(p => (
				<Color color={p} key={p}>
					<PaletteSelectorButton
						onClick={() => select(p)}
						isSelected={palette === p}
					/>
				</Color>
			))
		}

	</ul>

}
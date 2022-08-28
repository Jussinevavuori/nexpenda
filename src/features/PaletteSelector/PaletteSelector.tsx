import { Color } from "@/components/Color/Color";
import { FullscreenSplash, useFullscreenSplashController } from "@/components/FullscreenSplash/FullscreenSplash";
import { Icon } from "@/components/Icon/Icon";
import { paletteMemory } from "@/utils/color/paletteMemory";
import { palettes } from "@/utils/color/palettes";
import { setPrimaryColor } from "@/utils/color/setPrimaryColor";
import { capitalize } from "@/utils/generic/capitalize";
import { PaletteSelectorButton } from "./components/PaletteSelectorButton";

export type PaletteSelectorProps = {

}

const EFFECT_DURATION = 900;

export function PaletteSelector(props: PaletteSelectorProps) {

	const currentPalette = paletteMemory.useValue();

	const splash = useFullscreenSplashController();

	const select = (palette: StaticPalette) => {
		splash.animate({ color: palette })
		setTimeout(() => {
			setPrimaryColor(palette);
			paletteMemory.set(palette)
		}, EFFECT_DURATION / 2)
	}

	return <ul className="flex flex-row flex-wrap gap-4">

		<FullscreenSplash ref={splash.ref} defaultDurationMs={EFFECT_DURATION} />

		{
			palettes.staticColor.map(palette => (
				<Color color={palette} key={palette}>
					<PaletteSelectorButton
						onClick={() => select(palette)}
						isSelected={currentPalette === palette}
					/>
				</Color>
			))
		}

	</ul>

}
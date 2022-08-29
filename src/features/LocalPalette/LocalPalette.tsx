
import { Color } from '@/components/Color/Color';
import { getColorValue } from '@/utils/color/getColorValue';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export interface LocalPaletteContextValue {
	palette?: StaticPalette;
	setPalette(_: Setter<StaticPalette | undefined>): void;
}

export const defaultLocalPaletteContextValue: LocalPaletteContextValue = {
	palette: "blue",
	setPalette() { },
}

export const LocalPaletteContext = createContext<LocalPaletteContextValue>(defaultLocalPaletteContextValue)

export interface LocalPaletteProviderProps {
	children?: ReactNode
	disable?: boolean;
	changeScrollbar?: boolean;
}

export function LocalPaletteProvider(props: LocalPaletteProviderProps) {
	const [palette, setPalette] = useState<StaticPalette | undefined>("blue");

	// Change scrollbar color
	useEffect(() => {
		if (!palette || !props.changeScrollbar) return;
		const styleEl = document.createElement("style")
		styleEl.innerText = `@media (min-width: 900px) {
			::-webkit-scrollbar-thumb {
				background: ${getColorValue(palette, 500)} !important;
				transition: background-color 100;
			}
		}`.replace(/\s+/g, " ");
		document.head.appendChild(styleEl);
		return () => {
			document.head.removeChild(styleEl);
		}
	}, [palette, props.changeScrollbar])

	const value = useMemo(() => ({ palette, setPalette }), [palette, setPalette])

	return <LocalPaletteContext.Provider value={value}>
		<Color color={(props.disable) ? undefined : palette}>
			{props.children}
		</Color>
	</LocalPaletteContext.Provider>

}

export function useLocalPalette() {
	return useContext(LocalPaletteContext)
}
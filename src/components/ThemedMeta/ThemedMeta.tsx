import { useLocalThemeContext } from '@contexts/LocalThemeContext/LocalThemeContext';
import { Colors } from '@lib/client/color/Colors';
import { persistentThemeColor } from '@lib/client/persistentItem/items/persistentThemeColor';
import Head from 'next/head';
import React from 'react';

export interface ThemedMetaProps {
	useLocalPalette?: boolean;
}

export const ThemedMeta = React.memo(function (props: ThemedMetaProps) {
	const globalPalette = persistentThemeColor.useValue();
	const { palette: localPalette } = useLocalThemeContext();
	const palette = (props.useLocalPalette ? localPalette : globalPalette) ?? "blue";

	const color = Colors.getColorValue(`${palette}-500`);

	return <Head>
		<meta name="theme-color" content={color} key="theme-color" />
	</Head>
})
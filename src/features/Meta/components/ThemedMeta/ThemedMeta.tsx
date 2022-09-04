import { useLocalPalette } from '@/features/LocalPalette/LocalPalette';
import { usePreference } from '@/features/Preferences/hooks/usePreference';
import { getColorValue } from '@/utils/color/getColorValue';
import Head from 'next/head';
import React from 'react';

export interface ThemedMetaProps {
	useLocalPalette?: boolean;
}

export const ThemedMeta = React.memo(function (props: ThemedMetaProps) {
	const globalPalette = usePreference("palette");
	const { palette: localPalette } = useLocalPalette();
	const palette = (props.useLocalPalette ? localPalette : globalPalette) ?? "blue";
	const color = getColorValue(`${palette}-500`);

	return <Head>
		<meta name="theme-color" content={color} key="theme-color" />
	</Head>
})
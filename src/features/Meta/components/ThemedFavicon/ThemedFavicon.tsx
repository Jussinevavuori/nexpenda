import { usePrefersColorSchemeDark } from '@/hooks/usePrefersColorSchemeDark';
import Head from 'next/head';
import React from 'react';

export interface ThemedFaviconProps {
	dark?: React.ReactNode | string;
	light?: React.ReactNode | string;
	fallback?: "dark" | "light";
}

export const ThemedFavicon = React.memo(function (props: ThemedFaviconProps) {
	const darkMode = usePrefersColorSchemeDark();

	const darkSrc = props.dark ?? _dark;
	const dark = (typeof (darkSrc) === "string"
		? <link rel="icon" href={(darkSrc)} />
		: (darkSrc))

	const lightSrc = props.light ?? _light;
	const light = typeof (lightSrc) === "string"
		? <link rel="icon" href={(lightSrc)} />
		: (lightSrc)

	const fallback = props.fallback === "dark" ? dark : light;

	return <Head>
		{darkMode === undefined && fallback}
		{darkMode === true && dark}
		{darkMode === false && light}
	</Head>
})

const _dark = "/favicon-dark-theme.ico";
const _light = "/favicon-light-theme.ico"
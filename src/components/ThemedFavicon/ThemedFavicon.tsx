import { usePrefersColorSchemeDark } from '@/hooks/usePrefersColorSchemeDark';
import Head from 'next/head';
import React from 'react';

export interface ThemedFaviconProps {
	dark: React.ReactNode | string;
	light: React.ReactNode | string;
}

export const ThemedFavicon = React.memo(function (props: ThemedFaviconProps) {
	const darkMode = usePrefersColorSchemeDark();

	const dark = typeof props.dark === "string"
		? <link rel="icon" href={props.dark} />
		: props.dark

	const light = typeof props.light === "string"
		? <link rel="icon" href={props.light} />
		: props.light

	return <Head>
		{darkMode === true && dark}
		{darkMode === false && light}
	</Head>
})
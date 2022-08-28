import { setPrimaryColor } from '@/utils/color/setPrimaryColor';
import React, { useCallback } from 'react';

export interface ColorProps extends React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> {
	color?: StaticPalette;
}

export function Color({ color, ...divProps }: ColorProps) {
	const callbackRef = useCallback((el: HTMLDivElement) => {
		if (color && el) setPrimaryColor(color, el)
	}, [color])

	return <div ref={callbackRef} {...divProps} />
}
import { useClientSideMemo } from '@/hooks/useClientSideMemo';
import { usePrefersColorSchemeDark } from '@/hooks/usePrefersColorSchemeDark';
import { exposeToWindow } from '@/utils/dom/exposeToWindow';
import { themeMemory } from '@/utils/themes/themeMemory';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';

export interface ThemeContextValue {
	currentTheme: SelectableTheme;
	isDarkTheme: boolean;
	setTheme(value: Theme): void;
}

export const defaultTehemContextValue: ThemeContextValue = {
	currentTheme: "system",
	isDarkTheme: false,
	setTheme() { },
}

export const ThemeContext = createContext<ThemeContextValue>(defaultTehemContextValue)

export interface ThemeContextProviderProps {
	children?: ReactNode
}

export function ThemeProvider(props: ThemeContextProviderProps) {

	// Subscribe to latest saved mode and system preferred color scheme
	const savedMode = themeMemory.useValue();
	const prefersDark = usePrefersColorSchemeDark();

	// Current mode is latest saved mode. Default to light mode when none available
	const currentTheme = useMemo(() => savedMode ?? "light", [savedMode]);

	useEffect(() => exposeToWindow({ toggle: () => themeMemory.set(currentTheme === "dark" ? "light" : "dark") }), [currentTheme])

	// Check whether the current mode is dark or the system setting is dark when
	// system setting enabled
	const isDarkTheme = useClientSideMemo(() => {
		return currentTheme === "dark" || (currentTheme === "system" && prefersDark === true);
	}, [prefersDark, currentTheme]) ?? false;

	// Utility function to toggle the mode
	const setTheme = useCallback((value: Theme) => {
		themeMemory.set(value);
	}, [])

	return <ThemeContext.Provider value={{ currentTheme, isDarkTheme, setTheme }}>
		{/* Provide tailwind CSS with dark and light theme */}
		<div className={isDarkTheme ? "dark" : "light"}>
			{props.children}
		</div>
	</ThemeContext.Provider>
}


export function useThemeContext() {
	return useContext(ThemeContext)
}
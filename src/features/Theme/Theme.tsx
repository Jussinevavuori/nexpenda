import { useClientSideMemo } from '@/hooks/useClientSideMemo';
import { usePrefersColorSchemeDark } from '@/hooks/usePrefersColorSchemeDark';
import { exposeToWindow } from '@/utils/dom/exposeToWindow';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { usePreference } from '../Preferences/hooks/usePreference';
import { useUpdatePreference } from '../Preferences/hooks/useUpdatePreference';

export interface ThemeContextValue {
	theme: SelectableTheme;
	isDarkTheme: boolean;
	setTheme(value: Theme): void;
}

export const defaultTehemContextValue: ThemeContextValue = {
	theme: "system",
	isDarkTheme: false,
	setTheme() { },
}

export const ThemeContext = createContext<ThemeContextValue>(defaultTehemContextValue)

export interface ThemeContextProviderProps {
	children?: ReactNode
}

export function ThemeProvider(props: ThemeContextProviderProps) {

	// Subscribe to latest saved mode and system preferred color scheme
	const theme = usePreference("theme");
	const setTheme = useUpdatePreference("theme");
	const prefersDark = usePrefersColorSchemeDark();

	useEffect(() => exposeToWindow({ toggle: () => setTheme(theme === "dark" ? "light" : "dark") }), [theme, setTheme])

	// Check whether the current mode is dark or the system setting is dark when
	// system setting enabled
	const isDarkTheme = useClientSideMemo(() => {
		return theme === "dark" || (theme === "system" && prefersDark === true);
	}, [prefersDark, theme]) ?? false;

	return <ThemeContext.Provider value={{ theme, isDarkTheme, setTheme }}>
		{/* Provide tailwind CSS with dark and light theme */}
		<div className={isDarkTheme ? "dark" : "light"}>
			{props.children}
		</div>
	</ThemeContext.Provider>
}


export function useThemeContext() {
	return useContext(ThemeContext)
}
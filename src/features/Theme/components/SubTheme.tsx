import { useCurrentTheme } from "../hooks/useCurrentTheme";

export type SubThemeProviderProps = {
	children?: React.ReactNode; theme?: Theme
}

export function SubThemeProvider(props: SubThemeProviderProps) {
	const theme = useCurrentTheme(props.theme);

	return <div className={theme}>
		{props.children}
	</div>
}

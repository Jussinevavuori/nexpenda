import { useTheme } from "../hooks/useTheme";

export type SubThemeProviderProps = {
	children?: React.ReactNode;
	theme?: Theme
}

export function SubThemeProvider(props: SubThemeProviderProps) {
	const theme = useTheme(props.theme);

	return <div className={theme}>
		{props.children}
	</div>
}

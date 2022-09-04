import { SubThemeProvider } from '@/features/Theme/components/SubTheme';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuPortalProps = RadixContextMenu.ContextMenuPortalProps

export function ContextMenuPortal({ children, ...props }: ContextMenuPortalProps) {
	return <RadixContextMenu.ContextMenuPortal {...props}>
		<SubThemeProvider>
			{children}
		</SubThemeProvider>
	</RadixContextMenu.ContextMenuPortal>
}
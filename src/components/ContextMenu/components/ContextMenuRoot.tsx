import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuRootProps = RadixContextMenu.ContextMenuProps

export function ContextMenuRoot(props: ContextMenuRootProps) {
	return <RadixContextMenu.Root {...props} />
}
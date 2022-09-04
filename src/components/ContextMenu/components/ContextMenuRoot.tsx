import * as RadixContextMenu from '@radix-ui/react-context-menu';

export interface ContextMenuRootProps extends RadixContextMenu.ContextMenuProps {

}

export function ContextMenuRoot(props: ContextMenuRootProps) {
	return <RadixContextMenu.Root {...props} />
}
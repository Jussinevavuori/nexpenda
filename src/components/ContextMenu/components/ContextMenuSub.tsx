import * as RadixContextMenu from '@radix-ui/react-context-menu';

export interface ContextMenuSubProps extends RadixContextMenu.ContextMenuSubProps {

}

export function ContextMenuSub(props: ContextMenuSubProps) {

	return <RadixContextMenu.ContextMenuSub {...props} />
}
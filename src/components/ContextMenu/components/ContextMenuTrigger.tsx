import * as RadixContextMenu from '@radix-ui/react-context-menu';

export interface ContextMenuTriggerProps extends RadixContextMenu.ContextMenuTriggerProps {

}

export function ContextMenuTrigger(props: ContextMenuTriggerProps) {
	return <RadixContextMenu.Trigger {...props} />
}
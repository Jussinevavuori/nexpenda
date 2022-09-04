import * as RadixContextMenu from '@radix-ui/react-context-menu';

export type ContextMenuTriggerProps = RadixContextMenu.ContextMenuTriggerProps

export function ContextMenuTrigger(props: ContextMenuTriggerProps) {
	return <RadixContextMenu.Trigger {...props} />
}
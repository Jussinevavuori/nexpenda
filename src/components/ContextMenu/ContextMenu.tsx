import { ContextMenuContent } from "./components/ContextMenuContent";
import { ContextMenuGroup } from "./components/ContextMenuGroup";
import { ContextMenuItem } from "./components/ContextMenuItem";
import { ContextMenuRadioGroup } from "./components/ContextMenuRadioGroup";
import { ContextMenuRoot } from "./components/ContextMenuRoot";
import { ContextMenuSeparator } from "./components/ContextMenuSeparator";
import { ContextMenuTrigger } from "./components/ContextMenuTrigger";
import { ContextMenuSubTrigger } from "./components/ContextMenuSubTrigger";
import { ContextMenuSub } from "./components/ContextMenuSub";
import { ContextMenuPortal } from "./components/ContextMenuPortal";
import { ContextMenuSubContent } from "./components/ContextMenuSubContent";

export const ContextMenu = Object.assign(ContextMenuRoot, {
	Content: ContextMenuContent,
	Group: ContextMenuGroup,
	Item: ContextMenuItem,
	RadioGroup: ContextMenuRadioGroup,
	Separator: ContextMenuSeparator,
	Trigger: ContextMenuTrigger,
	SubTrigger: ContextMenuSubTrigger,
	Sub: ContextMenuSub,
	SubContent: ContextMenuSubContent,
	Portal: ContextMenuPortal,
})
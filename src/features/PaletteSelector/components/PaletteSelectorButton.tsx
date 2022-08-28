import { Icon } from "@/components/Icon/Icon";

export type PaletteSelectorButtonProps = {
	onClick?(): void;
	isSelected?: boolean;
}

export function PaletteSelectorButton(props: PaletteSelectorButtonProps) {
	return <button
		onClick={props.onClick}
		className="relative p-3 rounded-full bg-primary-500"
	>
		{
			props.isSelected &&
			<span className="absolute inset-0 flex items-center justify-center">
				<Icon.Material icon="check" size={20} className="text-white" />
			</span>
		}
	</button>
}
import { Icon } from '@/components/Icon/Icon';
import { keyCombinationToString } from '@/utils/generic/keyCombinationToString';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { KeyCombination } from '../KeyCombination/KeyCombination';

export interface TooltipProps {
	children?: React.ReactNode;
	value: string | {
		title: string;
		icon?: string;
		description?: string;
		keyCombination?: KeyCombination;
	} | React.ReactNode;
}

export function Tooltip(props: TooltipProps) {

	return <RadixTooltip.Root>
		<RadixTooltip.Trigger asChild>
			{props.children}
		</RadixTooltip.Trigger>
		<RadixTooltip.Content
			className="rounded bg-white dark:bg-slate-800 shadow-lg px-3 py-2"
		>
			{
				typeof props.value === "string" ? (
					<p className="text-slate-900 dark:text-white text-sm">
						{props.value}
					</p>
				) : ((props.value && typeof props.value === "object" && "title" in props.value) ? (
					<div className="flex items-center justify-between">
						<div className="flex flex-col items-start">
							<div className="flex items-center justify-between">
								<p className="text-slate-900 dark:text-white text-sm">
									{props.value.title}
								</p>
								{
									props.value.keyCombination &&
									<span className="ml-auto pl-4 ">
										<KeyCombination keyCombination={props.value.keyCombination} />
									</span>
								}
							</div>
							{
								props.value.description &&
								<p className="max-w-[260px] text-slate-600 dark:text-slate-400 text-sm">
									{props.value.description}
								</p>
							}
						</div>
						{
							props.value.icon && <Icon.Material
								icon={props.value.icon}
								className="text-slate-900 dark:text-white"
							/>
						}
					</div>
				) : (
					props.value
				))
			}
		</RadixTooltip.Content>
	</RadixTooltip.Root>

}
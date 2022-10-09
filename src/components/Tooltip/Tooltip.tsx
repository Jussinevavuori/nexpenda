import { Icon } from '@/components/Icon/Icon';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { KeyCombination } from '../KeyCombination/KeyCombination';

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export type TooltipProps = RadixTooltip.TooltipProps & {
	value: string | {
		title: string;
		icon?: string;
		description?: string;
		keyCombination?: KeyCombination;
	} | React.ReactNode;
	side?: RadixTooltip.TooltipContentProps["side"];
	sideOffset?: RadixTooltip.TooltipContentProps["sideOffset"];
}

export function Tooltip({ children, value, side, sideOffset, ...tooltipProps }: TooltipProps) {
	return <RadixTooltip.Root {...tooltipProps}>
		<RadixTooltip.Trigger asChild>
			{children}
		</RadixTooltip.Trigger>
		<RadixTooltip.Portal>
			<RadixTooltip.Content side={side} sideOffset={(sideOffset ?? 0) * 4}>
				<motion.div
					className="rounded-lg bg-white-bg dark:bg-black-bg-4 border border-divider shadow-xl px-2 py-1 z-[1000]"
					initial={{ y: 5, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -5, opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					{
						typeof value === "string" ? (
							<p className="text-sm text-black dark:text-white">
								{value}
							</p>
						) : ((value && typeof value === "object" && "title" in value) ? (
							<div className="flex items-center justify-between">
								<div className="flex flex-col items-start">
									<div className="flex items-center justify-between">
										<p className="text-slate-900 dark:text-white text-sm">
											{value.title}
										</p>
										{
											value.keyCombination &&
											<span className="ml-auto pl-4 ">
												<KeyCombination keyCombination={value.keyCombination} />
											</span>
										}
									</div>
									{
										value.description &&
										<p className="max-w-[260px] text-slate-600 dark:text-slate-400 text-sm">
											{value.description}
										</p>
									}
								</div>
								{
									value.icon && <Icon.Material icon={value.icon} />
								}
							</div>
						) : (
							value
						))
					}
				</motion.div>
			</RadixTooltip.Content>
		</RadixTooltip.Portal>
	</RadixTooltip.Root >

}
import { Button } from '@/components/Button/Button';
import { Color } from '@/components/Color/Color';
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { NotificationVariant } from '@/stores/notificationStore';
import { c } from '@/utils/generic/classnames';
import { renderVariant } from '@/utils/generic/renderVariant';
import { selectVariant } from '@/utils/generic/selectVariant';
import { useCallback, useState } from 'react';

export type ToastVariant = NotificationVariant;

export interface ToastProps {
	title: string;
	description?: string;
	action?: {
		onClick(): void | Promise<void>;
		label?: string;
		icon?: string;
	}
	variant: ToastVariant;
	timeoutMs: number;
	createdAt: Date;
	id: string;
	onDismiss?(): void;
	fullWidth?: boolean;
}

export function Toast({ onDismiss, action, ...props }: ToastProps) {

	// Handle action loading
	const [isActionLoading, setIsActionLoading] = useState(false);
	const handleActionClick = useCallback(async () => {
		setIsActionLoading(true)
		await action?.onClick();
		setIsActionLoading(false)
		onDismiss?.();
	}, [onDismiss, setIsActionLoading, action])

	return <Color
		color={selectVariant<StaticPalette | undefined, ToastVariant>(props.variant)({
			default: undefined,
			error: "rose",
			info: "blue",
			success: "emerald",
			warning: "amber"
		})}
		onClick={onDismiss}
		className={c(
			"rounded py-2 px-4 shadow-lg bg-white dark:bg-slate-800 border border-primary-500",
			c.if(onDismiss)("hover:opacity-80 cursor-pointer"),
			c.if(props.fullWidth)("w-full")
		)}
	>

		<div className={c("relative flex items-center justify-between gap-2")}>

			<div className={c("flex flex-col items-stretch")}>

				<p className={c(
					"flex items-center gap-2",
					c.variant(props.variant)({
						default: "text-slate-900 dark:text-slate-100",
						success: "text-emerald-600 dark:text-emerald-500",
						error: "text-rose-600 dark:text-rose-500",
						info: "text-blue-600 dark:text-blue-500",
						warning: "text-amber-600 dark:text-amber-500",
					})
				)}>
					{
						// Icon
						renderVariant(props.variant)({
							default: () => null,
							info: () => <Icon.Material icon="info" className="text-blue-500" />,
							success: () => <Icon.Material icon="check" className="text-emerald-500" />,
							error: () => <Icon.Material icon="error" className="text-rose-500" />,
							warning: () => <Icon.Material icon="warning" className="text-amber-500" />
						})
					}
					{props.title}
				</p>


				{
					props.description && <p className="text-slate-700 dark:text-slate-300 text-sm pt-1">
						{props.description}
					</p>
				}

			</div>

			{
				// Default button
				action && action.label && <Button
					className="pl-3 pr-3 -mr-2"
					color="primary"
					onClick={handleActionClick}
					loading={isActionLoading}
					endIcon={
						action.icon
							? <Icon.Material icon={action.icon} className="text-primary-500" />
							: undefined
					}
				>
					{action.label}
				</Button>
			}

			{
				// Icon button
				action && action.icon && !action.label &&
				<IconButton
					className="-mr-2"
					onClick={handleActionClick}
					loading={isActionLoading}
				>
					<Icon.Material icon={action.icon} className="text-primary-500" />
				</IconButton>
			}

		</div>

	</Color>

}
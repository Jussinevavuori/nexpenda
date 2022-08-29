import { useBreakpoint } from '@/hooks/useBreakpoint';
import { c } from '@/utils/generic/classnames';

export interface DesktopViewProps {
	children?: React.ReactNode;
	className?: string;
}

export function DesktopView(props: DesktopViewProps) {
	if (useBreakpoint("desktop") === false) return null;

	return <div className={c("m:hidden", props.className)}>
		{props.children}
	</div>
}
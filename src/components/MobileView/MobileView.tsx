import { useBreakpoint } from '@/hooks/useBreakpoint';
import { c } from '@/utils/generic/classnames';

export interface MobileViewProps {
	children?: React.ReactNode;
	className?: string;
}

export function MobileView(props: MobileViewProps) {
	if (useBreakpoint("desktop") === true) return null;

	return <div className={c("d:hidden", props.className)}>
		{props.children}
	</div>
}
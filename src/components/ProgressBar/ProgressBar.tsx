import { useProgressBarValue } from './hooks/useProgressBarValue';

export interface ProgressBarProps {
	/**
	 * Between 0 and 1 or key which automatically fetches progress from a source
	 * based on the key.
	 */
	progress: { value: number; target: number } | string;
	color?: SelectableTheme;
}

export function ProgressBar(props: ProgressBarProps) {

	const progress = useProgressBarValue(props.progress);

	// TODO: implement color prop

	return <div className="relative h-1 w-full">
		<div className="absolute h-full w-full bg-primary-500 opacity-25" />
		<div className="absolute h-full bg-primary-500 transition-all" style={{ width: (progress.progress * 100) + "%" }} />
	</div>

}
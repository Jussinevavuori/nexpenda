import { Angle } from '@/utils/geometry/Angle';
import { svg } from '@/utils/svg/svg';
import { useProgressBarValue } from './hooks/useProgressBarValue';

export interface ProgressBarProps {
	/**
	 * Key which automatically fetches progress from a source
	 * based on the key (or manually provided value and target)
	 * or as a number between 0 and 100.
	 */
	progress: number | { value: number; target: number } | string;
	variant?: "linear" | "circle";
	size?: number;
	strokeWidth?: number;
}

export function ProgressBar(props: ProgressBarProps) {

	const progress = useProgressBarValue(props.progress);

	switch (props.variant ?? "linear") {

		case "circle": {

			const radius = 50;
			const strokeWidth = props.strokeWidth ?? 10;
			const offsetAngle = Angle.Zero();

			return <svg viewBox="0 0 100 100" style={{ width: props.size ?? 36, height: props.size ?? 36 }}>
				<path
					className="stroke-primary-500/25 fill-transparent"
					style={{ strokeWidth }}
					d={svg.partialCircle({ radius, strokeWidth, offsetAngle, sweepAngle: Angle.Full() })}
				/>
				<path
					className="stroke-primary-500 fill-transparent"
					style={{ strokeWidth }}
					d={svg.partialCircle({ radius, strokeWidth, offsetAngle, sweepAngle: new Angle(progress.progress, "units") })}
				/>
			</svg>
		}
		case "linear": {
			return <div className="relative w-full" style={{ height: props.size ?? 4 }}>
				<div className="absolute h-full w-full bg-primary-500 opacity-25" />
				<div className="absolute h-full bg-primary-500 transition-all" style={{ width: (progress.progress * 100) + "%" }} />
			</div>
		}
	}

}
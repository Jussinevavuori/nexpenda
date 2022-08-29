import { ButtonIntervalLengthSelector } from './components/ButtonIntervalLengthSelector';
import { ButtonIntervalSelector } from './components/ButtonIntervalSelector';
import { CarouselIntervalSelector } from './components/CarouselIntervalSelector';
import { renderVariant } from '@/utils/generic/renderVariant';

export interface IntervalSelectorProps {
	variant?: "carousel" | "button";
	intervalLenghtOnly?: boolean; // Only works for button variant
}

export function IntervalSelector(props: IntervalSelectorProps) {
	return <>
		{
			renderVariant(props.variant ?? "button")({
				button: () => props.intervalLenghtOnly
					? <ButtonIntervalLengthSelector {...props} />
					: <ButtonIntervalSelector  {...props} />,
				carousel: () => <CarouselIntervalSelector {...props} />
			})
		}
	</>
}
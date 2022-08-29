import { Button } from '@components/Button/Button';
import { useIntervalContext } from '@contexts/IntervalContext/IntervalContext';
import { renderVariant } from '@lib/client/utils/renderVariant';

export interface ButtonIntervalLenghtSelector {

}

export function ButtonIntervalLengthSelector(props: ButtonIntervalLenghtSelector) {
	const interval = useIntervalContext();

	return <Button
		variant="outlined"
		color="slate"
		endIcon="unfold_more"
		className="pr-1 pl-3"
		onClick={() => interval.cycleIntervalType()}
	>
		{
			renderVariant(interval.type)({
				all: () => "All",
				year: () => "Year",
				month: () => "Month",
				other: () => "Other",
			})
		}
	</Button>

}
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { capitalize } from "@/utils/generic/capitalize";
import { useIntervalStore } from "../store/useIntervalStore";

export interface ButtonIntervalLenghtSelector {

}

export function ButtonIntervalLengthSelector(props: ButtonIntervalLenghtSelector) {

	const intervalLength = useIntervalStore(_ => _.intervalLength);
	const changeIntervalTo = useIntervalStore(_ => _.changeTo)

	const cycleIntervalLength = () => {
		switch (intervalLength) {
			case "month": {
				changeIntervalTo("year");
				break;
			}
			case "year": {
				changeIntervalTo("all");
				break;
			}
			case "all": {
				changeIntervalTo("month");
				break;
			}
		}
	}

	return <Button
		variant="bordered"
		color="monochrome"
		endIcon={<Icon.Material icon="unfold_more" />}
		className="w-28 pr-1 pl-3  justify-between"
		onClick={cycleIntervalLength}
	>
		{capitalize(intervalLength)}
	</Button>

}
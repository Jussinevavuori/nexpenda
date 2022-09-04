import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { usePeriodStore } from "@/stores/periodStore";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { capitalize } from "@/utils/generic/capitalize";

export function ButtonIntervalLengthSelector() {

	const period = usePeriodStore(_ => _.period);
	const changeLength = usePeriodStore(_ => _.changeLength)

	const periodLength = getPeriodLength(period);

	const cycleIntervalLength = () => {
		switch (periodLength) {
			case "month": {
				changeLength("year");
				break;
			}
			case "year": {
				changeLength("all");
				break;
			}
			case "all": {
				changeLength("month");
				break;
			}
		}
	}

	return <Button
		variant="flat"
		color="monochrome"
		endIcon={<Icon.Material icon="unfold_more" />}
		className="w-28 pr-1 pl-3  justify-between"
		onClick={cycleIntervalLength}
	>
		{capitalize(periodLength)}
	</Button>

}
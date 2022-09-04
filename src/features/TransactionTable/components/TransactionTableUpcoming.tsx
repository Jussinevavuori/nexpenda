
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useOpenState } from "@/hooks/useOpenState";
import { usePeriodStore } from "@/stores/periodStore";
import { periodIncludesToday } from "@/utils/dates/periodIncludesToday";
import { isFuture } from "date-fns";
import { useMemo } from "react";
const { motion } = require("framer-motion")

export type TransactionTableUpcomingProps = {
	transactions?: TransactionItem[];
}

export function TransactionTableUpcoming(props: TransactionTableUpcomingProps) {
	// Upcoming toggle: open state for upcoming items and enable upcoming items
	// when there are some and the user is in the current interval. Only for
	// mobile
	const period = usePeriodStore(_ => _.period);
	const upcomingSection = useOpenState();
	const upcomingCount = useMemo(() => (props.transactions ?? []).filter(_ => isFuture(_.time)).length, [props.transactions])
	const enableUpcomingToggle = useMemo(() => periodIncludesToday(period) && upcomingCount > 0, [period, upcomingCount]);

	if (!enableUpcomingToggle) return null;

	return <div onClick={() => upcomingSection.toggle()} className="cursor-pointer px-6 flex items-center justify-between">
		<p className="text-slate-500 font-semibold">
			{upcomingSection.isOpen ? "Hide" : "Show"} {upcomingCount} upcoming
		</p>
		<IconButton className="-mr-4">
			<motion.div animate={{ rotate: upcomingSection.isOpen ? "0deg" : "180deg" }}>
				<Icon.Material icon="expand_less" className="text-primary-500" />
			</motion.div>
		</IconButton>
	</div>
}
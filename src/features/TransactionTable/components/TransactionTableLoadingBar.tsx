import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { useDebounce } from "@/hooks/useDebounce";

export type TransactionTableLoadingBarProps = {
	isFetching?: boolean;
}

export function TransactionTableLoadingBar(props: TransactionTableLoadingBarProps) {
	const isFetchingDebounced = useDebounce(props.isFetching, 100);

	if (!props.isFetching || !isFetchingDebounced) return null

	return <div className="absolute inset-0 bg-white/20 dark:bg-black/20 flex flex-col items-stretch justify-start">
		<LoadingSpinner variant="bar" height={2} />
	</div>
}
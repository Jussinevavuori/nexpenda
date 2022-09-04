import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { Input } from "@/components/Input/Input";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useDebounce } from "@/hooks/useDebounce";
import { transactionSearchAtom } from "@/stores/transactionSearchAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export type TransactionSearchProps = {

}

export const TransactionSearch = Object.assign(function TransactionSearch(props: TransactionSearchProps) {
	const isMobile = useBreakpoint("!desktop")

	const [query, setQuery] = useAtom(transactionSearchAtom)

	// Use inner state with debounce and update global search atom state
	// only with debounced state.
	const [input, setInput] = useState(query);
	const debouncedInput = useDebounce(input, 200);
	useEffect(() => setQuery(debouncedInput), [setQuery, debouncedInput])

	return <Input
		value={input}
		onChange={e => setInput(e.target.value)}
		fullWidth
		endIcon={
			query
				? <IconButton
					inputAdornment="end"
					color="primary"
					onClick={() => setQuery("")}
					variant="text"
					startLabel={isMobile ? undefined : "Clear"}
				>
					<Icon.Material icon="clear" />
				</IconButton>
				: <Icon.Material icon="search" />
		}
		placeholder="Search transactions..."
	/>

}, {

});
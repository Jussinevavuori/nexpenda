import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { Input } from "@/components/Input/Input";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useDebounce } from "@/hooks/useDebounce";
import { MINIMUM_ACTIVE_QUERY_LENGTH, transactionSearchAtom } from "@/stores/transactionSearchAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";


export const TransactionSearch = Object.assign(function TransactionSearch() {
	const isMobile = useBreakpoint("!desktop")

	const [query, setQuery] = useAtom(transactionSearchAtom)

	// Use inner state with debounce and update global search atom state
	// only with debounced state.
	const [input, setInput] = useState(query);
	const debouncedInput = useDebounce(input, 100);
	useEffect(() => setQuery(debouncedInput), [setQuery, debouncedInput])

	// Debounce query to show error messages
	const debouncedQuery = useDebounce(query, 500);
	const showTooShortError = query.length > 0
		&& debouncedQuery.length > 0
		&& query.length < MINIMUM_ACTIVE_QUERY_LENGTH
		&& debouncedQuery.length < MINIMUM_ACTIVE_QUERY_LENGTH

	return <Input
		value={input}
		onChange={e => setInput(e.target.value)}
		fullWidth
		endLabel={showTooShortError ? "Query is too short" : undefined}
		endIcon={
			query
				? <IconButton
					inputAdornment="end"
					color="primary"
					onClick={
						() => {
							setInput("")
							setQuery("")
						}
					}
					variant="text"
					startLabel={isMobile ? undefined : "Clear"}
				>
					< Icon.Material icon="clear" />
				</IconButton >
				: <Icon.Material icon="search" />
		}
		placeholder="Search transactions..."
		type="search"
	/>

}, {

});
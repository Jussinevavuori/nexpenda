import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Calculation, CalculatorFunction } from '../utils/Calculation';

export interface CalculatorContextValue {
	calculation: Calculation;
	setCalculation(s: Setter<Calculation>): void;
	handleInput(fn: CalculatorFunction): void;
	inputValue: string;
	outputValue: number;
}

export const CalculatorContextValue: CalculatorContextValue = {
	calculation: new Calculation(""),
	setCalculation() { },
	handleInput() { },
	inputValue: "",
	outputValue: NaN,
}

export const CalculatorContext = createContext<CalculatorContextValue>(CalculatorContextValue)

export interface CalculatorContextProviderProps {
	children?: ReactNode
	initialValue?: number;
	onSubmit?(value: number): void;
}

export function CalculatorContextProvider({ onSubmit, initialValue, children }: CalculatorContextProviderProps) {

	const [calculation, setCalculation] = useState(() =>
		initialValue && Number.isFinite(initialValue)
			? new Calculation(initialValue.toString())
			: new Calculation("")
	);

	// Update when initial value updated
	useEffect(() => {
		setCalculation(
			initialValue && Number.isFinite(initialValue)
				? new Calculation(initialValue.toString())
				: new Calculation("")
		)
	}, [initialValue, setCalculation])


	// Calculator input and output
	const inputValue = useMemo(() => calculation.formatInput(), [calculation]);
	const outputValue = useMemo(() => calculation.value, [calculation]);

	// Handling input and submitting on equal sign
	const handleInput = useCallback(
		(input: CalculatorFunction) => {
			if (input === "eql" && onSubmit) {
				onSubmit(calculation.value);
			} else {
				setCalculation((c) => c.input(input));
			}
		},
		[setCalculation, onSubmit, calculation]
	);

	return <CalculatorContext.Provider value={
		useMemo(() => ({
			calculation, setCalculation, inputValue, outputValue, handleInput
		}), [calculation, setCalculation, inputValue, outputValue, handleInput])
	}>
		{children}
	</CalculatorContext.Provider>

}

export function useCalculatorContext() {
	return useContext(CalculatorContext)
}
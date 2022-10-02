import { useIsFocusWithin } from "@/hooks/useIsFocusWithin";
import { useOnKeyCombination } from "@/hooks/useOnKeyCombination";
import { clamp } from "@/utils/generic/clamp";
import { c } from "@/utils/generic/classnames";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { ExtensionInputBaseProps, InputBase } from "../InputBase/InputBase";

export type IntegerInputProps =
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">
	& ExtensionInputBaseProps
	& {
		value: number;
		max?: number;
		min?: number;
		onChange?(n: number): void;
	}

export function IntegerInput(props: IntegerInputProps) {
	const { value: propsValue, max: propsMax, min: propsMin, onChange: propsOnChange, ...htmlProps } = InputBase.removeExtensionInputBaseProps(props)

	// Parse values and provide default values
	const min = propsMin ?? Number.MIN_SAFE_INTEGER
	const max = propsMax ?? Number.MAX_SAFE_INTEGER
	const value = parseValue(propsValue, min, max);

	// Disable increment and decrement
	const disableDecrement = props.disabled || (props.value <= min)
	const disableIncrement = props.disabled || (props.value >= max)

	const { ref: focusWithinRef, isFocusWithin } = useIsFocusWithin();

	// Increment on key up, decrement on key down when input is focused
	useOnKeyCombination(
		{ key: "ArrowUp" },
		() => handleChange(props.value + 1),
		{ enableOnInputFocused: true, disable: disableIncrement || !isFocusWithin }
	)
	useOnKeyCombination(
		{ key: "ArrowDown" },
		() => handleChange(props.value - 1),
		{ enableOnInputFocused: true, disable: disableDecrement || !isFocusWithin }
	)

	// Clear NaN
	useEffect(() => {
		if (Number.isNaN(propsValue)) propsOnChange?.(0);
	}, [propsValue, propsOnChange])

	// Handle change
	const handleChange = (ev: number | React.ChangeEvent<HTMLInputElement>) => {
		// Find value:
		let value = 0;

		// (1) If number, use as is
		if (typeof ev === "number") {
			value = cleanValue(ev, min, max);
		}

		// (2) Else clean input of all else but digits and check if contains minus symbol
		//   (2.1) If no digits, only minus symbol, interpret as -0
		//   (2.2) Parse int - if NaN interpret as +0, else as is
		else {
			const isNegative = ev.target.value.includes("-");
			const _v = ev.target.value.replace(/\D/g, "");
			if ((!_v || _v === "0") && isNegative) {
				value = cleanValue(-0, min, max);
			} else {
				const p = parseInt(_v);
				if (isNaN(p)) value = cleanValue(0, min, max);
				else value = cleanValue(p * (isNegative ? -1 : 1), min, max);
			}
		}

		// Fire onChange with parsed
		props.onChange?.(value);
	}

	return <InputBase {...props} ref={focusWithinRef}>

		<Button
			variant="text"
			type="button"
			className="px-2"
			disabled={disableDecrement}
			onClick={() => handleChange(props.value - 1)}
		>
			<Icon.Material icon="remove" />
		</Button>

		<span className="w-px h-6 bg-divider-strong" />

		<input
			className={c("bg-transparent py-2 text-black dark:text-white outline-none",
				"placeholder:text-black-4 dark:placeholder:text-white-4 w-full text-center",
			)}
			value={value}
			onChange={handleChange}
			{...htmlProps}
		/>

		<span className="w-px h-6 bg-divider-strong" />

		<Button
			variant="text"
			type="button"
			className="px-2"
			disabled={disableIncrement}
			onClick={() => handleChange(props.value + 1)}
		>
			<Icon.Material icon="add" />
		</Button>

	</InputBase>
}

// Force a number to be an integer between limits
function cleanValue(n: number, min: number, max: number) {
	return clamp(Math.round(n), min, max)
}

// Parse a numeric value (handle NaN, -0 and edge cases) to a string value for input
function parseValue(n: number, min: number, max: number) {
	if (Object.is(n, -0)) return min >= 0 ? cleanValue(0, min, max) : "-"
	if (Number.isNaN(n)) return cleanValue(0, min, max).toString();
	return cleanValue(n, min, max).toString();
}
import * as RadixSlider from "@radix-ui/react-slider"
import { forwardRef, useCallback, useMemo } from "react"

export type SliderBaseProps = {
	id?: string;
	name?: string;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
	dir?: "ltr" | "rtl";
	min?: number;
	max?: number;
	step?: number;
	minStepsBetweenThumbs?: number;
}

export type SliderProps = SliderBaseProps & {
	type: "default";
	defaultValue?: number;
	value?: number;
	onValueChange?(value: number): void;
}


export type RangeSliderProps = SliderBaseProps & {
	type: "range";
	defaultValue?: [number, number];
	value?: [number, number];
	onValueChange?(value: [number, number]): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Slider = forwardRef<any, SliderProps | RangeSliderProps>(function Slider(props, forwardedRef) {

	// Adjust all value concerned props to function correctly with the single
	// number (non-tuple) API for the basic slider.
	const _onValueChange = useCallback((value: number[]) => {
		switch (props.type) {
			case "default":
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return props.onValueChange?.(value[0]!)
			case "range":
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return props.onValueChange?.([value[0]!, value[1]!])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.type, props.onValueChange])

	const _value = useMemo(() => {
		if (typeof props.value === "undefined") return undefined;
		switch (props.type) {
			case "default":
				return [props.value]
			case "range":
				return props.value
		}
	}, [props.value, props.type])

	const _defaultValue = useMemo(() => {
		if (typeof props.defaultValue === "undefined") return undefined;

		switch (props.type) {
			case "default":
				return [props.defaultValue]
			case "range":
				return props.defaultValue
		}
	}, [props.defaultValue, props.type])

	return <RadixSlider.Root
		ref={forwardedRef}
		{...props}
		value={_value}
		defaultValue={_defaultValue}
		onValueChange={_onValueChange}
		className="group relative flex items-center select-none touch-none w-full d-vertical:flex-col d-vertical:h-full d-vertical:w-4 d-horizontal:h-6 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
	>
		<RadixSlider.Track
			className="bg-active-overlay relative flex-1 rounded-full d-horizontal:h-1 d-vertical:w-1"
		>
			<RadixSlider.Range
				className="absolute bg-primary rounded-full h-full"
			/>
		</RadixSlider.Track>
		<RadixSlider.Thumb
			className="block w-5 h-5 bg-primary rounded-full shadow-md hover:scale-125 focus:shadow-lg"
		/>
	</RadixSlider.Root>
})
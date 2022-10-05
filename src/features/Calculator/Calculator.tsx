import { useOnKey } from '@/hooks/useOnKey';
import { c } from '@/utils/generic/classnames';
import { cssGridTemplate } from '@/utils/styles/cssGridTemplate';
import { CalculatorButton } from './components/CalculatorButton';
import { CalculatorContextProvider, CalculatorContextProviderProps, useCalculatorContext } from './contexts/CalculatorContext';

export type CalculatorProps = CalculatorContextProviderProps;

function _Calculator() {

	const { inputValue, outputValue, handleInput } = useCalculatorContext();

	// All shortcuts
	useOnKey("1", () => handleInput("no1"))
	useOnKey("2", () => handleInput("no2"))
	useOnKey("3", () => handleInput("no3"))
	useOnKey("4", () => handleInput("no4"))
	useOnKey("5", () => handleInput("no5"))
	useOnKey("6", () => handleInput("no6"))
	useOnKey("7", () => handleInput("no7"))
	useOnKey("8", () => handleInput("no8"))
	useOnKey("9", () => handleInput("no9"))
	useOnKey("0", () => handleInput("no0"))
	useOnKey(".", () => handleInput("dot"));
	useOnKey(",", () => handleInput("dot"));
	useOnKey("+", () => handleInput("add"))
	useOnKey("-", () => handleInput("sub"))
	useOnKey("/", () => handleInput("div"));
	useOnKey("*", () => handleInput("mul"));
	useOnKey("c", () => handleInput("clr"));
	useOnKey("p", () => handleInput("par"));
	useOnKey("(", () => handleInput("pro"));
	useOnKey(")", () => handleInput("prc"));
	useOnKey("=", () => handleInput("eql"));
	useOnKey("Enter", () => handleInput("eql"));
	useOnKey("Backspace", () => handleInput("bck"));

	return <div className="p-4 flex flex-col gap-4">
		<div className="p-4 bg-slate-100 dark:bg-slate-700 rounded dark:text-white">
			<p className={c("text-left", c.if(!inputValue)("opacity-0"))}>
				{inputValue || "_"}
			</p>
			<p className="text-right">
				{Number.isNaN(outputValue) ? "Error" : outputValue}
			</p>
		</div>

		<div
			className="grid gap-1"
			style={{
				gridTemplate: cssGridTemplate([
					["clr", "clr", "bck", "div"],
					["no7", "no8", "no9", "mul"],
					["no4", "no5", "no6", "sub"],
					["no1", "no2", "no3", "add"],
					["dot", "no0", "par", "eql"],
				])
			}}
		>
			<CalculatorButton value="clr" variant="function">AC</CalculatorButton>
			<CalculatorButton value="bck" variant="function">icon_backspace_outlined</CalculatorButton>

			<CalculatorButton value="div" variant="function">÷</CalculatorButton>
			<CalculatorButton value="mul" variant="function">×</CalculatorButton>
			<CalculatorButton value="sub" variant="function">-</CalculatorButton>
			<CalculatorButton value="add" variant="function">+</CalculatorButton>

			<CalculatorButton value="no1" variant="number">1</CalculatorButton>
			<CalculatorButton value="no2" variant="number">2</CalculatorButton>
			<CalculatorButton value="no3" variant="number">3</CalculatorButton>
			<CalculatorButton value="no4" variant="number">4</CalculatorButton>
			<CalculatorButton value="no5" variant="number">5</CalculatorButton>
			<CalculatorButton value="no6" variant="number">6</CalculatorButton>
			<CalculatorButton value="no7" variant="number">7</CalculatorButton>
			<CalculatorButton value="no8" variant="number">8</CalculatorButton>
			<CalculatorButton value="no9" variant="number">9</CalculatorButton>
			<CalculatorButton value="no0" variant="number">0</CalculatorButton>
			<CalculatorButton value="dot" variant="number">.</CalculatorButton>
			<CalculatorButton value="par" variant="number">()</CalculatorButton>

			<CalculatorButton value="eql" variant="submit">=</CalculatorButton>

		</div>
	</div>
}

export function Calculator(props: CalculatorProps) {
	return <CalculatorContextProvider
		initialValue={props.initialValue}
		onSubmit={props.onSubmit}
	>
		<_Calculator />
	</CalculatorContextProvider>
}
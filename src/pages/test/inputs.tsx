import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input";
import { themeMemory } from "@/utils/themes/themeMemory";
import { useState } from "react";

export default function TestInputsPage() {

	const [disabled, setDisabled] = useState(false);
	const [readOnly, setReadOnly] = useState(false);
	const [error, setError] = useState(false);
	const [icons, setIcons] = useState(false);
	const [labels, setLabels] = useState(false);
	const [helperText, setHelperText] = useState(false);
	const theme = themeMemory.useValue();
	const [input, setInput] = useState("")

	return (
		<div className="p-8 bg-white dark:bg-slate-800">
			<div className="flex gap-4">
				<Button color={helperText ? "primary" : "monochrome"} onClick={() => setHelperText(_ => !_)}>Helper text</Button>
				<Button color={error ? "primary" : "monochrome"} onClick={() => setError(_ => !_)}>Error</Button>
				<Button color={disabled ? "primary" : "monochrome"} onClick={() => setDisabled(_ => !_)}>Disabled</Button>
				<Button color={readOnly ? "primary" : "monochrome"} onClick={() => setReadOnly(_ => !_)}>Read-only</Button>
				<Button color={icons ? "primary" : "monochrome"} onClick={() => setIcons(_ => !_)}>Icons</Button>
				<Button color={labels ? "primary" : "monochrome"} onClick={() => setLabels(_ => !_)}>Labels</Button>
				<Button color={theme === "dark" ? "primary" : "monochrome"} onClick={() => themeMemory.set(theme === "dark" ? "light" : "dark")}>Dark Mode</Button>
			</div>
			<div className="p-4" />
			<table className="">
				<tbody>
					<tr>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="primary" variant="default" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="primary" variant="bordered" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="primary" variant="underlined" /></td>
					</tr>

					<tr>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="success" variant="default" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="success" variant="bordered" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="success" variant="underlined" /></td>
					</tr>

					<tr>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="monochrome" variant="default" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="monochrome" variant="bordered" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="monochrome" variant="underlined" /></td>
					</tr>

					<tr>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="warning" variant="default" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="warning" variant="bordered" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="warning" variant="underlined" /></td>
					</tr>

					<tr>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="danger" variant="default" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="danger" variant="bordered" /></td>
						<td className="pr-4 py-6"><Input helperText={helperText ? "You should to this" : undefined} error={error} readOnly={readOnly} disabled={disabled} startLabel={labels ? "https://" : undefined} endLabel={labels ? ".com" : undefined} endIcon={icons ? <Icon.Material icon="check" /> : undefined} startIcon={icons ? <Icon.Material icon="check" /> : undefined} placeholder="Test value" value={input} onChange={e => setInput(e.target.value)} color="danger" variant="underlined" /></td>
					</tr>

				</tbody>
			</table>
		</div>
	);
};
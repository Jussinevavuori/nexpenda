import { subDays } from "date-fns"
import { useState } from "react"
import { UploadDataFilePreview } from "./UploadDataFilePreview"

export interface UploadDataFileExampleProps {
}

export function UploadDataFileExample(props: UploadDataFileExampleProps) {

	const sheets = ["Example sheet", "Empty sheet"]
	const [selectedSheet, setSelectedSheet] = useState(sheets[0]!);

	return <div>
		<UploadDataFilePreview
			spreadsheetTitle="Example.xlsx"
			rows={selectedSheet === "Example sheet" ? [
				{
					time: subDays(new Date(), 7),
					integerAmount: -2395,
					category: "Food",
					comment: "Groceries",
				},
				{
					time: subDays(new Date(), 6),
					integerAmount: -499,
					category: "Transport",
					comment: "Public transport bus",
				},
				{
					time: subDays(new Date(), 5),
					integerAmount: -4838,
					category: "Food",
					comment: "Groceries",
				},
				{
					time: subDays(new Date(), 3),
					integerAmount: 350259,
					category: "Salary",
					comment: "Work",
				},
				{
					time: subDays(new Date(), 1),
					integerAmount: -2000,
					category: "Utilities",
					comment: "Electric bill",
				},
				{
					time: subDays(new Date(), 1),
					integerAmount: -5948,
					category: "Restaurants",
					comment: "Fancy restaurant"
				},
				{
					time: new Date(),
					integerAmount: -4900,
					category: "Food",
					comment: "Groceries",
				},
			] : []}
			selectedSheet={selectedSheet}
			sheets={sheets}
			onSheetSelect={setSelectedSheet}
			pagesize={5}
		/>
	</div>
}
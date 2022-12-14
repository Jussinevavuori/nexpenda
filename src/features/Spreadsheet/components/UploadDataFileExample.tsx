import { subDays } from "date-fns"
import { useState } from "react"
import { UploadDataFilePreview } from "./UploadDataFilePreview"


export function UploadDataFileExample() {

	const sheets = ["Example sheet", "Empty sheet"]
	// eslint-disable-next-line
	const [selectedSheet, setSelectedSheet] = useState(sheets[0]!);

	return <div>
		<UploadDataFilePreview
			spreadsheetTitle="Example.xlsx"
			rows={selectedSheet === "Example sheet" ? [
				{
					time: subDays(new Date(), 7),
					amount: -2395,
					category: "Food",
					comment: "Groceries",
				},
				{
					time: subDays(new Date(), 6),
					amount: -499,
					category: "Transport",
					comment: "Public transport bus",
				},
				{
					time: subDays(new Date(), 5),
					amount: -4838,
					category: "Food",
					comment: "Groceries",
				},
				{
					time: subDays(new Date(), 3),
					amount: 350259,
					category: "Salary",
					comment: "Work",
				},
				{
					time: subDays(new Date(), 1),
					amount: -2000,
					category: "Utilities",
					comment: "Electric bill",
				},
				{
					time: subDays(new Date(), 1),
					amount: -5948,
					category: "Restaurants",
					comment: "Fancy restaurant"
				},
				{
					time: new Date(),
					amount: -4900,
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
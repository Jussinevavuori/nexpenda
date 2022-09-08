import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { UITester } from "@/features/UITester/UITester";

export default function ButtonsUITest() {
	return <UITester
		rows={["primary", "success", "warning", "danger", "monochrome"]}
		columns={["default", "bordered", "flat", "ghost", "text"]}
		toggles={["disabled", "loading", "startIcon", "endIcon"]}
		renderInstance={({ toggles, col: variant, row: color }) => {
			return <Button
				variant={variant}
				color={color}
				disabled={!!toggles.disabled}
				loading={!!toggles.loading}
				startIcon={!!toggles.startIcon && <Icon.Material icon="send" />}
				endIcon={!!toggles.endIcon && <Icon.Material icon="send" />}
			>
				Click me
			</Button>
		}}
	/>
}
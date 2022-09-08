import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { UITester } from "@/features/UITester/UITester";

export default function ButtonsUITest() {
	return <UITester
		rows={["primary", "danger", "monochrome", "warning", "success"]}
		columns={["default", "bordered", "flat", "text"]}
		toggles={["disabled", "loading", "startIcon", "endIcon"]}
		renderInstance={({ toggles, col: variant, row: color }) => {
			return <Button
				variant={variant}
				color={color}
				disabled={!!toggles.disabled}
				loading={!!toggles.loading}
				startIcon={!!toggles.startIcon && <Icon.Material size={20} icon="send" />}
				endIcon={!!toggles.endIcon && <Icon.Material size={20} icon="send" />}
			>
				Click me
			</Button>
		}}
	/>
}
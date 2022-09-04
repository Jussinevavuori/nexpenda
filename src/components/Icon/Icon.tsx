import { FeatherIcon } from "./components/FeatherIcon";
import { MaterialIcon } from "./components/MaterialIcon";
import { SimpleIcon } from "./components/SimpleIcon";

export const Icon = Object.assign(MaterialIcon, {
	Feather: FeatherIcon,
	Material: MaterialIcon,
	Simple: SimpleIcon,
})
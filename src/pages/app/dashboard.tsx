import { Button } from "@/components/Button/Button";
import { useNotify } from "@/features/Notifications/hooks/useNotify";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function DashboardPage() {
	const notify = useNotify();

	return <AppLayout active="dashboard">
		DashboardPage
		<Button onClick={() => { notify.default("Default") }}>Notify default</Button>
		<Button color="success" onClick={() => { notify.success("success") }}>Notify success</Button>
		<Button color="warning" onClick={() => { notify.warning("warning") }}>Notify warning</Button>
		<Button color="danger" onClick={() => { notify.error("danger") }}>Notify danger</Button>
		<Button color="monochrome" onClick={() => { notify.info("info") }}>Notify info</Button>
	</AppLayout>
}
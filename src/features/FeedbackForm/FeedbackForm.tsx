import { Button } from "@/components/Button/Button";
import { TextArea } from "@/components/TextArea/TextArea";
import { useNotify } from "@/stores/notificationStore";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export function FeedbackForm() {
	const notify = useNotify();
	const [message, setMessage] = useState("");
	const mutation = trpc.useMutation(["feedback.send"], {
		onSuccess: () => {
			setMessage("")
			notify.success("Succesfully sent message")
		}
	})

	return <section className="flex flex-col">
		<p>
			Contact us
		</p>

		<div className="p-2" />

		<p className="text-sm text-black-secondary dark:text-white-secondary max-w-md">
			Please contact us and leave feedback about the application, any
			bugs or features you would like to see.
		</p>

		<div className="p-4" />

		<TextArea
			value={message}
			onChange={e => setMessage(e.target.value)}
			fullWidth
			disabled={mutation.isLoading}
			rows={5}
		/>

		<div className="p-4" />

		<Button
			onClick={() => { if (message.trim()) mutation.mutate({ message }) }}
			loading={mutation.isLoading}
		>
			Send
		</Button>
	</section>

}
// src/pages/_app.tsx
export { reportWebVitals } from "next-axiom";
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useVhFix } from "../hooks/useVhFix";
import { Provider as RadixTooltipProvider } from '@radix-ui/react-tooltip';
import { useInitialize } from "@/hooks/useInitialize";
import { Notifications } from "@/features/Notifications/Notifications";
import { Meta } from "@/features/Meta/Meta";
import { GlobalModalManager } from "@/features/GlobalModalManager/GlobalModalManager";
import { httpLink } from '@trpc/client/links/httpLink';

const App: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {

	useVhFix();
	useInitialize();

	return (
		<SessionProvider session={session}>
			<RadixTooltipProvider>
				<Notifications>
					<Meta.App />
					<GlobalModalManager />
					<Component {...pageProps} />
				</Notifications>
			</RadixTooltipProvider>
		</SessionProvider>
	);
};

// Configure TRPC router to wrap App

const getBaseUrl = () => {
	// Browser should use relative URL
	if (typeof window !== "undefined") return "";

	// SSR should use Vercel URL
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

	// Dev SSR should use localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`;
		return {
			url,
			transformer: superjson,
			links: [
				httpLink({
					url: '/api/trpc',
				}),
			],
		};
	},
	ssr: false,
})(App);

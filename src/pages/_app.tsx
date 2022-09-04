// src/pages/_app.tsx
export { reportWebVitals } from "next-axiom";
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useVhFix } from "../hooks/useVhFix";
import { Provider as RadixTooltipProvider } from '@radix-ui/react-tooltip';
import { ThemeProvider } from "@/features/Theme/Theme";
import { DefaultStyles } from "@/components/DefaultStyles/DefaultStyles";
import { useInitialize } from "@/hooks/useInitialize";
import { Notifications } from "@/features/Notifications/Notifications";
import { Meta } from "@/features/Meta/Meta";

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {

	useVhFix();
	useInitialize();

	return (
		<SessionProvider session={session}>
			<ThemeProvider>
				<RadixTooltipProvider>
					<Notifications>
						<Meta.App />
						<DefaultStyles>
							<Component {...pageProps} />
						</DefaultStyles>
					</Notifications>
				</RadixTooltipProvider>
			</ThemeProvider>
		</SessionProvider>
	);
};

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
		};
	},
	ssr: false,
})(MyApp);

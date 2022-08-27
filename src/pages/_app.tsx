// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useVhFix } from "../hooks/useVhFix";
import { ThemedFavicon } from "@/components/ThemedFavicon/ThemedFavicon";
import { useInitializePreferences } from "@/hooks/useInitializePreferences";

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {

	useVhFix();
	useInitializePreferences();

	return (
		<SessionProvider session={session}>
			<ThemedFavicon dark="/favicon-dark-theme.ico" light="/favicon-light-theme.ico" />
			<Component {...pageProps} />
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

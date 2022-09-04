import { env } from "./src/env/server.mjs";
import { withAxiom } from "next-axiom"

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return withAxiom(config);
}

export default defineNextConfig({
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		newNextLinkBehavior: true,
		images: { allowFutureImage: true }
	},
	async rewrites() {
		return [
			{
				source: "/login",
				destination: "/auth/login",
			},
			{
				source: "/app",
				destination: "/app/dashboard",
			}
		]
	}
});

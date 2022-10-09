import { withAxiom } from "next-axiom"
import withPWA from "next-pwa"

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	const layers = [
		withPWA({ dest: "public" }),
		withAxiom
	]

	return layers.reduce((_conf, layer) => layer(_conf), config);
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

import Head from "next/head";

export type PageHeadProps = {
	title?: string;
}

export function PageHead(props: PageHeadProps) {
	return <Head>
		<title>
			{
				["Nexpenda", props.title].filter(Boolean).join(" | ")
			}
		</title>
	</Head>
}
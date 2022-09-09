import { Meta } from '@/features/Meta/Meta'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return Document.getInitialProps(ctx)
	}

	render() {
		return (
			<Html className="text-black dark:text-white">
				<Head>
					<Meta.Document />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
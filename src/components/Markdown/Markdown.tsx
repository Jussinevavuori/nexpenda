import { c } from '@/utils/generic/classnames';
import { readMarkdownFile } from '@/utils/md/readMarkdownFiles';
import md from 'markdown-it';

export type MarkdownProps = {
	className?: string;
	markdown: Unwrap<ReturnType<typeof readMarkdownFile>>;
}

export function Markdown(props: MarkdownProps) {
	return <article
		className={c(props.className, "prose prose-slate mx-auto lg:prose-lg dark:prose-invert")}
		dangerouslySetInnerHTML={{ __html: md().render(props.markdown.content) }}
	/>
}
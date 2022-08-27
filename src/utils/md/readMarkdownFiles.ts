import { promises as fs } from 'fs';
import graymatter from 'gray-matter';
import path from 'path';

export async function readMarkdownFile(name: string) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "content",
    "md",
    `${name}.md`
  );

  const file = await fs.readFile(filePath, "utf8");

  const { data: meta, content, excerpt } = graymatter(file);

  return { meta, content, excerpt };
}

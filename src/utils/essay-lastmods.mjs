import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = new URL('../content/blog/', import.meta.url).pathname;

/** @returns {Map<string, string>} slug → ISO 8601 lastmod */
export function getEssayLastModBySlug() {
	const map = new Map();

	for (const name of readdirSync(BLOG_DIR)) {
		if (!/\.(md|mdx)$/.test(name)) continue;

		const slug = name.replace(/\.(md|mdx)$/, '');
		const raw = readFileSync(join(BLOG_DIR, name), 'utf8');
		const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!fm) continue;

		const block = fm[1];
		const pubDate = block.match(/^pubDate:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1];
		const updatedDate = block.match(/^updatedDate:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1];
		const label = updatedDate ?? pubDate;
		if (!label) continue;

		const parsed = new Date(label);
		if (Number.isNaN(parsed.getTime())) continue;

		map.set(slug, parsed.toISOString());
	}

	return map;
}

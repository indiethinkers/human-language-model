import { visit } from 'unist-util-visit';

/**
 * Converts isolated raw HTML h2/h3 blocks in Markdown into mdast headings so
 * Astro's heading-id pass and TOC metadata include guest-essay HTML headings.
 */
export function remarkHtmlHeadings() {
	return (tree) => {
		visit(tree, 'html', (node, index, parent) => {
			if (!parent || index === undefined || index === null) return;

			const value = node.value.trim();
			for (const depth of [2, 3]) {
				const match = value.match(
					new RegExp(`^<h${depth}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/h${depth}>$`, 'i'),
				);
				if (!match) continue;

				const text = match[1].replace(/<[^>]+>/g, '').trim();
				if (!text) return;

				parent.children[index] = {
					type: 'heading',
					depth,
					children: [{ type: 'text', value: text }],
				};
				return;
			}
		});
	};
}

const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
const inlineTags = new Set(['a', 'em', 'strong', 'span', 'del', 's', 'q', 'cite', 'small', 'mark']);
const excludedTags = new Set(['pre', 'code', 'script', 'style', 'figure', 'aside']);
const excludedClasses = new Set(['image-caption', 'signoff', 'author-links', 'twitter-tweet', 'sentence-space']);

/** Mark sentence whitespace without changing copied text or normal line breaks. */
export function rehypeSentenceBreaks() {
	return (tree, file) => {
		if (file.data.astro?.frontmatter?.presentation !== 'source') return;

		function walk(node) {
			if (excludedTags.has(node.tagName)) return;
			if (node.properties?.className?.some((name) => excludedClasses.has(name))) return;

			if (node.tagName === 'p' || node.tagName === 'li') {
				const leaves = [];
				let text = '';
				function collect(parent) {
					for (const child of parent.children ?? []) {
						if (child.type === 'text') {
							leaves.push({ node: child, parent, start: text.length });
							text += child.value;
						} else if (child.type === 'element' && inlineTags.has(child.tagName)) {
							if (!collect(child)) return false;
						} else {
							// Don't infer sentence boundaries across code, media, or nested blocks.
							return false;
						}
					}
					return true;
				}
				if (collect(node)) {
					const breaks = new Set();
					const sentences = [...segmenter.segment(text)];
					// ICU doesn't split before numbers, as in "all in. 60-70 hour weeks".
					for (const match of text.matchAll(/\p{L}[.!?]["'”’)}\]]*[ \t\n]+(?=\d)/gu)) {
						sentences.push({ segment: text.slice(0, match.index + match[0].length), index: 0 });
					}
					for (const { segment, index } of sentences) {
						const whitespace = segment.match(/[ \t\n]+$/);
						if (!whitespace || index + segment.length === text.length) continue;
						const end = segment.slice(0, whitespace.index);
						// Segmenter treats some titles and initials as sentences. Be conservative.
						if (/(?:\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|vs|etc|e\.g|i\.e)|\b[A-Z](?:\.[A-Z])*)\.$/i.test(end)) continue;
						if (!/[.!?]["'”’)}\]]*$/.test(end)) continue;
						breaks.add(index + whitespace.index);
					}
					for (const { node: leaf, parent, start } of leaves) {
						const offsets = [...breaks].filter((offset) => offset >= start && offset < start + leaf.value.length).sort((a, b) => a - b);
						if (!offsets.length) continue;
						const replacement = [];
						let cursor = 0;
						for (const offset of offsets) {
							const local = offset - start;
							if (local > cursor) replacement.push({ type: 'text', value: leaf.value.slice(cursor, local) });
							replacement.push({
								type: 'element', tagName: 'span', properties: { className: ['sentence-space'] },
								children: [{ type: 'text', value: leaf.value[local] }],
							});
							cursor = local + 1;
						}
						if (cursor < leaf.value.length) replacement.push({ type: 'text', value: leaf.value.slice(cursor) });
						parent.children.splice(parent.children.indexOf(leaf), 1, ...replacement);
					}
					return;
				}
			}
			for (const child of node.children ?? []) walk(child);
		}
		walk(tree);
	};
}

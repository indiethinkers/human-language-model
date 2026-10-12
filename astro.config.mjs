// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { remarkHtmlHeadings } from './src/remark/remark-html-headings.mjs';
import { rehypeSentenceBreaks } from './src/remark/rehype-sentence-spacing.mjs';

export default defineConfig({
	markdown: {
		remarkPlugins: [remarkHtmlHeadings],
		rehypePlugins: [rehypeSentenceBreaks],
	},
	site: 'https://indiethinkers.com',
	trailingSlash: 'never',
	redirects: {
		'/essays/the-internet-in-multi-player-mode': '/essays/the-internet-in-multiplayer-mode',
		'/essays/intrinsic-motivation-a83': '/essays/intrinsic-motivation',
	},
	build: {
		format: 'file',
	},
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-newsreader',
			weights: [400, 500, 600],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
			options: {
				experimental: {
					variableAxis: { opsz: [['6', '72']] },
				},
			},
		},
	],
});

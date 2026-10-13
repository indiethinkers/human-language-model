// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { remarkHtmlHeadings } from './src/remark/remark-html-headings.mjs';
import { getEssayLastModBySlug } from './src/utils/essay-lastmods.mjs';

const essayLastModBySlug = getEssayLastModBySlug();

/** Permanent redirect sources — static HTML exists for cleanUrls but must not be indexed. */
const SITEMAP_EXCLUDED_PATHS = new Set([
	'/essays/intrinsic-motivation-a83',
	'/essays/the-internet-in-multi-player-mode',
]);

export default defineConfig({
	markdown: {
		remarkPlugins: [remarkHtmlHeadings],
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
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => {
				const { pathname } = new URL(page);
				if (SITEMAP_EXCLUDED_PATHS.has(pathname)) return false;
				if (pathname.startsWith('/og/')) return false;
				if (pathname === '/rss.xml') return false;
				return true;
			},
			serialize(item) {
				const { pathname } = new URL(item.url);
				const essaySlug = pathname.match(/^\/essays\/([^/]+)$/)?.[1];
				if (!essaySlug) return item;

				const lastmod = essayLastModBySlug.get(essaySlug);
				return lastmod ? { ...item, lastmod } : item;
			},
		}),
	],
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

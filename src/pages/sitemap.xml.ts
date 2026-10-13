import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { authors } from '../data/authors';
import {
	compareSitemapPathnames,
	escapeXml,
	pathnameToLoc,
	shouldIncludePathname,
} from '../utils/sitemap.mjs';

export const GET: APIRoute = async ({ site }) => {
	const base = site ?? new URL('https://indiethinkers.com');
	const posts = await getCollection('blog');
	const essayLastModBySlug = new Map(
		posts.map((post) => [
			post.id,
			(post.data.updatedDate ?? post.data.pubDate).toISOString(),
		]),
	);

	const pathnames = ['/', '/essays'];
	for (const author of Object.values(authors)) {
		pathnames.push(`/authors/${author.slug}`);
	}
	for (const post of posts) {
		pathnames.push(`/essays/${post.id}`);
	}

	const entries = pathnames
		.filter(shouldIncludePathname)
		.sort(compareSitemapPathnames)
		.map((pathname) => {
			const essaySlug = pathname.match(/^\/essays\/([^/]+)$/)?.[1];
			const lastmod = essaySlug ? essayLastModBySlug.get(essaySlug) : undefined;
			return {
				loc: pathnameToLoc(base, pathname),
				lastmod,
			};
		});

	const urlNodes = entries
		.map(({ loc, lastmod }) => {
			const lastmodTag = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
			return `<url><loc>${escapeXml(loc)}</loc>${lastmodTag}</url>`;
		})
		.join('');

	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		urlNodes +
		'</urlset>';

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};

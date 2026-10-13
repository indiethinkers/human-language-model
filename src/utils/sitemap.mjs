/** Permanent redirect sources — static HTML exists for cleanUrls but must not be indexed. */
export const SITEMAP_EXCLUDED_PATHS = new Set([
	'/essays/intrinsic-motivation-a83',
	'/essays/the-internet-in-multi-player-mode',
]);

/** @param {string} pathname */
export function shouldIncludePathname(pathname) {
	const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
	if (SITEMAP_EXCLUDED_PATHS.has(normalized)) return false;
	if (normalized.startsWith('/og/')) return false;
	if (normalized === '/rss.xml') return false;
	return true;
}

import { canonicalHref } from './canonical-url.mjs';

/** @param {URL} site @param {string} pathname */
export function pathnameToLoc(site, pathname) {
	return canonicalHref(site, pathname);
}

/** @param {string} a @param {string} b */
export function compareSitemapPathnames(a, b) {
	const rank = (pathname) => {
		if (pathname === '/') return '0';
		if (pathname.startsWith('/authors/')) return `1${pathname}`;
		if (pathname === '/essays') return '2';
		return `3${pathname}`;
	};
	return rank(a).localeCompare(rank(b));
}

/** @param {string} value */
export function escapeXml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

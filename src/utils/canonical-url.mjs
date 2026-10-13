/**
 * Normalize Astro/Vercel pathnames for public canonical URLs.
 * Strips `index.html` from file-format builds and trailing slashes (except homepage).
 * @param {string} pathname
 */
export function normalizeCanonicalPathname(pathname) {
	let path = pathname || '/';
	if (path === '/index.html') return '/';
	if (path.endsWith('/index.html')) {
		path = path.slice(0, -'/index.html'.length) || '/';
	}
	if (path !== '/' && path.endsWith('/')) {
		path = path.replace(/\/+$/, '');
	}
	return path;
}

/**
 * Absolute canonical URL: homepage ends with `/`; other paths have no trailing slash.
 * @param {URL | string} site
 * @param {string} pathname
 */
export function canonicalHref(site, pathname) {
	const base = typeof site === 'string' ? new URL(site) : site;
	const path = normalizeCanonicalPathname(pathname);
	if (path === '/') {
		return `${base.origin}/`;
	}
	return new URL(path, base).href;
}

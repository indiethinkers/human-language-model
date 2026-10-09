import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../consts';
import { renderSocialCard } from '../../lib/social-card';

export const GET: APIRoute = async ({ site }) => {
	const png = await renderSocialCard({
		path: 'index.md',
		fields: [
			{ key: 'title', value: SITE_TITLE, weight: 500 },
			{ key: 'url', value: site!.hostname },
			{ key: 'format', value: 'essays' },
		],
		quote: SITE_DESCRIPTION,
	});
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

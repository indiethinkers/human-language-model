import type { APIRoute, GetStaticPaths } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import { authors } from '../../data/authors';
import { renderSocialCard } from '../../lib/social-card';

export const getStaticPaths = (async () => {
	const posts = await getCollection('blog');
	return posts.map((post) => ({ params: { slug: post.id }, props: post }));
}) satisfies GetStaticPaths;

const toLocalIsoDate = (date: Date) =>
	[date.getFullYear(), date.getMonth() + 1, date.getDate()]
		.map((part) => String(part).padStart(2, '0'))
		.join('-');

export const GET: APIRoute = async ({ props }) => {
	const { id, data } = props as CollectionEntry<'blog'>;
	const { title, quote, author, authorSlug = 'daniel-hunter', pubDate } = data;
	const byline = authors[authorSlug]?.name ?? author ?? 'Daniel Hunter';

	const png = await renderSocialCard({
		path: `essays/${id}.md`,
		fields: [
			{ key: 'title', value: title, weight: 500 },
			{ key: 'author', value: byline },
			{ key: 'date', value: toLocalIsoDate(pubDate) },
		],
		quote,
	});
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

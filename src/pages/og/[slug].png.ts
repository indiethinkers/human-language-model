import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute, GetStaticPaths } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import satori from 'satori';
import { authors } from '../../data/authors';

const WIDTH = 1200;
const HEIGHT = 630;
const INK = '#27272a';
const QUOTE = '#525252';
const MUTED = '#a1a1aa';
const PAPER = '#F8F8F6';

const font = (file: string) =>
	readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono', file));
const fonts = Promise.all([font('GeistMono-Regular.ttf'), font('GeistMono-Medium.ttf')]).then(
	([regular, medium]) => [
		{ name: 'Geist Mono', data: regular, weight: 400 as const },
		{ name: 'Geist Mono', data: medium, weight: 500 as const },
	],
);

export const getStaticPaths = (async () => {
	const posts = await getCollection('blog');
	return posts.map((post) => ({ params: { slug: post.id }, props: post }));
}) satisfies GetStaticPaths;

// Long quotes shrink so the card never overflows; short ones stay large.
const quoteSize = (quote: string) => (quote.length <= 180 ? 28 : quote.length <= 260 ? 25 : 22);

const toLocalIsoDate = (date: Date) =>
	[date.getFullYear(), date.getMonth() + 1, date.getDate()]
		.map((part) => String(part).padStart(2, '0'))
		.join('-');

const el = (style: Record<string, unknown>, ...children: unknown[]) => ({
	type: 'div',
	props: { style: { display: 'flex', ...style }, children },
});

const field = (key: string, value: string, weight = 400) =>
	el({}, el({ color: MUTED, width: 120 }, `${key}:`), el({ fontWeight: weight }, value));

export const GET: APIRoute = async ({ props }) => {
	const { id, data } = props as CollectionEntry<'blog'>;
	const { title, quote, author, authorSlug = 'daniel-hunter', pubDate } = data;
	const byline = authors[authorSlug]?.name ?? author ?? 'Daniel Hunter';

	const svg = await satori(
		el(
			{
				width: '100%',
				height: '100%',
				flexDirection: 'column',
				padding: '52px 64px',
				background: PAPER,
				color: INK,
				fontFamily: 'Geist Mono',
				fontSize: 22,
			},
			el(
				{ color: MUTED, marginBottom: 28, justifyContent: 'space-between' },
				el({}, `essays/${id}.md`),
				el({}, 'indie thinkers'),
			),
			el({ color: MUTED }, '---'),
			field('title', title, 500),
			field('author', byline),
			field('date', toLocalIsoDate(pubDate)),
			el({ color: MUTED }, '---'),
			el(
				{ flex: 1, alignItems: 'center' },
				el(
					{
						borderLeft: `3px solid ${INK}`,
						paddingLeft: 28,
						fontSize: quoteSize(quote),
						lineHeight: 1.6,
						color: QUOTE,
						textWrap: 'balance',
					},
					`“${quote}”`,
				),
			),
		) as Parameters<typeof satori>[0],
		{ width: WIDTH, height: HEIGHT, fonts: await fonts },
	);

	const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

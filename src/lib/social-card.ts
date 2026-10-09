import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

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

// Long quotes shrink so the card never overflows; short ones stay large.
const quoteSize = (quote: string) => (quote.length <= 180 ? 28 : quote.length <= 260 ? 25 : 22);

const el = (style: Record<string, unknown>, ...children: unknown[]) => ({
	type: 'div',
	props: { style: { display: 'flex', ...style }, children },
});

const field = (key: string, value: string, weight = 400) =>
	el({}, el({ color: MUTED, width: 120 }, `${key}:`), el({ fontWeight: weight }, value));

interface SocialCard {
	path: string;
	fields: { key: string; value: string; weight?: number }[];
	quote: string;
}

export async function renderSocialCard({ path, fields, quote }: SocialCard) {
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
				el({}, path),
				el({}, 'indie thinkers'),
			),
			el({ color: MUTED }, '---'),
			...fields.map(({ key, value, weight }) => field(key, value, weight)),
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

	return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
}

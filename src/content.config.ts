import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			deck: z.string().optional(),
			quote: z.string(),
			quotes: z.array(z.string()).min(1).max(3).optional(),
			author: z.string().optional(),
			authorSlug: z.string().optional(),
			copyrightHolder: z.string(),
			license: z.literal('CC-BY-4.0').optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			socialImage: z.string().optional(),
			presentation: z.enum(['source']).optional(),
			series: z.string().min(1).optional(),
			titleMarkup: z.string().optional(),
			guest: z.literal(true).optional(),
			lectureNumber: z.number().int().positive().optional(),
			wordCount: z.number().int().positive().optional(),
		})
		.refine(
			(data) =>
				!data.titleMarkup ||
				data.titleMarkup.replace(/`([^`]+)`|_([^_]+)_/g, '$1$2') === data.title,
			{
				error: 'titleMarkup must equal title once its `mono` and _italic_ marks are removed',
				path: ['titleMarkup'],
			},
		)
		.refine(
			(data) => {
				if (data.quotes && data.quotes[0] !== data.quote) return false;
				if (data.guest) {
					return (
						data.license === undefined &&
						data.lectureNumber !== undefined &&
						data.wordCount !== undefined &&
						Boolean(data.author) &&
						Boolean(data.authorSlug) &&
						Boolean(data.quotes?.length)
					);
				}
				return data.license === 'CC-BY-4.0';
			},
			{
				error:
					'Guest essays require an author, lecture number, word count, and 1–3 quotes, with quote equal to the first entry. Other essays require license CC-BY-4.0.',
				path: ['guest'],
			},
		),
});

export const collections = { blog };

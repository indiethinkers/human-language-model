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
			author: z.string().optional(),
			authorSlug: z.string().optional(),
			copyrightHolder: z.string(),
			license: z.literal('CC-BY-4.0'),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			socialImage: z.string().optional(),
			presentation: z.enum(['source']).optional(),
			titleMarkup: z.string().optional(),
		})
		.refine(
			(data) =>
				!data.titleMarkup ||
				data.titleMarkup.replace(/`([^`]+)`|_([^_]+)_/g, '$1$2') === data.title,
			{
				error: 'titleMarkup must equal title once its `mono` and _italic_ marks are removed',
				path: ['titleMarkup'],
			},
		),
});

export const collections = { blog };

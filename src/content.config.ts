import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				deck: z.string().optional(),
				quote: z.string(),
				author: z.string().optional(),
				authorSlug: z.string().optional(),
				copyrightHolder: z.string(),
				license: z.literal('CC-BY-4.0'),
				// Transform string to Date object
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				heroImage: z.optional(image()),
				socialImage: z.string().optional(),
				presentation: z.enum(['source']).optional(),
				titleMono: z.string().optional(),
			})
			.refine((data) => !data.titleMono || data.title.includes(data.titleMono), {
				error: 'titleMono must occur in title',
				path: ['titleMono'],
			}),
});

export const collections = { blog };

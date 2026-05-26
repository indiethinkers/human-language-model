import type { ImageMetadata } from 'astro';
import DanielHunterAvatar from '../assets/authors/daniel-hunter.jpg';

export interface Author {
	slug: string;
	name: string;
	bio: string;
	avatar: ImageMetadata;
}

export const authors: Record<string, Author> = {
	'daniel-hunter': {
		slug: 'daniel-hunter',
		name: 'Daniel Hunter',
		bio: 'Daniel Hunter is the founder of Indie Thinkers, a community and publisher for independent writers exploring human judgment, conviction, taste, and work that deserves a custom home on the web.',
		avatar: DanielHunterAvatar,
	},
};

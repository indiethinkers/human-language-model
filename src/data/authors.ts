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
		bio: 'Founder of Indie Thinkers',
		avatar: DanielHunterAvatar,
	},
};

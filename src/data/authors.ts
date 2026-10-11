import type { ImageMetadata } from 'astro';
import AngelaHollowellAvatar from '../assets/authors/angela-hollowell.png';
import BeckyIsjwaraAvatar from '../assets/authors/becky-isjwara.jpg';
import BradFlaugherAvatar from '../assets/authors/brad-flaugher.jpg';
import DanielHunterAvatar from '../assets/authors/daniel-hunter.jpg';
import GraceNikaeAvatar from '../assets/authors/grace-nikae.jpg';
import KirupaAvatar from '../assets/authors/kirupa.jpg';
import MaxPeteAvatar from '../assets/authors/max-pete.jpg';
import PeteCybriwskyAvatar from '../assets/authors/pete-cybriwsky.jpg';
import RobertLinAvatar from '../assets/authors/robert-lin.jpg';
import SethWerkheiserAvatar from '../assets/authors/seth-werkheiser.png';

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
		bio: 'Daniel Hunter is the founder of Indie Thinkers, Post in Black, and a Software Engineer at Crossbeam.',
		avatar: DanielHunterAvatar,
	},
	'grace-nikae': {
		slug: 'grace-nikae',
		name: 'Grace Nikae',
		bio: 'Writer. Previously published Kizuna.',
		avatar: GraceNikaeAvatar,
	},
	'brad-flaugher': {
		slug: 'brad-flaugher',
		name: 'Brad Flaugher',
		bio: 'Data scientist and entrepreneur based in Philadelphia, PA. Author of AI Harmony.',
		avatar: BradFlaugherAvatar,
	},
	kirupa: {
		slug: 'kirupa',
		name: 'KIRUPA 🍊',
		bio: 'By day, I simplify webdev as a PM at Google on Firebase. By night, I teach webdev on KIRUPA.com.',
		avatar: KirupaAvatar,
	},
	'seth-werkheiser': {
		slug: 'seth-werkheiser',
		name: 'Seth Werkheiser',
		bio: 'Break up 💔 with social media (and big tech). Also MNRK Music, Metal Bandcamp Gift Club, lots of walking. No DMs, please email me: seth@socialmediaescape.club 🏳️‍🌈🏳️‍⚧️',
		avatar: SethWerkheiserAvatar,
	},
	'becky-isjwara': {
		slug: 'becky-isjwara',
		name: 'Becky Isjwara',
		bio: 'Head of social at every.to. Big fan of tiny moments.',
		avatar: BeckyIsjwaraAvatar,
	},
	'pete-cybriwsky': {
		slug: 'pete-cybriwsky',
		name: 'Pete Cybriwsky',
		bio: 'Thoughts off the dome and from the heart. Creative technologist and artist based out of NYC',
		avatar: PeteCybriwskyAvatar,
	},
	'angela-hollowell': {
		slug: 'angela-hollowell',
		name: 'Angela Hollowell',
		bio: 'Film Director, Writer, and Cyclist.',
		avatar: AngelaHollowellAvatar,
	},
	'robert-lin': {
		slug: 'robert-lin',
		name: 'Robert Lin',
		bio: `Every court needs a jester. If Michael Bay wrote "IRL fan-fiction", that'd be me! 🙂`,
		avatar: RobertLinAvatar,
	},
	'max-pete': {
		slug: 'max-pete',
		name: 'Max Pete',
		bio: 'I spent nearly a decade building communities for businesses, now I\'m building something for myself. I write about burnout, belonging, and all the things I was too busy chasing to notice. Based in Philly.',
		avatar: MaxPeteAvatar,
	},
};

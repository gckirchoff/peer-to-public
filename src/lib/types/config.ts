export type MediaIconType = 'Youtube' | 'Github' | 'Twitter';

export interface ContactLink {
	type: MediaIconType;
	href: string;
}

export interface SiteConfig {
	title: string;
	description: string;
	url: string;
	link: string;
	author: string;
	pages: {
		landing: {
			miniAboutMe: {
				img: string;
				quickDescription: string;
			};
			welcome: {
				header: string;
				description: string;
			};
		};
		about: {
			img: string;
			content: string[];
		};
		contact: {
			formAccessKey: string;
			links: ContactLink[];
		};
	};
}

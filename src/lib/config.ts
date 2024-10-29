import { dev } from '$app/environment';

import type { SiteConfig } from './types/config';

// Main config for entire website
export const siteConfig: SiteConfig = {
	title: 'Peer to Public',
	description: 'Simple, visual explanations about SARS-CoV-2',
	url: 'https://www.peertopublic.com',
	link: 'https://github.com/gckirchoff/peer-to-public',
	author: 'Gregory Kirchoff',
	pages: {
		landing: {
			miniAboutMe: {
				img: 'me.svg',
				quickDescription:
					'Explore key insights into the ongoing SARS-CoV-2 pandemic through interactive, visual articles. We are scientists and data visualization experts with an aim to inform both the public and government officials by contributing to a deeper understanding of the current health landscape.',
			},
			welcome: {
				header: 'Peer to Public',
				description: 'Simple, visual explanations',
			},
		},
		about: {
			img: 'me.svg',
			content: [
				`Peer to Public is a collaborative platform uniting scientists and data visualization experts to make complex, crucial topics accessible to everyone. Through interactive, data-driven articles, we aim to illuminate important issues that impact public health and well-being, especially surrounding SARS-CoV-2 and Long Covid.`,
				`Our mission is clear: to educate both the public and policymakers on the critical need to curb SARS-CoV-2 infections. This virus is not a common cold but a SARS coronavirus, with implications that demand ongoing preventative measures.`,
				`If you're interested in learning more or exploring collaborative opportunities, please reach out via the contact form.`,
			],
		},
		contact: {
			formAccessKey: 'df313bb6-814b-48fc-a917-a40b8f839417', // go to https://www.staticforms.xyz/ to get this. It's free!
			links: [
				{
					type: 'Twitter',
					href: 'https://twitter.com/gckirchoff',
				},
				{
					type: 'Github',
					href: 'https://github.com/gckirchoff/peer-to-public',
				},
			],
		},
	},
};

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10;

// Edit this to alter the main nav menu. (Also used by the footer).
export const navItems = [
	{
		title: 'Articles',
		route: '/posts',
	},
	// {
	// 	title: 'Gallery',
	// 	route: '/gallery',
	// },
	{
		title: 'About',
		route: '/about',
	},
	{
		title: 'Contact',
		route: '/contact',
	},
];

if (dev) {
	navItems.push({
		title: 'Dev',
		route: '/dev',
	});
}

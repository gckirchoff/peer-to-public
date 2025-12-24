import { dev } from '$app/environment';

import type { SiteConfig } from './types/config';

// Main config for entire website
export const siteConfig: SiteConfig = {
	title: 'Peer to Public Sandbox',
	description: 'Simple, visual explanations about SARS-CoV-2',
	url: 'https://www.peertopublic.com',
	link: 'https://github.com/gckirchoff/peer-to-public',
	author: 'Gregory Kirchoff',
	pages: {
		landing: {
			miniAboutMe: {
				img: 'me.svg',
				quickDescription:
					"Interactive, visual articles. We are scientists and data visualization experts dedicated to informing the public and guiding policymakers by deepening understanding of today's health and science landscape.",
			},
			welcome: {
				header: 'Peer to Public',
				description: 'Simple, visual explanations',
			},
		},
		about: {
			img: 'me.svg',
			content: [
				`Peer to Public is a collaborative platform founded by Gregory Kirchoff to help make complex, critical topics understandable for everyone. I partner with scientists to transform essential research into interactive, data-driven articles that illuminate issues affecting public health and well-being, with a particular focus on SARS-CoV-2 and Long Covid.`,
				`For many challenges, such as climate change and the long-term effects of Covid, the science is clear, but it is often complex and poorly communicated to the public. Peer to Public exists to bridge that gap, ensuring that scientific insights can inform and drive change in communities and governments.`,
				`If you would like to learn more or explore a collaboration, please reach out through the contact form.`,
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

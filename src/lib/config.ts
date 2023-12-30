import { dev } from '$app/environment';

// Main config for entire website
export const siteConfig = {
	title: 'Clear Covid',
	description: 'Simple, visual explanations about SARS-CoV-2',
	url: 'https://clear-covid.vercel.app',
	link: 'https://github.com/gckirchoff/lucid-covid',
	author: 'Clear Covid',
	pages: {
		landing: {
			miniAboutMe: {
				img: 'me.jpg',
				quickDescription:
					'This site is the result of the collaberative efforts of a team of scientists and volunteers, united by the sole purpose of informing the public and government officials on the dangers of Covid-19',
			},
			welcome: {
				header: 'Clear Covid',
				description: 'Simple, visual explanations about SARS-CoV-2',
			},
		},
		about: {
			img: 'me.jpg',
			content: [
				`SARS-CoV-2 is not the common cold and never will be. It is a SARS coronavirus. The implications of this
				are major and require eradication to be the end-goal.`,
				`The purpose of this site is to help the public and governing bodies to understand the importance of this goal.`,
				`The posts and visualizations on this site are created through the collaberative efforts of numerous
				scientists and volunteers.`,
				`To reach out for further information or collaberation, please use the contact form to get in touch!`,
			],
		},
		contact: {
			formAccessKey: 'df313bb6-814b-48fc-a917-a40b8f839417', // go to https://www.staticforms.xyz/ to get this. It's free!
		},
	},
};

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10;

// Edit this to alter the main nav menu. (Also used by the footer).
export const navItems = [
	{
		title: 'Posts',
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

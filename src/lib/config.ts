import { dev } from '$app/environment';

// Main config for entire website
export const siteConfig = {
	title: 'Data Quill',
	description: 'Simple, visual explanations about SARS-CoV-2',
	url: 'https://www.thedataquill.com/',
	link: 'https://github.com/gckirchoff/data-quill',
	author: 'Data Quill',
	pages: {
		landing: {
			miniAboutMe: {
				img: 'me.png',
				quickDescription:
					'This site is the result of the collaborative efforts of a team of scientists and volunteers, united by the sole purpose of informing the public and government officials on various scientific concepts, especially the ongoing SARS-CoV-2 pandemic.',
			},
			welcome: {
				header: 'Data Quill',
				description: 'Simple, visual explanations',
			},
		},
		about: {
			img: 'me.png',
			content: [
				`Data Quill is the result of the collaborative efforts of scientists and data visualization developers.`,
				`The purpose of this site is to make difficult-to-understand yet important issues feel intuitive
				through the use of engaging, interactive articles.`,
				`Our primary goal is to educate the public and government about the importance of stopping SARS-CoV-2 infections.`,
				`SARS-CoV-2 is not the common cold and never will be. It is a SARS coronavirus. The implications of this
				are major and require the prevention of infection.`,
				`To reach out for further information or collaboration, please use the contact form to get in touch!`,
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

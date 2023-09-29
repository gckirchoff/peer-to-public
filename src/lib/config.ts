import { dev } from '$app/environment';

// Main config for entire website
export const siteConfig = {
	title: 'Site Template',
	description: 'An Easy to Use Site Template',
	url: 'https://your-blog-template.vercel.app',
	link: 'https://github.com/gckirchoff/blog-template',
	author: 'Amadeus',
	landingPage: {
		miniAboutMe: {
			img: 'me.jpg',
			quickDescription:
				'My name is Gregory and I hope you enjoy this easy to use, but powerful site template!',
		},
		welcome: {
			header: 'Welcome to your site template!',
			description: 'Create posts, photo galleries, and more!',
		},
	},
};

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10;

// Edit this to alter the main nav menu. (Also used by the footer).
export const navItems = [
	{
		title: 'Blog',
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

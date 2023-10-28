import { dev } from '$app/environment';

// Main config for entire website
export const siteConfig = {
	title: 'Site Template',
	description: 'An Easy to Use Site Template',
	url: 'https://your-blog-template.vercel.app',
	link: 'https://github.com/gckirchoff/blog-template',
	author: 'Amadeus',
	pages: {
		landing: {
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
		about: {
			img: 'me.jpg',
			content: [
				`Hi! My name is Gregory Kirchoff. I am a microbiology graduate with previous clinical
			experience in emergency medicine from my time working on an ambulance. Since then, I
			self-taught software development and now work as a software engineer.`,
				`My goal when building this site template was to make something that is easily usable by
				everyone, no matter their proficiency with computers, but also to be infinitely extendable
				by those who do know how to code. All in just one payment. No subscriptions or premiums.
				One payment, and you have everything you need to put your passion online.`,
				`The magic behind all of this is how this template is architected. It is designed to be used
				as a 'blog editing' app on your computer. When running this site locally, the website appears identical to
				how it does now, but has admin pages for creating and customizing this site. All of the changes
				you make there will change the source code of this application as if you were a software
				developer writing the code yourself. Everything you create is saved in folders in the source code
				as well.`,
				`What all of this means is that you own everything. You own the tools for creating the posts and
				changing the look and feel of your site. You own the "pseudo-database" that stores all of your posts.`,
				`If this was run like other site building websites, you would need to pay a monthly subscription.
				These payments go to renting their tools and reserving space on their databases. Instead,
				it's all yours. Enjoy!`,
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

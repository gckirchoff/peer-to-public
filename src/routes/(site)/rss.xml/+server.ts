import { siteConfig } from '$lib/config';
import type Post from '$lib/types/post.js';
import fetchPosts from '$lib/utils/fetchPosts.js';

export const prerender = true;

export const GET = async ({ fetch }) => {
	const posts = await fetchPosts({ limit: -1 });
	const body = render(posts);
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=3600`,
		'Content-Type': 'application/xml',
	};
	return new Response(body, {
		status: 200,
		headers,
	});
};

//Be sure to review and replace any applicable content below!
const render = (posts: Post[]): string => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteConfig.title}</title>
<description>${siteConfig.description}</description>
<link>${siteConfig.url}</link>
<atom:link href="${siteConfig.url}rss.xml" rel="self" type="application/rss+xml"/>
${posts
	.map(
		(post) => `<item>
<guid isPermaLink="true">${siteConfig.url}/posts/${post.slug}</guid>
<title>${post.title}</title>
<link>${siteConfig.url}/posts/${post.slug}</link>
<description>${post.description}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`,
	)
	.join('')}
</channel>
</rss>
`;
